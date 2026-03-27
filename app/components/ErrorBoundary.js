"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-shell flex min-h-screen items-center justify-center px-6">
          <div className="surface-elevated w-full max-w-lg p-8 text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/15 text-rose-200">
              <AlertTriangle size={22} />
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">Something went wrong</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">
              An unexpected error interrupted rendering. Refresh the page and try again.
            </p>
            <button onClick={() => window.location.reload()} className="btn-primary mx-auto mt-6">
              <RefreshCw size={15} />
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" ? (
              <details className="mt-6 rounded-xl border border-white/10 bg-gray-900/70 p-3 text-left">
                <summary className="cursor-pointer text-xs uppercase tracking-[0.1em] text-gray-400">
                  Error details
                </summary>
                <pre className="mt-3 whitespace-pre-wrap text-xs text-rose-300">
                  {this.state.error ? this.state.error.toString() : ""}
                  {"\n"}
                  {this.state.errorInfo ? this.state.errorInfo.componentStack : ""}
                </pre>
              </details>
            ) : null}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

