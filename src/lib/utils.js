import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names and removes duplicates.
 *
 * @param {...string} inputs - Class names to be merged.
 * @returns {string} - The combined class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
