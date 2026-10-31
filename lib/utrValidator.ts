/**
 * NPCI UPI Unique Transaction Reference (UTR) Validator & Authentication Module
 *
 * In the Indian banking system (NPCI UPI / IMPS ecosystem):
 * - UPI UTRs are strictly 12-digit numeric strings (e.g. 439201948291).
 * - The first digit represents the last digit of the year (e.g., 6 for 2026).
 * - The next 3 digits represent the Julian day of the year (001 to 366).
 * - The remaining 8 digits represent the bank sequence / RRN.
 * - Dummy, test, sequential, or repetitive patterns are strictly rejected.
 */

export interface UtrValidationResult {
  isValid: boolean;
  error?: string;
  normalizedUtr?: string;
}

export function validateUpiUtr(rawUtr: string | undefined | null): UtrValidationResult {
  if (!rawUtr || typeof rawUtr !== "string") {
    return {
      isValid: false,
      error: "Bank transaction reference (UTR) is strictly required.",
    };
  }

  const clean = rawUtr.trim().replace(/\s+/g, "");

  // 1. Strict Length & Numeric Check
  if (!/^\d+$/.test(clean)) {
    return {
      isValid: false,
      error: "Invalid UTR format. UPI reference numbers must contain digits only (no letters or symbols).",
    };
  }

  if (clean.length !== 12) {
    return {
      isValid: false,
      error: `Invalid UTR length (${clean.length} digits). Standard NPCI UPI transaction references must be exactly 12 digits.`,
    };
  }

  // 2. Reject all-same digits (e.g. 000000000000, 111111111111, 999999999999)
  if (/^(\d)\1{11}$/.test(clean)) {
    return {
      isValid: false,
      error: "Invalid UTR: Repeating dummy digit sequences are rejected by our payment security gateway.",
    };
  }

  // 3. Reject common test / sequential / keypad patterns (e.g. 123456789012, 123456789456, 741852963789)
  const sequentialPatterns = [
    "012345678901",
    "123456789012",
    "123456789456",
    "234567890123",
    "987654321098",
    "876543210987",
    "741852963789", // Keypad columns down (7-4-1, 8-5-2, 9-6-3, 7-8-9)
    "147258369123", // Keypad columns up
    "963852741987", // Keypad reverse
    "789456123789", // Keypad rows
    "123456789123",
  ];
  if (sequentialPatterns.includes(clean)) {
    return {
      isValid: false,
      error: `Invalid UTR: '${clean}' is an artificial dummy/keypad pattern and is strictly declined.`,
    };
  }

  // Check for long sequential runs (6 or more sequential numbers ascending or descending)
  let ascRun = 1;
  let descRun = 1;
  let maxRun = 1;
  for (let i = 1; i < clean.length; i++) {
    const prev = parseInt(clean[i - 1], 10);
    const curr = parseInt(clean[i], 10);
    if (curr === (prev + 1) % 10) {
      ascRun++;
      maxRun = Math.max(maxRun, ascRun);
    } else {
      ascRun = 1;
    }
    if (curr === (prev + 9) % 10) {
      descRun++;
      maxRun = Math.max(maxRun, descRun);
    } else {
      descRun = 1;
    }
  }

  if (maxRun >= 6) {
    return {
      isValid: false,
      error: "Invalid UTR: Contains synthetic sequential numbers. Please enter the authentic bank reference from your UPI receipt.",
    };
  }

  // 4. Low Entropy / Repetitive 2-digit patterns (e.g. 121212121212)
  const uniqueDigits = new Set(clean.split(""));
  if (uniqueDigits.size < 4) {
    return {
      isValid: false,
      error: "Invalid UTR: Transaction reference lacks sufficient entropy for an authentic NPCI banking reference.",
    };
  }

  // 5. NPCI Julian Day validation (Digits 2-4: Day of Year from 001 to 366)
  const dayOfYear = parseInt(clean.substring(1, 4), 10);
  if (isNaN(dayOfYear) || dayOfYear < 1 || dayOfYear > 366) {
    return {
      isValid: false,
      error: `Invalid UTR timestamp: Embedded banking calendar index (${clean.substring(1, 4)}) is out of range for valid transaction dates.`,
    };
  }

  return {
    isValid: true,
    normalizedUtr: clean,
  };
}
