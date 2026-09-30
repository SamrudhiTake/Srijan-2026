import { Registration } from '../models/Registration.js';

/**
 * Generate a sequential, collision-safe unique registration ID
 * Format: SRJ-{CODE}-{0001}
 * e.g., SRJ-HACK-0001, SRJ-PCB-0001, SRJ-KBC-0001
 */
export const generateRegistrationId = async (eventCode) => {
  const cleanCode = (eventCode || 'GEN').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const prefix = `SRJ-${cleanCode}-`;

  // Find the highest registration ID for this event code
  const lastReg = await Registration.findOne({
    registrationId: new RegExp(`^${prefix}\\d+`),
  })
    .sort({ registrationId: -1 })
    .collation({ locale: 'en', numericOrdering: true })
    .select('registrationId')
    .lean();

  let nextSequence = 1;

  if (lastReg && lastReg.registrationId) {
    const parts = lastReg.registrationId.split('-');
    const currentNum = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(currentNum)) {
      nextSequence = currentNum + 1;
    }
  }

  // Format with at least 4 digits: 0001, 0002...
  const paddedSeq = String(nextSequence).padStart(4, '0');
  const candidateId = `${prefix}${paddedSeq}`;

  // Double check uniqueness just in case
  const exists = await Registration.exists({ registrationId: candidateId });
  if (exists) {
    // If collision somehow occurs, find next free
    let counter = nextSequence + 1;
    while (await Registration.exists({ registrationId: `${prefix}${String(counter).padStart(4, '0')}` })) {
      counter++;
    }
    return `${prefix}${String(counter).padStart(4, '0')}`;
  }

  return candidateId;
};
