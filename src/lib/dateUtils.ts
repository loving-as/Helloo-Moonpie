// Valentine's Day dates configuration
export const VALENTINE_DAYS = [7, 8, 9, 10, 11, 12, 13, 14]; // Feb 7-14
export const VALENTINE_MONTH = 1; // February (0-indexed)
export const VALENTINE_YEAR = 2026;

/**
 * Get the current date (can be overridden for testing)
 */
let currentTestDate: Date | null = null;

export const setTestDate = (date: Date | null) => {
  currentTestDate = date;
};

export const getCurrentDate = (): Date => {
  return currentTestDate || new Date();
};

/**
 * Check if a Valentine's day is unlocked based on the current date
 * @param dayIndex - Index of the day (0-7)
 * @param referenceDate - Optional date to check against (defaults to current date)
 * @returns true if the day is unlocked
 */
export const isDayUnlocked = (dayIndex: number, referenceDate?: Date): boolean => {
  const checkDate = referenceDate || getCurrentDate();
  const currentYear = checkDate.getFullYear();
  const currentMonth = checkDate.getMonth();
  const currentDay = checkDate.getDate();
  
  const targetDay = VALENTINE_DAYS[dayIndex];
  
  // If we're in February and the current day is >= the target day, unlock it
  if (currentMonth === VALENTINE_MONTH && currentDay >= targetDay) {
    return true;
  }
  
  // If we're past February in the same year or beyond, unlock all days
  if (currentMonth > VALENTINE_MONTH || currentYear > VALENTINE_YEAR) {
    return true;
  }
  
  return false;
};

/**
 * Get the date for a specific Valentine's day
 * @param dayIndex - Index of the day (0-7)
 * @returns Date object for that day
 */
export const getDayDate = (dayIndex: number): Date => {
  return new Date(VALENTINE_YEAR, VALENTINE_MONTH, VALENTINE_DAYS[dayIndex]);
};

/**
 * Format a date to display format (e.g., "Feb 7")
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

