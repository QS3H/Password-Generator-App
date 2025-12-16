import { useState, useEffect, useRef } from "react";

/**
 * Props interface for PasswordDisplay component
 */
interface PasswordDisplayProps {
  password: string; // The password to display
}

/**
 * PasswordDisplay Component
 *
 * Displays the generated password and provides copy-to-clipboard functionality
 *
 * Features:
 * - Shows the generated password (or placeholder if empty)
 * - Copy button that copies password to clipboard
 * - Visual feedback when password is copied
 * - Responsive design
 */
export const PasswordDisplay = ({ password }: PasswordDisplayProps) => {
  // State to track if password was recently copied (used for visual feedback)
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /**
   * Handles copying the password to the clipboard
   * Uses the modern Clipboard API
   */
  const handleCopy = async () => {
    // Don't copy if password is empty
    if (!password) return;

    try {
      // Clear any existing error
      setError(null);
      
      // Use Clipboard API to copy password
      await navigator.clipboard.writeText(password);

      // Set copied state to true for visual feedback
      setCopied(true);
      
      // Announce to screen readers
      const button = document.activeElement as HTMLElement;
      if (button) {
        button.focus();
      }

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset copied state after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      // Handle error gracefully - Clipboard API is supported in all modern browsers
      // If it fails, it's likely due to permissions or security restrictions
      console.error("Failed to copy password:", err);
      setError("Failed to copy. Please try selecting and copying manually.");
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  return (
    <div className="bg-app-bg p-4 sm:p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Password text display */}
        <div className="flex-1 min-w-0">
          {password ? (
            // Show actual password if generated
            <p className="text-text-light text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono break-all leading-tight">
              {password}
            </p>
          ) : (
            // Show placeholder if no password generated yet
            <p className="text-text-muted text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono leading-tight">
              P4$5W0rD!
            </p>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          disabled={!password} // Disable if no password to copy
          className={`
            flex items-center gap-2 sm:gap-3
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0
            justify-center
            touch-manipulation
            ${
              copied
                ? "text-accent-green"
                : "text-accent-green hover:text-text-light active:text-text-light"
            }
          `}
          aria-label={copied ? "Copied!" : "Copy password"}
        >
          {/* Copy icon or checkmark */}
          {copied ? (
            <>
              <span className="text-sm sm:text-base md:text-lg font-bold uppercase hidden sm:inline">
                Copied
              </span>
              <svg
                width="14"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-5 sm:h-5 transition-colors duration-200 flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M1 5.607 4.393 9l8-8"
                />
              </svg>
            </>
          ) : (
            <svg
              width="21"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-6 sm:w-5 sm:h-6 transition-colors duration-200 flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="mt-2 text-red-400 text-sm" role="alert" aria-live="polite">
          {error}
        </div>
      )}
    </div>
  );
};
