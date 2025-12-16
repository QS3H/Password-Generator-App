import { StrengthResult } from "../types";

/**
 * Props interface for StrengthIndicator component
 */
interface StrengthIndicatorProps {
  strength: StrengthResult; // Strength calculation result
}

/**
 * StrengthIndicator Component
 *
 * Displays the password strength with:
 * - Visual strength bars (0-4 bars)
 * - Color-coded strength levels
 * - Text label (TOO WEAK, WEAK, MEDIUM, STRONG, VERY STRONG)
 *
 * Strength levels:
 * - 0: TOO WEAK (red)
 * - 1: WEAK (orange/yellow)
 * - 2: MEDIUM (yellow)
 * - 3: STRONG (green)
 * - 4: VERY STRONG (green)
 */
export const StrengthIndicator = ({ strength }: StrengthIndicatorProps) => {
  // Don't render if no strength data (password not generated yet)
  if (!strength.label) {
    return null;
  }

  /**
   * Gets the color class based on strength level
   *
   * @param level - Strength level (0-4)
   * @returns Tailwind CSS class for the color
   */
  const getStrengthColor = (level: number): string => {
    switch (level) {
      case 0:
        return "bg-red-500"; // Too weak - red
      case 1:
        return "bg-strength-yellow"; // Weak - yellow/orange
      case 2:
        return "bg-strength-yellow"; // Medium - yellow
      case 3:
        return "bg-accent-green"; // Strong - green
      case 4:
        return "bg-accent-green"; // Very strong - green
      default:
        return "bg-gray-500"; // Default fallback
    }
  };

  return (
    <div className="bg-dark-bg p-4 sm:p-5 md:p-6 mx-4 sm:mx-5 md:mx-6 mb-4 sm:mb-5 md:mb-6 flex items-center justify-between gap-2 sm:gap-4">
      {/* Strength Label */}
      <span className="text-text-muted text-xs sm:text-sm md:text-base uppercase flex-shrink-0">
        Strength
      </span>

      {/* Strength Bars and Label */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
        {/* Strength Label Text */}
        <span
          className={`text-sm sm:text-base md:text-lg font-bold uppercase ${
            strength.level === 0
              ? "text-red-500"
              : strength.level === 1
              ? "text-strength-yellow"
              : strength.level === 2
              ? "text-strength-yellow"
              : "text-accent-green"
          }`}
        >
          {strength.label}
        </span>

        {/* Strength Bars */}
        <div className="flex gap-1.5 sm:gap-2">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-2 sm:w-2.5 h-6 sm:h-7 border-2 transition-colors duration-200 ${
                index < strength.level
                  ? `${getStrengthColor(strength.level)} border-transparent`
                  : "bg-transparent border-text-light"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
