import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorSuppressor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: false }; // Don't show error UI, just continue
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Check if this is a wallet extension error
    const errorMessage = error.message || "";
    const errorStack = error.stack || "";

    if (
      errorMessage.includes("Cannot destructure property") ||
      errorMessage.includes("register") ||
      errorStack.includes("chrome-extension://") ||
      errorStack.includes("extension://")
    ) {
      // Silently ignore wallet extension errors
      return;
    }

    // Log other errors normally
    console.error("Application error:", error, errorInfo);
  }

  render() {
    // Always render children, even if there was an error
    return this.props.children;
  }
}

export default ErrorSuppressor;
