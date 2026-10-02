import { Event } from '../models/Event.js';
import { initialEvents } from '../data/seedData.js';
import { connectDB, checkDBConnection } from '../config/db.js';

/**
 * Get all available events
 * Auto-seeds initial events if DB is empty
 */
export const getEvents = async (req, res, next) => {
  try {
    if (!checkDBConnection()) {
      await connectDB();
    }

    if (!checkDBConnection()) {
      // Fallback to static seed data if DB is temporarily not connected
      return res.status(200).json({
        success: true,
        source: 'static',
        count: initialEvents.length,
        data: initialEvents,
      });
    }


    let events = await Event.find().sort({ slug: 1 }).lean();

    // Auto-seed if database is empty
    if (!events || events.length === 0) {
      await Event.insertMany(initialEvents);
      events = await Event.find().sort({ slug: 1 }).lean();
      console.log('🌱 [MongoDB] Auto-seeded 6 Srijan events into database.');
    }

    res.status(200).json({
      success: true,
      source: 'database',
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single event by slug or ID
 */
export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!checkDBConnection()) {
      await connectDB();
    }

    if (!checkDBConnection()) {
      const fallback = initialEvents.find(
        (e) => e.slug === id.toLowerCase() || e.slug === `event-${id}`
      );

      if (!fallback) {
        return res.status(404).json({
          success: false,
          message: `Event with ID "${id}" not found.`,
        });
      }
      return res.status(200).json({ success: true, source: 'static', data: fallback });
    }

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const orConditions = [{ slug: id.toLowerCase() }, { slug: `event-${id.toLowerCase()}` }];
    if (isObjectId) {
      orConditions.push({ _id: id });
    }

    const event = await Event.findOne({ $or: orConditions }).lean();

    if (!event) {
      return res.status(404).json({
        success: false,
        message: `Event with ID "${id}" not found.`,
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
