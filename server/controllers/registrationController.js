import { Registration } from '../models/Registration.js';
import { Event } from '../models/Event.js';
import { initialEvents } from '../data/seedData.js';
import { generateRegistrationId } from '../utils/generateRegistrationId.js';
import { checkDBConnection } from '../config/db.js';

// Regex validators
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;

const validateParticipant = (p, label = 'Participant') => {
  if (!p) throw new Error(`${label} details are required`);
  if (!p.name || !p.name.trim()) throw new Error(`${label} name is required`);
  if (!p.email || !EMAIL_REGEX.test(p.email.trim())) {
    throw new Error(`Valid email address is required for ${label.toLowerCase()} (${p.name || ''})`);
  }
  if (!p.phone || !PHONE_REGEX.test(p.phone.trim().replace(/\D/g, ''))) {
    throw new Error(`Valid 10-digit Indian mobile number is required for ${label.toLowerCase()} (${p.name || ''})`);
  }
  if (!p.college || !p.college.trim()) throw new Error(`${label} college is required`);
  if (!p.branch || !p.branch.trim()) throw new Error(`${label} branch is required`);
  if (!p.year || !p.year.trim()) throw new Error(`${label} year of study is required`);
};

/**
 * POST /api/registrations
 * Create a new event registration
 */
export const createRegistration = async (req, res, next) => {
  try {
    if (!checkDBConnection()) {
      return res.status(503).json({
        success: false,
        errorType: 'DATABASE_UNAVAILABLE',
        message:
          'Database connection is not active yet. Please ensure MONGO_URI is configured with valid MongoDB Atlas credentials in server/.env',
      });
    }

    const {
      eventId,
      registrationType,
      participant,
      teamName,
      teamLeader,
      members,
      termsAccepted,
    } = req.body;

    if (!eventId) {
      return res.status(400).json({ success: false, message: 'Event ID is required' });
    }

    if (!termsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'You must confirm accuracy and accept Srijan event rules and guidelines',
      });
    }

    // 1. Fetch Event Configuration
    let event = await Event.findOne({
      $or: [{ slug: eventId.toLowerCase() }, { slug: `event-${eventId}` }],
    }).lean();

    if (!event) {
      const fallback = initialEvents.find(
        (e) => e.slug === eventId.toLowerCase() || e.slug === `event-${eventId}`
      );
      if (fallback) {
        event = fallback;
      } else {
        return res.status(404).json({ success: false, message: 'Event not found' });
      }
    }

    if (event.registrationOpen === false) {
      return res.status(400).json({
        success: false,
        message: `Registrations for ${event.name} are currently closed.`,
      });
    }

    // 2. Process Registration by Type
    if (event.registrationType === 'team' || registrationType === 'team') {
      // TEAM / HACKATHON VALIDATION
      if (!teamName || !teamName.trim()) {
        return res.status(400).json({ success: false, message: 'Team Name is required' });
      }

      validateParticipant(teamLeader, 'Team Leader');

      const cleanMembers = Array.isArray(members) ? members : [];
      const totalTeamCount = cleanMembers.length + 1; // leader + members

      const min = event.minTeamSize || 2;
      const max = event.maxTeamSize || 4;

      if (totalTeamCount < min || totalTeamCount > max) {
        return res.status(400).json({
          success: false,
          message: `Team size for ${event.name} must be between ${min} and ${max} members (current: ${totalTeamCount})`,
        });
      }

      // Validate each member
      cleanMembers.forEach((m, idx) => {
        validateParticipant(m, `Team Member ${idx + 2}`);
      });

      // Internal duplicate email check within team
      const allEmails = [
        teamLeader.email.trim().toLowerCase(),
        ...cleanMembers.map((m) => m.email.trim().toLowerCase()),
      ];
      const uniqueEmails = new Set(allEmails);
      if (uniqueEmails.size !== allEmails.length) {
        return res.status(400).json({
          success: false,
          message: 'All team members (including team leader) must have distinct email addresses.',
        });
      }

      // Database duplicate check across other teams in this event
      const duplicateInDB = await Registration.findOne({
        eventId: event.slug,
        $or: [
          { 'teamLeader.email': { $in: allEmails } },
          { 'members.email': { $in: allEmails } },
        ],
      }).lean();

      if (duplicateInDB) {
        return res.status(409).json({
          success: false,
          message: `One of your team members is already registered for ${event.name} under team "${duplicateInDB.teamName}".`,
        });
      }

      // Generate ID
      const registrationId = await generateRegistrationId(event.code || 'HACK');

      // Create Team Registration document
      const newReg = await Registration.create({
        registrationId,
        eventId: event.slug,
        eventName: event.name,
        registrationType: 'team',
        teamName: teamName.trim(),
        teamLeader: {
          name: teamLeader.name.trim(),
          email: teamLeader.email.trim().toLowerCase(),
          phone: teamLeader.phone.trim().replace(/\D/g, ''),
          college: teamLeader.college.trim(),
          branch: teamLeader.branch.trim(),
          year: teamLeader.year.trim(),
        },
        members: cleanMembers.map((m) => ({
          name: m.name.trim(),
          email: m.email.trim().toLowerCase(),
          phone: m.phone.trim().replace(/\D/g, ''),
          college: m.college.trim(),
          branch: m.branch.trim(),
          year: m.year.trim(),
        })),
        termsAccepted: true,
        registeredAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful!',
        data: newReg,
      });
    } else {
      // INDIVIDUAL REGISTRATION VALIDATION
      validateParticipant(participant, 'Participant');

      const participantEmail = participant.email.trim().toLowerCase();

      // Check duplicate registration for this individual event
      const existing = await Registration.findOne({
        eventId: event.slug,
        'participant.email': participantEmail,
      }).lean();

      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Email "${participantEmail}" is already registered for ${event.name} with Registration ID ${existing.registrationId}.`,
        });
      }

      // Generate ID
      const registrationId = await generateRegistrationId(event.code || 'IND');

      // Create Individual Registration document
      const newReg = await Registration.create({
        registrationId,
        eventId: event.slug,
        eventName: event.name,
        registrationType: 'individual',
        participant: {
          name: participant.name.trim(),
          email: participantEmail,
          phone: participant.phone.trim().replace(/\D/g, ''),
          college: participant.college.trim(),
          branch: participant.branch.trim(),
          year: participant.year.trim(),
        },
        termsAccepted: true,
        registeredAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: 'Registration successful!',
        data: newReg,
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

/**
 * GET /api/registrations/:registrationId
 * Retrieve registration details by registration ID
 */
export const getRegistrationById = async (req, res, next) => {
  try {
    const { registrationId } = req.params;

    if (!checkDBConnection()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected yet.',
      });
    }

    const registration = await Registration.findOne({
      registrationId: registrationId.toUpperCase().trim(),
    }).lean();

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: `No registration found with ID "${registrationId}".`,
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin preparation: Query all registrations with filters
 */
export const getAllRegistrations = async (req, res, next) => {
  try {
    if (!checkDBConnection()) {
      return res.status(503).json({ success: false, message: 'Database not connected.' });
    }

    const { eventId, search, type } = req.query;
    const filter = {};

    if (eventId) filter.eventId = eventId;
    if (type) filter.registrationType = type;
    if (search) {
      filter.$or = [
        { registrationId: new RegExp(search, 'i') },
        { teamName: new RegExp(search, 'i') },
        { 'participant.name': new RegExp(search, 'i') },
        { 'participant.email': new RegExp(search, 'i') },
        { 'teamLeader.name': new RegExp(search, 'i') },
        { 'teamLeader.email': new RegExp(search, 'i') },
      ];
    }

    const registrations = await Registration.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};
