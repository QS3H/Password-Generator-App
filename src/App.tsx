import { useEffect } from "react";
import { usePasswordGenerator } from "./hooks/usePasswordGenerator";
import {
  PasswordDisplay,
  PasswordOptions,
  StrengthIndicator,
  GenerateButton,
} from "./components";

/**
 * Main App Component
 *
 * This is the root component that orchestrates the entire password generator application.
 *
 * Features:
 * - Manages password generation state using custom hook
 * - Coordinates all child components
 * - Generates initial password on mount
 * - Handles option changes and password regeneration
 */
function App() {
  // Use custom hook to manage all password-related state and logic
  const {
    password, // Current generated password
    options, // Current password options
    strength, // Current password strength
    setOptions, // Function to update options
    generateNewPassword, // Function to generate new password
  } = usePasswordGenerator();

  /**
   * Effect hook that runs when component mounts
   * Generates an initial password when the app first loads
   */
  useEffect(() => {
    generateNewPassword();
  }, [generateNewPassword]);

  /**
   * Keyboard shortcut handler
   * Ctrl+G or Cmd+G to generate new password
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "g") {
        event.preventDefault();
        if (
          options.uppercase ||
          options.lowercase ||
          options.numbers ||
          options.symbols
        ) {
          generateNewPassword();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [generateNewPassword, options]);

  /**
   * Handles option changes from PasswordOptions component
   * Updates options and regenerates password only for checkbox changes
   * Length changes require manual regeneration via Generate button
   *
   * @param newOptions - Updated password options
   * @param shouldRegenerate - Whether to regenerate password immediately (for checkbox changes)
   */
  const handleOptionsChange = (
    newOptions: typeof options,
    shouldRegenerate: boolean = false
  ) => {
    setOptions(newOptions);
    // Only regenerate immediately for checkbox changes (user expects instant feedback)
    // Length changes require clicking Generate button
    if (shouldRegenerate) {
      generateNewPassword();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6 md:p-8 relative z-10">
      {/* Main Container */}
      <div className="w-full max-w-[540px] space-y-4 sm:space-y-5 md:space-y-6">
        {/* App Title */}
        <h1 className="text-text-muted text-center text-xl sm:text-2xl md:text-3xl font-bold">
          Password Generator
        </h1>

        {/* Main Card Container */}
        <div className="bg-app-bg rounded-lg overflow-hidden">
          {/* Password Display Section */}
          <PasswordDisplay password={password} />

          {/* Options Section */}
          <PasswordOptions
            options={options}
            onOptionsChange={handleOptionsChange}
          />

          {/* Strength Indicator Section */}
          <StrengthIndicator strength={strength} />

          {/* Generate Button Section */}
          <div className="p-4 sm:p-5 md:p-6 pt-0">
            <GenerateButton
              onClick={generateNewPassword}
              disabled={
                // Disable button if no character types are selected
                !options.uppercase &&
                !options.lowercase &&
                !options.numbers &&
                !options.symbols
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
