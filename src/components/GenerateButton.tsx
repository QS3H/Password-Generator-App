/**
 * Props interface for GenerateButton component
 */
interface GenerateButtonProps {
  onClick: () => void; // Callback function when button is clicked
  disabled?: boolean; // Whether the button should be disabled
}

/**
 * GenerateButton Component
 *
 * A styled button for generating new passwords
 *
 * Features:
 * - Large, prominent design
 * - Hover and focus states
 * - Disabled state handling
 * - Accessible button element
 */
export const GenerateButton = ({
  onClick,
  disabled = false,
}: GenerateButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-3.5 sm:py-4 px-4 sm:px-6
        bg-accent-green text-button-text
        font-bold text-sm sm:text-base md:text-lg
        uppercase tracking-wide
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        border-2 border-transparent
        hover:bg-transparent hover:text-accent-green hover:border-accent-green hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-app-bg
        active:scale-[0.98]
        flex items-center justify-center gap-2 sm:gap-3
        group
        touch-manipulation
        min-h-[48px] sm:min-h-[52px]
      `}
      aria-label="Generate new password"
    >
      {/* Button Text */}
      <span>Generate</span>

      {/* Arrow Icon - Inline SVG for color control */}
      <svg
        width="12"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 transition-colors duration-200"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
        />
      </svg>
    </button>
  );
};
