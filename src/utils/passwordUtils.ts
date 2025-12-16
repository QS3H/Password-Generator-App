import { PasswordOptions, StrengthResult } from "../types";

/**
 * Character sets used for password generation
 * These constants define the available characters for each option type
 */
const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

/**
 * Generates a random password based on the provided options
 *
 * @param options - Configuration object containing:
 *   - length: Desired password length (number)
 *   - uppercase: Include uppercase letters (boolean)
 *   - lowercase: Include lowercase letters (boolean)
 *   - numbers: Include numbers (boolean)
 *   - symbols: Include symbols (boolean)
 *
 * @returns A randomly generated password string
 *
 * @throws Error if no character types are selected (would result in empty password)
 */
export const generatePassword = (options: PasswordOptions): string => {
  // Validate password length (must be between 4 and 50)
  if (options.length < 4 || options.length > 50) {
    throw new Error("Password length must be between 4 and 50 characters");
  }

  // Build the character pool based on selected options
  let characterPool = "";

  if (options.uppercase) characterPool += UPPERCASE_CHARS;
  if (options.lowercase) characterPool += LOWERCASE_CHARS;
  if (options.numbers) characterPool += NUMBER_CHARS;
  if (options.symbols) characterPool += SYMBOL_CHARS;

  // Validate that at least one character type is selected
  if (characterPool.length === 0) {
    throw new Error("No character types selected");
  }

  // Build arrays for each selected character type to ensure inclusion
  const charSets: string[] = [];
  if (options.uppercase) charSets.push(UPPERCASE_CHARS);
  if (options.lowercase) charSets.push(LOWERCASE_CHARS);
  if (options.numbers) charSets.push(NUMBER_CHARS);
  if (options.symbols) charSets.push(SYMBOL_CHARS);

  // Generate password ensuring at least one character from each selected type
  let password = "";

  // First, ensure at least one character from each selected type
  // If password length is less than number of character types, we'll use all types
  // but may need to prioritize some over others
  const requiredChars: string[] = [];
  const numRequiredChars = Math.min(charSets.length, options.length);

  for (let i = 0; i < numRequiredChars; i++) {
    const charSet = charSets[i];
    // Use cryptographically secure random to select one character from each set
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const randomIndex = randomArray[0] % charSet.length;
    requiredChars.push(charSet[randomIndex]);
  }

  // Shuffle the required characters using cryptographically secure random
  const shuffledRequired = requiredChars.sort(() => {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    return randomArray[0] / 0xffffffff - 0.5;
  });

  // Add required characters to password
  password = shuffledRequired.join("");

  // Fill remaining length with random characters from the pool
  const remainingLength = options.length - password.length;
  if (remainingLength > 0) {
    const randomArray = new Uint32Array(remainingLength);
    crypto.getRandomValues(randomArray);

    for (let i = 0; i < remainingLength; i++) {
      // Convert random value to index in character pool
      const randomIndex = randomArray[i] % characterPool.length;
      password += characterPool[randomIndex];
    }
  }

  // Shuffle the final password to randomize character positions
  const passwordArray = password.split("");
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const j = randomArray[0] % (i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join("");
};

/**
 * Calculates the strength of a password based on multiple factors
 *
 * Strength is determined by:
 * - Password length
 * - Character variety (uppercase, lowercase, numbers, symbols)
 * - Complexity of character combinations
 *
 * @param password - The password to evaluate
 * @param options - The options used to generate the password
 *
 * @returns A StrengthResult object containing:
 *   - level: Strength level (0-4, where 0 is weakest and 4 is strongest)
 *   - label: Human-readable strength label ("TOO WEAK", "WEAK", "MEDIUM", "STRONG")
 */
export const calculatePasswordStrength = (
  password: string,
  options: PasswordOptions
): StrengthResult => {
  // Base score starts at 0
  let score = 0;

  // Character variety scoring: More character types = stronger password
  let varietyCount = 0;
  if (options.uppercase) varietyCount++;
  if (options.lowercase) varietyCount++;
  if (options.numbers) varietyCount++;
  if (options.symbols) varietyCount++;

  // Length scoring combined with variety
  if (password.length < 6) {
    score = 0; // Too weak
  } else if (password.length < 8) {
    score = varietyCount >= 2 ? 1 : 0; // Weak if 2+ types, otherwise too weak
  } else if (password.length < 12) {
    // Length 8-11: MEDIUM with 3 types, WEAK with 2 types
    if (varietyCount >= 3) {
      score = 2; // MEDIUM
    } else if (varietyCount >= 2) {
      score = 1; // WEAK
    } else {
      score = 0; // TOO WEAK
    }
  } else if (password.length < 16) {
    // Length 12-15: STRONG with 3+ types, MEDIUM with 2 types
    if (varietyCount >= 3) {
      score = 3; // STRONG
    } else {
      score = 2; // MEDIUM
    }
  } else {
    // Length 16+: STRONG or VERY STRONG
    if (varietyCount === 4) {
      score = 4; // VERY STRONG with all 4 types
    } else if (varietyCount >= 3) {
      score = 3; // STRONG with 3 types
    } else {
      score = 2; // MEDIUM otherwise
    }
  }

  // Cap the score at 4 (maximum strength level for VERY STRONG)
  const level = Math.min(score, 4);

  // Map strength level to readable labels
  const labels = ["TOO WEAK", "WEAK", "MEDIUM", "STRONG", "VERY STRONG"];
  const label = level < labels.length ? labels[level] : "VERY STRONG";

  return { level, label };
};
