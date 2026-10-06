/**
 * ErrorBoundary  —  src/components/ErrorBoundary/ErrorBoundary.jsx
 * =================================================================
 * Class-based error boundary — must be a class component (React limitation).
 *
 * Placed ABOVE <BrowserRouter> so it catches crashes in any provider or page.
 * Because it sits above the router, it must NOT use router hooks or <Link>.
 * Use plain <a href="/"> and a reload button for recovery instead.
 */
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Uncaught error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100dvh",
            padding: "var(--space-8)",
            gap: "var(--space-4)",
            background: "var(--background)",
            fontFamily: "var(--font-body)",
            color: "var(--text)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-3xl)", color: "var(--primary)" }}>
            Something went wrong
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: "480px" }}>
            An unexpected error occurred. Try reloading the page.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-4)",
                fontSize: "var(--text-xs)",
                color: "var(--text)",
                maxWidth: "600px",
                overflow: "auto",
                textAlign: "left",
              }}
            >
              {this.state.error.message}
            </pre>
          )}
          <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: "var(--space-3) var(--space-6)",
                background: "var(--primary)",
                color: "var(--surface)",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-semibold)",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* Plain anchor — cannot use <Link> here, no router context above this boundary */}
            <a
              href="/"
              style={{
                padding: "var(--space-3) var(--space-6)",
                background: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: "var(--font-semibold)",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
