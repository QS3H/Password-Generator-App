import { PasswordOptions as PasswordOptionsType } from "../types";

/**
 * Props interface for PasswordOptions component
 */
interface PasswordOptionsProps {
  options: PasswordOptionsType; // Current password options
  onOptionsChange: (
    options: PasswordOptionsType,
    shouldRegenerate?: boolean
  ) => void; // Callback when options change
}

/**
 * PasswordOptions Component
 *
 * Provides UI controls for configuring password generation options:
 * - Password length slider
 * - Character type checkboxes (uppercase, lowercase, numbers, symbols)
 *
 * Features:
 * - Real-time option updates
 * - Accessible form controls
 * - Visual feedback for interactions
 */
export const PasswordOptions = ({
  options,
  onOptionsChange,
}: PasswordOptionsProps) => {
  /**
   * Handles changes to the password length slider
   *
   * @param event - Change event from the range input
   */
  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(event.target.value, 10);
    // Validate length is within bounds (4-50)
    const validatedLength = Math.max(4, Math.min(50, newLength));
    // Update options with new length (don't regenerate automatically)
    onOptionsChange({ ...options, length: validatedLength }, false);
  };

  /**
   * Handles toggling of character type checkboxes
   *
   * @param key - The option key to toggle (uppercase, lowercase, numbers, symbols)
   */
  const handleToggleOption = (key: keyof PasswordOptionsType) => {
    // Don't allow toggling the length property
    if (key === "length") return;

    // Toggle the boolean value for the selected option
    // Regenerate password immediately for checkbox changes
    onOptionsChange(
      {
        ...options,
        [key]: !options[key],
      },
      true
    );
  };


  return (
    <div className="bg-app-bg p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
      {/* Password Length Control */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="length"
            className="text-text-light text-sm sm:text-base md:text-lg"
          >
            Character Length
          </label>
          {/* Display current length value */}
          <span className="text-accent-green text-xl sm:text-2xl md:text-3xl font-bold">
            {options.length}
          </span>
        </div>

        {/* Range slider for password length */}
        <input
          type="range"
          id="length"
          min="4" // Minimum password length
          max="50" // Maximum password length
          value={options.length}
          onChange={handleLengthChange}
          className="w-full h-2 sm:h-2.5 bg-dark-bg rounded-full appearance-none cursor-pointer slider touch-manipulation"
          style={{
            background: `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${
              ((options.length - 4) / (50 - 4)) * 100
            }%, #18171F ${((options.length - 4) / (50 - 4)) * 100}%, #18171F 100%)`,
          }}
          aria-label="Password length"
          aria-valuemin={4}
          aria-valuemax={50}
          aria-valuenow={options.length}
          aria-valuetext={`${options.length} characters`}
        />
      </div>

      {/* Character Type Options */}
      <div className="space-y-3 sm:space-y-4 pt-2">
        {/* Validation message when no options selected */}
        {!options.uppercase &&
          !options.lowercase &&
          !options.numbers &&
          !options.symbols && (
            <p
              className="text-red-400 text-xs sm:text-sm mb-2"
              role="alert"
              aria-live="polite"
            >
              Please select at least one character type to generate a password.
            </p>
          )}
        {/* Uppercase Letters Option */}
        <label className="flex items-center gap-3 sm:gap-4 cursor-pointer group touch-manipulation min-h-[44px] sm:min-h-0">
          <input
            type="checkbox"
            checked={options.uppercase}
            onChange={() => handleToggleOption("uppercase")}
            className="w-5 h-5 sm:w-5 sm:h-5 cursor-pointer accent-accent-green rounded-sm transition-all duration-200 flex-shrink-0 touch-manipulation"
            aria-label="Include uppercase letters"
            aria-checked={options.uppercase}
            role="checkbox"
          />
          <span className="text-text-light text-sm sm:text-base md:text-lg group-hover:text-accent-green transition-colors">
            Include Uppercase Letters
          </span>
        </label>

        {/* Lowercase Letters Option */}
        <label className="flex items-center gap-3 sm:gap-4 cursor-pointer group touch-manipulation min-h-[44px] sm:min-h-0">
          <input
            type="checkbox"
            checked={options.lowercase}
            onChange={() => handleToggleOption("lowercase")}
            className="w-5 h-5 sm:w-5 sm:h-5 cursor-pointer accent-accent-green rounded-sm transition-all duration-200 flex-shrink-0 touch-manipulation"
            aria-label="Include lowercase letters"
            aria-checked={options.lowercase}
            role="checkbox"
          />
          <span className="text-text-light text-sm sm:text-base md:text-lg group-hover:text-accent-green transition-colors">
            Include Lowercase Letters
          </span>
        </label>

        {/* Numbers Option */}
        <label className="flex items-center gap-3 sm:gap-4 cursor-pointer group touch-manipulation min-h-[44px] sm:min-h-0">
          <input
            type="checkbox"
            checked={options.numbers}
            onChange={() => handleToggleOption("numbers")}
            className="w-5 h-5 sm:w-5 sm:h-5 cursor-pointer accent-accent-green rounded-sm transition-all duration-200 flex-shrink-0 touch-manipulation"
            aria-label="Include numbers"
            aria-checked={options.numbers}
            role="checkbox"
          />
          <span className="text-text-light text-sm sm:text-base md:text-lg group-hover:text-accent-green transition-colors">
            Include Numbers
          </span>
        </label>

        {/* Symbols Option */}
        <label className="flex items-center gap-3 sm:gap-4 cursor-pointer group touch-manipulation min-h-[44px] sm:min-h-0">
          <input
            type="checkbox"
            checked={options.symbols}
            onChange={() => handleToggleOption("symbols")}
            className="w-5 h-5 sm:w-5 sm:h-5 cursor-pointer accent-accent-green rounded-sm transition-all duration-200 flex-shrink-0 touch-manipulation"
            aria-label="Include symbols"
            aria-checked={options.symbols}
            role="checkbox"
          />
          <span className="text-text-light text-sm sm:text-base md:text-lg group-hover:text-accent-green transition-colors">
            Include Symbols
          </span>
        </label>
      </div>
    </div>
  );
};
