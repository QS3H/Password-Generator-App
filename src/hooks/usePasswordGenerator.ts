import { useState, useCallback, useMemo } from "react";
import { PasswordOptions } from "../types";
import {
  generatePassword,
  calculatePasswordStrength,
} from "../utils/passwordUtils";

/**
 * Custom React hook for managing password generation state and logic
 *
 * This hook encapsulates all password-related functionality:
 * - Managing password state
 * - Managing password options (length, character types)
 * - Generating new passwords
 * - Calculating password strength
 *
 * @returns An object containing:
 *   - password: Current generated password string
 *   - options: Current password generation options
 *   - strength: Current password strength calculation
 *   - setOptions: Function to update password options
 *   - generateNewPassword: Function to generate a new password with current options
 */
export const usePasswordGenerator = () => {
  // State for storing the generated password
  const [password, setPassword] = useState<string>("");

  // State for password generation options with default values
  const [options, setOptions] = useState<PasswordOptions>({
    length: 10, // Default password length (must be between 4 and 50)
    uppercase: true, // Include uppercase by default
    lowercase: true, // Include lowercase by default
    numbers: true, // Include numbers by default
    symbols: false, // Symbols disabled by default
  });

  /**
   * Generates a new password using the current options
   * Uses useCallback to memoize the function and prevent unnecessary re-renders
   */
  const generateNewPassword = useCallback(() => {
    try {
      // Generate password using utility function
      const newPassword = generatePassword(options);
      // Update password state
      setPassword(newPassword);
    } catch (error) {
      // Handle error if no character types are selected
      console.error("Failed to generate password:", error);
      setPassword("");
    }
  }, [options]); // Regenerate when options change

  /**
   * Calculates the strength of the current password
   * Returns a default strength if password is empty
   * Memoized to prevent unnecessary recalculations
   */
  const strength = useMemo(() => {
    return password
      ? calculatePasswordStrength(password, options)
      : { level: 0, label: "" };
  }, [password, options]);

  return {
    password, // Current password
    options, // Current options
    strength, // Current strength
    setOptions, // Function to update options
    generateNewPassword, // Function to generate password
  };
};
