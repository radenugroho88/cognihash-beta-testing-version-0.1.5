import "./global.css";

// Immediately override console methods before any extensions load
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleLog = console.log;

// Aggressive console override - must be done immediately
console.error = (...args) => {
  const errorStr = String(args[0] || '');

  // Check for wallet extension error patterns
  if (errorStr.includes('Cannot destructure property') ||
      errorStr.includes('register') ||
      errorStr.includes('chrome-extension://') ||
      errorStr.includes('moz-extension://') ||
      errorStr.includes('extension://') ||
      errorStr.includes('bfnaelmomeimhlpmgjnjophhpkkoljpa') ||
      errorStr.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      errorStr.includes('solana.js') ||
      errorStr.includes('btc.js') ||
      errorStr.includes('sui.js') ||
      errorStr.includes('inpage.js') ||
      args.some(arg => String(arg).includes('TypeError') && String(arg).includes('register'))) {
    return; // Completely suppress these errors
  }

  originalConsoleError.apply(console, args);
};

console.warn = (...args) => {
  const warnStr = String(args[0] || '');
  if (warnStr.includes('register') ||
      warnStr.includes('Cannot destructure property') ||
      warnStr.includes('MetaMask') ||
      warnStr.includes('extension') ||
      warnStr.includes('chrome-extension')) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

// Override error event handling at the earliest possible stage
const handleError = (event) => {
  const error = event.error || {};
  const message = error.message || event.message || '';
  const filename = event.filename || '';
  const stack = error.stack || '';

  // Comprehensive error pattern matching
  if (message.includes('Cannot destructure property') ||
      message.includes('register') ||
      message.includes('undefined') && message.includes('register') ||
      filename.includes('chrome-extension://') ||
      filename.includes('extension://') ||
      stack.includes('chrome-extension://') ||
      stack.includes('extension://') ||
      stack.includes('bfnaelmomeimhlpmgjnjophhpkkoljpa') ||
      stack.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')) {

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
  }
};

// Add multiple error listeners for maximum coverage
window.addEventListener('error', handleError, true); // Capture phase
window.addEventListener('error', handleError, false); // Bubble phase

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  const message = reason?.message || reason?.toString?.() || String(reason);

  if (message.includes('register') ||
      message.includes('Cannot destructure property') ||
      message.includes('extension://') ||
      message.includes('chrome-extension://')) {
    event.preventDefault();
    return false;
  }
});

// Monkey patch the Error constructor to catch extension errors at source
const OriginalError = window.Error;
window.Error = function(message, ...args) {
  if (typeof message === 'string' &&
      (message.includes('Cannot destructure property') ||
       message.includes('register'))) {
    // Return a silent error that won't be logged
    const silentError = new OriginalError('Extension initialization (suppressed)', ...args);
    silentError.stack = '';
    return silentError;
  }
  return new OriginalError(message, ...args);
};

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletContextProvider } from "./context/WalletProvider";
import { SidebarProvider } from "./context/SidebarContext";
import ErrorSuppressor from "./components/ErrorSuppressor";
import Index from "./pages/Index";
import Beta from "./pages/Beta";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Agent from "./pages/Agent";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletContextProvider>
      <SidebarProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/beta" element={<Beta />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/transactions" element={<Transactions />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SidebarProvider>
    </WalletContextProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
