import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { Bell, Sun, ChevronDown, Plus, MessageSquare, Bot, BarChart3, PieChart, HelpCircle, Settings, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
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
      // For demo purposes - in production, this would redirect to beta page
      setHasAccess(true);
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
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <header className="w-full h-16 px-5 py-2 flex justify-end items-center backdrop-blur-[17.5px] border-b border-gray-100">
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
            <span className="text-black text-sm font-mono max-w-16 truncate">
              {publicKey?.toString().slice(0, 8)}...
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

      <div className="flex">
        {/* Collapsed Sidebar */}
        <aside className="w-[88px] h-screen bg-gray-100 flex flex-col items-center py-10 gap-8">
          {/* Logo */}
          <div className="w-[52.5px] h-[52.5px] rounded bg-white flex items-center justify-center">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/d3accaac5015101aa5c50b3f516fc2fa922defa3?width=105"
              alt="CogniHash Logo"
              className="w-[53px] h-[53px]"
            />
          </div>
          
          {/* Navigation Icons */}
          <div className="flex flex-col gap-8">
            <MessageSquare className="w-8 h-8 text-black cursor-pointer hover:text-cognihash-primary" />
            <Bot className="w-8 h-8 text-black cursor-pointer hover:text-cognihash-primary" />
            <BarChart3 className="w-8 h-8 text-black cursor-pointer hover:text-cognihash-primary" />
            <PieChart className="w-8 h-8 text-black cursor-pointer hover:text-cognihash-primary" />
          </div>
          
          {/* Bottom Icons */}
          <div className="mt-auto flex flex-col gap-4">
            <HelpCircle className="w-8 h-8 text-black cursor-pointer hover:text-cognihash-primary" />
            <Settings className="w-8 h-8 text-black cursor-pointer hover:text-cognihash-primary" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-8">
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
            <Card className="w-full bg-gray-100 border-0 p-4">
              <div className="space-y-4">
                {/* Input Label */}
                <label className="text-black text-sm font-medium">
                  What can I do for you?
                </label>
                
                {/* Input Area */}
                <div className="relative">
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything about blockchain data..."
                    className="w-full h-20 bg-transparent border-0 resize-none text-black placeholder-gray-500 focus:outline-none"
                  />
                  
                  {/* Send Button */}
                  <Button
                    onClick={handleSend}
                    className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white"
                  >
                    Send
                  </Button>
                </div>
                
                {/* Bottom Controls */}
                <div className="flex justify-between items-center">
                  {/* Agent Selector */}
                  <div className="flex items-center gap-4">
                    <Card className="bg-white shadow-sm px-6 py-3 flex items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
                      <span className="text-black text-sm">Choose your agent</span>
                      <ChevronDown className="w-4 h-4 text-black transform -rotate-90" />
                      <Badge variant="outline" className="text-xs">Agent</Badge>
                    </Card>
                  </div>
                  
                  {/* Upload Button */}
                  <Card className="bg-white shadow-sm px-6 py-3 flex items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
                    <Plus className="w-4 h-4 text-black" />
                    <span className="text-black text-sm">Upload PDF or Image</span>
                  </Card>
                </div>
              </div>
            </Card>

            {/* Welcome Message */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Welcome back! 👋
              </h2>
              <p className="text-gray-600">
                Connected wallet: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
