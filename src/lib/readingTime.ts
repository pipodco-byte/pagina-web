/**
 * readingTime.ts - Utility for calculating article reading time
 *
 * Uses the reading-time package to calculate estimated reading time
 * based on word count. Default reading speed: 200 words per minute.
 */

import readingTime from 'reading-time';

/**
 * Calculate reading time from text content
 * @param content - The article content (markdown or plain text)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export function calculateReadingTime(content: string): string {
  const stats = readingTime(content);
  return stats.text;
}

/**
 * Calculate reading time and return raw minutes
 * @param content - The article content
 * @returns Number of minutes (rounded)
 */
export function getReadingTimeMinutes(content: string): number {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes);
}

/**
 * Format reading time for Spanish locale
 * @param minutes - Number of minutes
 * @returns Formatted string (e.g., "5 min de lectura")
 */
export function formatReadingTimeES(minutes: number): string {
  return `${minutes} min de lectura`;
}

/**
 * Calculate and format reading time for Spanish
 * @param content - The article content
 * @returns Formatted reading time in Spanish
 */
export function calculateReadingTimeES(content: string): string {
  const minutes = getReadingTimeMinutes(content);
  return formatReadingTimeES(minutes);
}

export default calculateReadingTime;
