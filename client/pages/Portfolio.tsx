import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Bell, Sun, ChevronDown, TrendingUp, TrendingDown, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Sidebar from "../components/Sidebar";

export default function Portfolio() {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<number>(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has verified access
    const verified = localStorage.getItem("cognihash_verified");
    const storedWallet = localStorage.getItem("cognihash_wallet");

    if (verified === "true" && connected && publicKey && storedWallet === publicKey.toString()) {
      setHasAccess(true);
      fetchBalance();
    } else {
      setHasAccess(false);
    }
    setLoading(false);
  }, [connected, publicKey]);

  const fetchBalance = async () => {
    if (!publicKey || !connection) return;
    
    setBalanceLoading(true);
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setBalanceLoading(false);
    }
  };

  const copyAddress = async () => {
    if (!publicKey) return;
    
    try {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  const openInExplorer = () => {
    if (!publicKey) return;
    window.open(`https://explorer.solana.com/address/${publicKey.toString()}`, '_blank');
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
              Please connect your wallet and complete verification to access the portfolio.
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

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
              <p className="text-gray-600">Monitor your wallet balance and portfolio performance</p>
            </div>

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Balance Card */}
              <Card className="bg-gradient-to-br from-cognihash-primary to-cognihash-secondary text-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-white/80">Total Balance</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={fetchBalance}
                    className="w-8 h-8 text-white/80 hover:text-white hover:bg-white/20"
                    disabled={balanceLoading}
                  >
                    <RefreshCw className={`w-4 h-4 ${balanceLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {balanceLoading ? (
                      <div className="animate-pulse">Loading...</div>
                    ) : (
                      `${balance.toFixed(4)} SOL`
                    )}
                  </div>
                  <p className="text-white/80 text-sm mt-2">
                    ≈ ${(balance * 85.32).toFixed(2)} USD
                  </p>
                </CardContent>
              </Card>

              {/* Performance Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">24h Change</CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+2.34%</div>
                  <p className="text-gray-600 text-sm mt-2">
                    +0.0234 SOL
                  </p>
                </CardContent>
              </Card>

              {/* Network Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Network</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Mainnet
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">Solana</div>
                  <p className="text-gray-600 text-sm mt-2">
                    Fast & Secure
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Wallet Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Wallet Details
                  <Badge variant="secondary">Connected</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Wallet Address</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="font-mono text-sm flex-1 truncate">
                      {publicKey?.toString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyAddress}
                      className="w-8 h-8"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={openInExplorer}
                      className="w-8 h-8"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-green-600">Address copied to clipboard!</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Wallet Type</label>
                    <p className="text-sm text-gray-900">Solana Web3 Wallet</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Connected Since</label>
                    <p className="text-sm text-gray-900">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Token Holdings */}
            <Card>
              <CardHeader>
                <CardTitle>Token Holdings</CardTitle>
                <p className="text-sm text-gray-600">Your current token balances</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Solana</p>
                        <p className="text-sm text-gray-600">SOL</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{balance.toFixed(4)} SOL</p>
                      <p className="text-sm text-gray-600">${(balance * 85.32).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="text-center py-8 text-gray-500">
                    <p>No other tokens found in this wallet</p>
                    <p className="text-sm mt-2">Connect a wallet with token holdings to see more</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm">Buy SOL</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <TrendingDown className="w-5 h-5" />
                    <span className="text-sm">Sell SOL</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <ExternalLink className="w-5 h-5" />
                    <span className="text-sm">Send</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <RefreshCw className="w-5 h-5" />
                    <span className="text-sm">Refresh</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
