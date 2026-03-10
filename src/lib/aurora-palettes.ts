/**
 * Aurora Color Palettes
 * Beautiful gradient combinations for the Aurora background effect
 */

export const AURORA_PALETTES = {
  // Modern Purple-Pink-Blue (Default - Current)
  vibrant: {
    dark: ["#8B5CF6", "#EC4899", "#3B82F6"], // Purple → Hot Pink → Blue
    light: ["#3B82F6", "#8B5CF6", "#06B6D4"], // Blue → Purple → Cyan
  },

  // Warm Sunset
  sunset: {
    dark: ["#F59E0B", "#EC4899", "#8B5CF6"], // Amber → Hot Pink → Purple
    light: ["#FB923C", "#F472B6", "#A78BFA"], // Orange → Pink → Purple
  },

  // Cool Ocean
  ocean: {
    dark: ["#06B6D4", "#3B82F6", "#8B5CF6"], // Cyan → Blue → Purple
    light: ["#0EA5E9", "#06B6D4", "#10B981"], // Sky Blue → Cyan → Emerald
  },

  // Neon Glow
  neon: {
    dark: ["#A855F7", "#EC4899", "#06B6D4"], // Purple → Hot Pink → Cyan
    light: ["#06B6D4", "#A855F7", "#F472B6"], // Cyan → Purple → Pink
  },

  // Northern Lights
  aurora: {
    dark: ["#10B981", "#3B82F6", "#8B5CF6"], // Emerald → Blue → Purple
    light: ["#6366F1", "#8B5CF6", "#06B6D4"], // Indigo → Purple → Cyan
  },

  // Fire
  fire: {
    dark: ["#EF4444", "#F97316", "#FBBF24"], // Red → Orange → Amber
    light: ["#F59E0B", "#F97316", "#EF4444"], // Amber → Orange → Red
  },

  // Monochrome
  mono: {
    dark: ["#6366F1", "#8B5CF6", "#A78BFA"], // Indigo → Purple → Light Purple
    light: ["#3B82F6", "#60A5FA", "#93C5FD"], // Blue → Light Blue → Sky Blue
  },
} as const;

export type AuroraPalette = keyof typeof AURORA_PALETTES;
