import { isBefore, isAfter, startOfDay, addDays } from 'date-fns';

const START_DATE = new Date('2026-02-07T00:00:00'); // Rose Day

// Helper to get day index (0 = Feb 7, 6 = Feb 14)
export const getDayIndex = (date = new Date()) => {
  const start = startOfDay(START_DATE);
  const current = startOfDay(date);
  const diffTime = Math.abs(current - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // If before start date, return -1 (or handle as locked)
  if (isBefore(current, start)) return -1;
  
  return diffDays;
};

// Check if a specific day (0-7) is unlocked based on completing previous levels
export const isDayUnlocked = (dayIndex) => {
    // Day 0 (Rose Day) is always unlocked - starting level
    if (dayIndex === 0) return true;
    
    // For all other days, check if previous day's keepsake has been collected
    const keepsakes = JSON.parse(localStorage.getItem('Mohtarmann_keepsakes') || '[]');
    
    // Map day index to keepsake ID
    const dayKeys = ['rose', 'propose', 'chocolate', 'teddy', 'promise', 'hug', 'kiss', 'valentine'];
    
    // Check if the previous day's keepsake exists
    const previousDayKey = dayKeys[dayIndex - 1];
    const hasPreviousKeepsake = keepsakes.some(k => k.id === previousDayKey);
    
    return hasPreviousKeepsake;
};

// Get current day's content key
export const getDayKey = (index) => {
    const keys = ['rose', 'propose', 'chocolate', 'teddy', 'promise', 'hug', 'kiss', 'valentine'];
    return keys[index] || null;
};
