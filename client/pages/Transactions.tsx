import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { Bell, Sun, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import Sidebar from "../components/Sidebar";

export default function Transactions() {
  const { connected, publicKey } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verified = localStorage.getItem("cognihash_verified");
    const storedWallet = localStorage.getItem("cognihash_wallet");

    if (verified === "true" && connected && publicKey && storedWallet === publicKey.toString()) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
    setLoading(false);
  }, [connected, publicKey]);

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
              Please connect your wallet and complete verification to access transaction history.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/beta")}
              className="w-full bg-cognihash-primary hover:bg-cognihash-secondary"
            >
              Connect Wallet
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
          <div className="relative">
            <Bell className="w-6 h-6 text-black" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          
          <Button 
            variant="secondary" 
            className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 rounded-2xl"
          >
            Upgrade Now
          </Button>
          
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
          
          <Sun className="w-6 h-6 text-black" />
          
          <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
            <span className="text-xs">👤</span>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
              <p className="text-gray-600">View and analyze your blockchain transaction history</p>
            </div>

            <Card className="p-8 text-center">
              <div className="space-y-4">
                <div className="text-6xl">📋</div>
                <h3 className="text-xl font-semibold">No Transactions Found</h3>
                <p className="text-gray-600">
                  Your transaction history will appear here once you start making transactions.
                </p>
                <Button 
                  onClick={() => navigate("/portfolio")}
                  className="bg-cognihash-primary hover:bg-cognihash-secondary"
                >
                  View Portfolio
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
