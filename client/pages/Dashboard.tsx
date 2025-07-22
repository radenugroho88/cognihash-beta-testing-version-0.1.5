import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { Bell, Sun, ChevronDown, Plus, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Sidebar from "../components/Sidebar";
import MobileMenuTrigger from "../components/MobileMenuTrigger";
import { useSidebar } from "../context/SidebarContext";

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const { isCollapsed, isMobile } = useSidebar();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has verified access
    const verified = localStorage.getItem("cognihash_verified");
    const storedWallet = localStorage.getItem("cognihash_wallet");

    if (verified === "true" && connected && publicKey && storedWallet === publicKey.toString()) {
      setHasAccess(true);
    } else {
      // Redirect to beta page if not verified
      setHasAccess(false);
    }
    setLoading(false);
  }, [connected, publicKey]);

  const handleSend = () => {
    if (!query.trim()) return;
    // Handle query submission
    console.log("Sending query:", query);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-cognihash-primary rounded-full mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md mx-auto p-8 text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="text-gray-600">
              Please connect your wallet and complete verification to access the dashboard.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/beta")}
              className="w-full bg-cognihash-primary hover:bg-cognihash-secondary"
            >
              Connect Wallet
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://phantom.app/', '_blank')}
              className="w-full"
            >
              Install Phantom Wallet
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="w-full h-16 px-4 py-2 flex justify-between items-center backdrop-blur-[17.5px] border-b border-gray-100 bg-white/80">
          <MobileMenuTrigger />

          <div className="flex px-2 justify-end items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <Bell className="w-6 h-6 text-black" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          
          {/* Upgrade Button */}
          <Button 
            variant="secondary" 
            className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 rounded-2xl"
          >
            Upgrade Now
          </Button>
          
          {/* User Info */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/30159e00472bc78f2b4a10f3c8ce102c3c02f451?width=64"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-black text-sm font-mono max-w-20 truncate">
              {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-4)}
            </span>
            <ChevronDown className="w-4 h-4 text-black" />
          </div>
          
          {/* Theme Toggle */}
          <Sun className="w-6 h-6 text-black" />
          
          {/* Profile Image */}
            <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
              <span className="text-xs">👤</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-auto">
          <div className="w-full max-w-4xl space-y-8">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-4">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/7ce561e0f5e56e5e3758bd4d001defd233843009?width=128"
                alt="CogniHash Logo"
                className="w-16 h-16"
              />
              <h1 className="text-2xl font-bold text-black">
                CogniHash Data Intelligence Platform
              </h1>
            </div>

            {/* Main Input Container */}
            <Card className="w-full bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 p-6 shadow-sm">
              <div className="space-y-4">
                {/* Input Label */}
                <label className="text-gray-700 text-sm font-medium">
                  What can I do for you?
                </label>

                {/* Input Area */}
                <div className="relative">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything about blockchain data..."
                    className="w-full h-20 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-lg p-3 resize-none text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cognihash-primary/20 focus:border-cognihash-primary/30 transition-all"
                  />

                  {/* Send Button */}
                  <Button
                    onClick={handleSend}
                    className="absolute bottom-3 right-3 bg-cognihash-primary hover:bg-cognihash-primary/90 px-4 py-2 rounded-lg text-white shadow-md transition-all duration-200 hover:shadow-lg"
                  >
                    Send
                  </Button>
                </div>

                {/* Bottom Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  {/* Agent Selector - Blurred */}
                  <div className="flex items-center gap-4">
                    <Card className="bg-white/40 backdrop-blur-md border border-gray-200/30 shadow-sm px-4 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-white/60 hover:shadow-md transition-all duration-200">
                      <span className="text-gray-600 text-sm font-medium">Choose your agent</span>
                      <ChevronDown className="w-4 h-4 text-gray-500 transform -rotate-90" />
                      <Badge variant="outline" className="text-xs bg-cognihash-primary/10 text-cognihash-primary border-cognihash-primary/20">Agent</Badge>
                    </Card>
                  </div>

                  {/* Upload Button */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-sm px-4 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-white/90 hover:shadow-md transition-all duration-200">
                    <Plus className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-600 text-sm font-medium">Upload PDF or Image</span>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
