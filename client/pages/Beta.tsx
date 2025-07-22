import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";

export default function Beta() {
  const { connected, publicKey, signMessage } = useWallet();
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already has verified access
    const verified = localStorage.getItem("cognihash_verified");
    if (verified === "true" && connected) {
      setHasAccess(true);
    }
  }, [connected]);

  const handleSignMessage = async () => {
    if (!connected || !publicKey || !signMessage) return;
    
    setIsVerifying(true);
    
    try {
      const message = `Welcome to CogniHash Beta!\n\nSign this message to verify your wallet ownership and gain access to the dashboard.\n\nWallet: ${publicKey.toString()}\nTimestamp: ${new Date().getTime()}`;
      const encodedMessage = new TextEncoder().encode(message);
      
      await signMessage(encodedMessage);
      
      // Store verification in localStorage (in production, you'd verify this server-side)
      localStorage.setItem("cognihash_verified", "true");
      localStorage.setItem("cognihash_wallet", publicKey.toString());
      
      setHasAccess(true);
    } catch (error) {
      console.error("Error signing message:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAccessDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-cognihash-dark min-h-screen">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white">
                Join the <span className="gradient-text">CogniHash Beta</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto">
                Connect your Solana wallet to access the future of blockchain intelligence.
                Get early access to AI-powered crypto insights.
              </p>
            </div>

            {/* Wallet Connection Section */}
            <div className="max-w-2xl mx-auto">
              <div className="border border-white rounded-3xl bg-cognihash-card p-8 lg:p-12">
                {!connected && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-2xl lg:text-3xl font-bold text-white">
                        Connect Your Wallet
                      </h2>
                      <p className="text-lg text-white/70">
                        Connect your Solana wallet to get started with CogniHash Beta
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <WalletMultiButton className="!bg-cognihash-primary hover:!bg-cognihash-secondary !rounded-lg !px-8 !py-4 !text-lg !font-medium transition-all duration-300 hover:scale-105" />
                    </div>
                  </div>
                )}

                {connected && !hasAccess && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-cognihash-secondary rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-cognihash-dark" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-bold text-white">
                        Wallet Connected!
                      </h2>
                      <p className="text-lg text-white/70">
                        Wallet: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
                      </p>
                      <p className="text-lg text-white/70">
                        Sign a message to verify ownership and gain access to the dashboard
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleSignMessage}
                        disabled={isVerifying}
                        className="cognihash-button text-white px-8 py-4 text-lg font-medium rounded-lg hover:scale-105 transition-transform"
                      >
                        {isVerifying ? "Verifying..." : "Sign Message & Access Beta"}
                      </Button>
                    </div>
                  </div>
                )}

                {connected && hasAccess && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-cognihash-secondary rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-8 h-8 text-cognihash-dark" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      
                      <h2 className="text-2xl lg:text-3xl font-bold text-white">
                        Welcome to CogniHash Beta! 🎉
                      </h2>
                      <p className="text-lg text-white/70">
                        Your wallet has been verified. You now have access to the dashboard.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        onClick={handleAccessDashboard}
                        className="cognihash-button text-white px-8 py-4 text-lg font-medium rounded-lg hover:scale-105 transition-transform animate-glow"
                      >
                        Access Dashboard →
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="border border-white/20 rounded-2xl bg-cognihash-card/50 p-6">
                <div className="text-cognihash-secondary text-2xl font-bold mb-2">
                  AI-Powered Analysis
                </div>
                <p className="text-white/70">
                  Get instant insights from complex blockchain data with natural language queries
                </p>
              </div>
              
              <div className="border border-white/20 rounded-2xl bg-cognihash-card/50 p-6">
                <div className="text-cognihash-secondary text-2xl font-bold mb-2">
                  Real-Time Data
                </div>
                <p className="text-white/70">
                  Access live blockchain data across multiple networks and protocols
                </p>
              </div>
              
              <div className="border border-white/20 rounded-2xl bg-cognihash-card/50 p-6">
                <div className="text-cognihash-secondary text-2xl font-bold mb-2">
                  No-Code Interface
                </div>
                <p className="text-white/70">
                  Simple, intuitive dashboard that requires no technical expertise
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="pt-8">
              <Link 
                to="/" 
                className="text-cognihash-secondary hover:text-cognihash-tertiary transition-colors text-lg"
              >
                ← Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
