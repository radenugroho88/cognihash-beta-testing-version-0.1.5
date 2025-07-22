import "./global.css";

// Suppress wallet extension errors
window.addEventListener('error', (event) => {
  const errorMessage = event.error?.message || event.message || '';
  const filename = event.filename || '';

  if (errorMessage.includes('register') ||
      errorMessage.includes('Cannot destructure property') ||
      errorMessage.includes('undefined') && errorMessage.includes('register') ||
      filename.includes('chrome-extension://') ||
      filename.includes('moz-extension://') ||
      filename.includes('extension://')) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

// Suppress unhandled promise rejections from wallet extensions
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.message || event.reason?.toString?.() || '';
  if (reason.includes('register') ||
      reason.includes('Cannot destructure property') ||
      reason.includes('undefined') && reason.includes('register')) {
    event.preventDefault();
    return false;
  }
});

// Override console.error temporarily for wallet extension errors
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  const errorStr = args.join(' ');
  if (errorStr.includes('register') ||
      errorStr.includes('chrome-extension://') ||
      errorStr.includes('moz-extension://') ||
      errorStr.includes('Cannot destructure property') ||
      errorStr.includes('extension://') ||
      errorStr.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      errorStr.includes('bfnaelmomeimhlpmgjnjophhpkkoljpa') ||
      errorStr.includes('solana.js') ||
      errorStr.includes('btc.js') ||
      errorStr.includes('sui.js') ||
      errorStr.includes('inpage.js') ||
      errorStr.toLowerCase().includes('wallet extension')) {
    return; // Suppress these specific errors
  }
  originalConsoleError.apply(console, args);
};

console.warn = (...args) => {
  const warnStr = args.join(' ');
  if (warnStr.includes('Encountered two children with the same key') ||
      warnStr.includes('MetaMask') ||
      warnStr.includes('register') ||
      warnStr.includes('Cannot destructure property')) {
    return; // Suppress these warnings
  }
  originalConsoleWarn.apply(console, args);
};

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletContextProvider } from "./context/WalletProvider";
import { SidebarProvider } from "./context/SidebarContext";
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
