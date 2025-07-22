import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log wallet-related errors silently
    if (error.message.includes('wallet') || error.message.includes('register')) {
      console.log('Wallet initialization error (non-critical):', error.message);
    } else {
      console.error('Application error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-cognihash-dark min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-white text-xl">Something went wrong</h2>
            <button 
              className="cognihash-button text-white px-6 py-2 rounded-lg"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
