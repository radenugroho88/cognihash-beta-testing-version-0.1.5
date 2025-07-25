import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Wallet, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Header } from "../components/Header";

interface WalletOption {
  name: string;
  icon: string;
  adapter: string;
  description: string;
}

const walletOptions: WalletOption[] = [
  {
    name: "Phantom",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/30159e00472bc78f2b4a10f3c8ce102c3c02f451?width=64",
    adapter: "phantom",
    description: "Popular Solana wallet with seamless DeFi integration",
  },
  {
    name: "Solflare",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/0304b847cedfc0779c0593642c633d97466d8ed8?width=64",
    adapter: "solflare",
    description: "Feature-rich wallet with advanced portfolio tracking",
  },
  {
    name: "Backpack",
    icon: "https://api.builder.io/api/v1/image/assets/TEMP/e1744516693676bdbf121eb50b66038e7f51be58?width=64",
    adapter: "backpack",
    description: "Next-gen wallet built for serious traders",
  },
];

export default function Beta() {
  const { connect, wallets, connected, publicKey, signMessage } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [step, setStep] = useState<"connect" | "verify" | "success">("connect");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user already has verified access
    const verified = localStorage.getItem("cognihash_verified");
    const storedWallet = localStorage.getItem("cognihash_wallet");

    if (
      verified === "true" &&
      connected &&
      publicKey &&
      storedWallet === publicKey.toString()
    ) {
      setHasAccess(true);
      setStep("success");
    } else if (connected && publicKey) {
      setStep("verify");
    } else {
      setStep("connect");
      setHasAccess(false);
    }
  }, [connected, publicKey]);

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true);
    setSelectedWallet(walletName);

    try {
      // Find the wallet adapter
      const wallet = wallets.find((w) => {
        const adapterName = w.adapter.name.toLowerCase();
        const targetName = walletName.toLowerCase();

        // Handle different naming patterns
        if (targetName === "phantom" && adapterName.includes("phantom"))
          return true;
        if (targetName === "solflare" && adapterName.includes("solflare"))
          return true;
        if (targetName === "backpack" && adapterName.includes("backpack"))
          return true;

        return adapterName.includes(targetName);
      });

      if (wallet) {
        console.log(`Connecting to ${walletName} wallet:`, wallet.adapter.name);
        await wallet.adapter.connect();
      } else {
        console.log(
          `${walletName} wallet adapter not found. Available wallets:`,
          wallets.map((w) => w.adapter.name),
        );

        // If wallet not found, suggest installation
        if (walletName.toLowerCase() === "phantom") {
          window.open("https://phantom.app/", "_blank");
        } else if (walletName.toLowerCase() === "solflare") {
          window.open("https://solflare.com/", "_blank");
        } else if (walletName.toLowerCase() === "backpack") {
          window.open("https://www.backpack.app/", "_blank");
        }
      }
    } catch (error) {
      console.error(`Error connecting to ${walletName}:`, error);

      // Handle specific error cases
      if (error.message?.includes("User rejected")) {
        console.log("User rejected the connection request");
      } else if (error.message?.includes("not installed")) {
        console.log(`${walletName} wallet is not installed`);
        // Open installation page
        if (walletName.toLowerCase() === "phantom") {
          window.open("https://phantom.app/", "_blank");
        }
      }
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  const handleSignMessage = async () => {
    if (!connected || !publicKey || !signMessage) return;

    setIsVerifying(true);

    try {
      const message = `Welcome to CogniHash Beta!\n\nSign this message to verify your wallet ownership and gain access to the dashboard.\n\nWallet: ${publicKey.toString()}\nTimestamp: ${new Date().getTime()}`;
      const encodedMessage = new TextEncoder().encode(message);

      await signMessage(encodedMessage);

      // Store verification in localStorage
      localStorage.setItem("cognihash_verified", "true");
      localStorage.setItem("cognihash_wallet", publicKey.toString());

      setHasAccess(true);
      setStep("success");

      // Navigate to dashboard after delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
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

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[234px] opacity-20">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ac9e6225e937dffab147aa936eba1ed8c7458741?width=3840"
            alt="Wave Grid Top"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8 mb-12">
            {/* Header */}
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="border-cognihash-secondary text-cognihash-secondary"
              >
                Beta Access
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white">
                Connect Your <span className="gradient-text">Wallet</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Choose your preferred Solana wallet to access the future of
                blockchain intelligence.
              </p>
            </div>
          </div>

          {/* Main Card */}
          <Card className="max-w-2xl mx-auto bg-cognihash-card border-white/20 shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-0"></CardHeader>

            <CardContent className="space-y-6">
              {step === "connect" && (
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="text-white text-lg font-semibold">
                      Choose Your Wallet
                    </h3>
                    <p className="text-white/70 text-sm">
                      Connect with your preferred Solana wallet to continue
                    </p>
                  </div>

                  <div className="space-y-3">
                    {walletOptions.map((wallet) => (
                      <Button
                        key={wallet.name}
                        onClick={() => handleWalletConnect(wallet.name)}
                        disabled={isConnecting}
                        variant="outline"
                        className="w-full h-auto p-4 border-white/20 bg-cognihash-dark/50 hover:bg-cognihash-card hover:border-cognihash-secondary transition-all group"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <img
                              src={wallet.icon}
                              alt={`${wallet.name} Logo`}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="text-left">
                              <div className="text-white font-semibold flex items-center gap-2">
                                {wallet.name}
                                {isConnecting &&
                                  selectedWallet === wallet.name && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  )}
                              </div>
                              <div className="text-white/60 text-sm">
                                {wallet.description}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-cognihash-secondary transition-colors" />
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {step === "verify" && (
                <div className="space-y-6 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-cognihash-secondary/20 rounded-full flex items-center justify-center">
                      <Wallet className="w-8 h-8 text-cognihash-secondary" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white text-xl font-semibold">
                        Wallet Connected!
                      </h3>
                      <Badge
                        variant="outline"
                        className="border-cognihash-secondary text-cognihash-secondary"
                      >
                        {publicKey?.toString().slice(0, 8)}...
                        {publicKey?.toString().slice(-8)}
                      </Badge>
                      <p className="text-white/70">
                        Sign a message to verify ownership and gain access to
                        the dashboard
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleSignMessage}
                    disabled={isVerifying}
                    className="cognihash-button w-full py-3 text-lg"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Sign Message & Access Beta"
                    )}
                  </Button>
                </div>
              )}

              {step === "success" && (
                <div className="space-y-6 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-cognihash-secondary/20 rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle className="w-8 h-8 text-cognihash-secondary" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white text-xl font-semibold">
                        Welcome to CogniHash Beta! 🎉
                      </h3>
                      <p className="text-white/70">
                        Your wallet has been verified. You now have access to
                        the dashboard.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleAccessDashboard}
                    className="cognihash-button w-full py-3 text-lg animate-glow"
                  >
                    Access Dashboard →
                  </Button>
                </div>
              )}

              {/* Debug Info & Fallback */}
              {process.env.NODE_ENV === "development" && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-2">Debug Info:</p>
                    <p className="text-white/60 text-xs">
                      Available wallets: {wallets.length}
                    </p>
                    <div className="text-white/60 text-xs">
                      {wallets.map((w) => w.adapter.name).join(", ")}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-2">
                      Alternative Connection:
                    </p>
                    <WalletMultiButton className="!bg-cognihash-primary hover:!bg-cognihash-secondary !text-white" />
                  </div>
                </div>
              )}

              {/* Back to Home */}
              <div className="text-center pt-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="text-cognihash-secondary hover:text-cognihash-tertiary"
                >
                  ← Back to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
