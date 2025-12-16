import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Props interface for ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * State interface for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 *
 * Catches React errors in the component tree and displays a user-friendly error message
 * instead of crashing the entire application
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-page-bg flex items-center justify-center p-4">
          <div className="bg-app-bg rounded-lg p-6 md:p-8 max-w-md w-full">
            <h2 className="text-text-light text-xl md:text-2xl font-bold mb-4">
              Something went wrong
            </h2>
            <p className="text-text-muted text-base mb-6">
              An unexpected error occurred. Please try refreshing the page or
              click the button below to reset the application.
            </p>
            {this.state.error && (
              <details className="mb-6">
                <summary className="text-text-muted text-sm cursor-pointer mb-2">
                  Error details
                </summary>
                <pre className="text-red-400 text-xs overflow-auto bg-dark-bg p-3 rounded">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-6 bg-accent-green text-button-text font-bold text-base uppercase tracking-wide transition-all duration-200 hover:bg-accent-green/90 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-app-bg"
            >
              Reset Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

