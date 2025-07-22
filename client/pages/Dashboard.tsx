import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Search, TrendingUp, Activity, DollarSign, Users } from "lucide-react";

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const [hasAccess, setHasAccess] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has verified access
    const verified = localStorage.getItem("cognihash_verified");
    const storedWallet = localStorage.getItem("cognihash_wallet");
    
    if (verified === "true" && connected && publicKey && storedWallet === publicKey.toString()) {
      setHasAccess(true);
    } else {
      // Redirect to beta page if not verified
      navigate("/beta");
    }
  }, [connected, publicKey, navigate]);

  const handleQuery = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  if (!hasAccess) {
    return (
      <div className="bg-cognihash-dark min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-2 border-cognihash-secondary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-white">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cognihash-dark min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-cognihash-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/6aa47291b1deceac179cead818ec277edb612266?width=112"
                alt="CogniHash Logo" 
                className="w-10 h-10"
              />
              <h1 className="text-white font-jakarta font-bold text-xl">
                CogniHash Dashboard
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm">
                {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
              </span>
              <WalletMultiButton className="!bg-cognihash-primary/20 !border !border-cognihash-primary hover:!bg-cognihash-primary/30" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Welcome to CogniHash Beta! 🚀
          </h2>
          <p className="text-white/70 text-lg">
            Ask any question about blockchain data and get AI-powered insights instantly.
          </p>
        </div>

        {/* Query Interface */}
        <Card className="bg-cognihash-card border-white/20 p-6 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Ask CogniHash</h3>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  placeholder="e.g., What are the top performing DeFi tokens today?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleQuery()}
                  className="pl-12 bg-cognihash-dark border-white/20 text-white placeholder:text-white/50 h-12"
                />
              </div>
              <Button 
                onClick={handleQuery}
                disabled={isLoading || !query.trim()}
                className="cognihash-button px-8 h-12"
              >
                {isLoading ? "Analyzing..." : "Ask"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Sample Queries */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Try these sample queries:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "What's the TVL of Solana DeFi protocols?",
              "Show me recent whale transactions",
              "Analyze NFT trading volume trends",
              "What are the gas fees on Ethereum?",
              "Find suspicious transaction patterns",
              "Compare DEX trading volumes"
            ].map((sampleQuery, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setQuery(sampleQuery)}
                className="text-left h-auto p-4 border-white/20 text-white hover:bg-cognihash-card/50 hover:border-cognihash-secondary"
              >
                "{sampleQuery}"
              </Button>
            ))}
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-cognihash-card border-white/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cognihash-secondary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-cognihash-secondary" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Queries Today</p>
                <p className="text-white text-2xl font-bold">247</p>
              </div>
            </div>
          </Card>

          <Card className="bg-cognihash-card border-white/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cognihash-secondary/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-cognihash-secondary" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Data Sources</p>
                <p className="text-white text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>

          <Card className="bg-cognihash-card border-white/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cognihash-secondary/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-cognihash-secondary" />
              </div>
              <div>
                <p className="text-white/70 text-sm">TVL Tracked</p>
                <p className="text-white text-2xl font-bold">$2.4B</p>
              </div>
            </div>
          </Card>

          <Card className="bg-cognihash-card border-white/20 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cognihash-secondary/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-cognihash-secondary" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Beta Users</p>
                <p className="text-white text-2xl font-bold">1.2K</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-cognihash-card border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { query: "What are the top DeFi protocols by TVL?", time: "2 minutes ago", status: "completed" },
              { query: "Show me recent whale transactions on Solana", time: "5 minutes ago", status: "completed" },
              { query: "Analyze NFT floor price trends", time: "8 minutes ago", status: "completed" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                <div>
                  <p className="text-white font-medium">"{activity.query}"</p>
                  <p className="text-white/50 text-sm">{activity.time}</p>
                </div>
                <span className="text-cognihash-secondary text-sm font-medium">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-cognihash-secondary hover:text-cognihash-tertiary transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
