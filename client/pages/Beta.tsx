import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Sun } from "lucide-react";

interface WalletOption {
  name: string;
  icon: string;
  adapter: string;
}

const walletOptions: WalletOption[] = [
  {
    name: "Phantom",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/30159e00472bc78f2b4a10f3c8ce102c3c02f451?width=64",
    adapter: "phantom"
  },
  {
    name: "Solflare", 
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/0304b847cedfc0779c0593642c633d97466d8ed8?width=64",
    adapter: "solflare"
  },
  {
    name: "Backpack",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/e1744516693676bdbf121eb50b66038e7f51be58?width=64", 
    adapter: "backpack"
  }
];

export default function Beta() {
  const { connect, wallets, connected, publicKey, signMessage } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already has verified access
    const verified = localStorage.getItem("cognihash_verified");
    if (verified === "true" && connected) {
      setHasAccess(true);
    }
  }, [connected]);

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true);
    setSelectedWallet(walletName);

    try {
      // Special handling for Phantom
      if (walletName.toLowerCase() === 'phantom') {
        if (window.phantom?.solana) {
          const phantom = window.phantom.solana;
          await phantom.connect();
          return;
        } else {
          // Phantom not installed, redirect to install
          window.open('https://phantom.app/', '_blank');
          return;
        }
      }

      // Use wallet adapter for other wallets
      const wallet = wallets.find(w =>
        w.adapter.name.toLowerCase().includes(walletName.toLowerCase())
      );

      if (wallet) {
        await connect(wallet.adapter);

        // If connected, automatically sign message for verification
        if (publicKey && signMessage) {
          await handleSignMessage();
        }
      } else {
        console.log(`${walletName} wallet not found`);
      }
    } catch (error) {
      console.error(`Error connecting to ${walletName}:`, error);
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const handleSignMessage = async () => {
    if (!connected || !publicKey || !signMessage) return;
    
    try {
      const message = `Welcome to CogniHash Beta!\n\nSign this message to verify your wallet ownership and gain access to the dashboard.\n\nWallet: ${publicKey.toString()}\nTimestamp: ${new Date().getTime()}`;
      const encodedMessage = new TextEncoder().encode(message);
      
      await signMessage(encodedMessage);
      
      // Store verification in localStorage
      localStorage.setItem("cognihash_verified", "true");
      localStorage.setItem("cognihash_wallet", publicKey.toString());
      
      setHasAccess(true);
      
      // Navigate to dashboard after a brief delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  if (hasAccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-cognihash-secondary rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-lexend font-bold text-black">
            Welcome to CogniHash! 🎉
          </h2>
          <p className="text-gray-600 font-lexend">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <header className="w-full h-16 px-5 py-2 flex justify-end items-center backdrop-blur-[17.5px]">
        <div className="flex px-2 justify-end items-center gap-[15px]">
          <Sun className="w-6 h-6 text-black" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="w-[424px] bg-white rounded-xl shadow-[0px_4px_50px_0px_rgba(0,0,0,0.10)] p-6 flex flex-col items-center gap-4">
          {/* Logo Section */}
          <div className="w-[280px] px-5 py-4 border border-[#E5E5E5] rounded bg-white/25 backdrop-blur-[17.5px] flex items-center justify-center gap-2">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/d3ad95dc35cd88644ec4e7e228b7c5efdd8aa022?width=48"
              alt="CogniHash Logo"
              className="w-6 h-[30px] flex-shrink-0"
            />
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-black font-lexend text-[22px] font-bold leading-normal tracking-[-0.66px]">
                CogniHash
              </h1>
              <p className="text-black/50 font-lexend text-[12.5px] font-semibold leading-[13px]">
                Real Time Crypto Intelligence
              </p>
            </div>
          </div>

          {/* Wallet Options */}
          <div className="w-full px-2 py-3 flex flex-col items-center gap-4 backdrop-blur-[17.5px]">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleWalletConnect(wallet.name)}
                disabled={isConnecting}
                className="w-[360px] h-14 rounded-lg border border-[#E5E5E5] bg-white backdrop-blur-[17.5px] relative flex items-center hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <img
                  src={wallet.icon}
                  alt={`${wallet.name} Logo`}
                  className="w-8 h-8 absolute left-6 top-3 flex justify-center items-center flex-shrink-0"
                />
                <span className="text-black font-lexend text-base font-semibold absolute left-[79px] top-5 leading-4">
                  {wallet.name}
                  {isConnecting && selectedWallet === wallet.name && (
                    <span className="ml-2 text-sm text-gray-500">Connecting...</span>
                  )}
                </span>
                <ChevronRight className="w-6 h-6 text-[#717A8C] absolute right-6 top-4 transform rotate-0" />
              </button>
            ))}
          </div>

          {/* Connection Status */}
          {connected && (
            <div className="w-full text-center space-y-3 mt-4">
              <div className="text-sm text-gray-600 font-lexend">
                Connected: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
              </div>
              <button
                onClick={handleSignMessage}
                className="w-full px-6 py-3 bg-cognihash-primary text-white rounded-lg font-lexend font-semibold hover:bg-cognihash-secondary transition-colors"
              >
                Sign Message & Access Dashboard
              </button>
            </div>
          )}

          {/* Back to Home */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="text-cognihash-primary hover:text-cognihash-secondary transition-colors font-lexend text-sm"
            >
              ← Back to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
