import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import { CartDrawerProvider } from "./context/CartDrawerContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./index.css";

// Optional: error boundary for debugging
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <h1 className="text-red-600 font-bold text-2xl">
            Something went wrong!
          </h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <CartProvider>
          <CartDrawerProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </CartDrawerProvider>
        </CartProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
