import "./global.css";

// Suppress wallet extension errors
window.addEventListener('error', (event) => {
  if (event.error?.message?.includes('register') ||
      event.message?.includes('register') ||
      event.filename?.includes('chrome-extension://') ||
      event.filename?.includes('moz-extension://')) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
});

// Suppress unhandled promise rejections from wallet extensions
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('register') ||
      event.reason?.toString?.()?.includes('register')) {
    event.preventDefault();
    return false;
  }
});

// Override console.error temporarily for wallet extension errors
const originalConsoleError = console.error;
console.error = (...args) => {
  const errorStr = args.join(' ');
  if (errorStr.includes('register') ||
      errorStr.includes('chrome-extension://') ||
      errorStr.includes('Cannot destructure property')) {
    return; // Suppress these specific errors
  }
  originalConsoleError.apply(console, args);
};

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletContextProvider } from "./context/WalletProvider";
import { PhantomProvider } from "./context/PhantomProvider";
import Index from "./pages/Index";
import Beta from "./pages/Beta";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletContextProvider>
      <PhantomProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/beta" element={<Beta />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PhantomProvider>
    </WalletContextProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
