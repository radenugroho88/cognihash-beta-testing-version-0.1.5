import React, { createContext, useContext, useEffect, useState } from 'react';

interface PhantomWallet {
  isPhantom: boolean;
  publicKey: any;
  isConnected: boolean;
  signTransaction: (transaction: any) => Promise<any>;
  signAllTransactions: (transactions: any[]) => Promise<any[]>;
  signMessage: (message: Uint8Array | string) => Promise<any>;
  connect: (opts?: any) => Promise<{ publicKey: any }>;
  disconnect: () => Promise<void>;
  on: (event: string, handler: Function) => void;
  request: (method: string, params?: any) => Promise<any>;
}

interface PhantomContextValue {
  phantom: PhantomWallet | null;
  connected: boolean;
  connecting: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage: (message: string) => Promise<Uint8Array | null>;
}

const PhantomContext = createContext<PhantomContextValue | null>(null);

export const usePhantom = () => {
  const context = useContext(PhantomContext);
  if (!context) {
    throw new Error('usePhantom must be used within a PhantomProvider');
  }
  return context;
};

interface PhantomProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomWallet;
    };
  }
}

export function PhantomProvider({ children }: PhantomProviderProps) {
  const [phantom, setPhantom] = useState<PhantomWallet | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const getPhantom = () => {
      if (window.phantom?.solana?.isPhantom) {
        return window.phantom.solana;
      }
      return null;
    };

    const phantom = getPhantom();
    if (phantom) {
      setPhantom(phantom);
      
      // Check if already connected
      if (phantom.isConnected && phantom.publicKey) {
        setConnected(true);
        setPublicKey(phantom.publicKey.toString());
      }

      // Listen for connection events
      phantom.on('connect', (publicKey: any) => {
        setConnected(true);
        setPublicKey(publicKey.toString());
      });

      phantom.on('disconnect', () => {
        setConnected(false);
        setPublicKey(null);
      });
    } else {
      // Phantom is not installed
      console.log('Phantom wallet is not installed');
    }
  }, []);

  const connect = async () => {
    if (!phantom) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    try {
      setConnecting(true);
      const resp = await phantom.connect();
      setConnected(true);
      setPublicKey(resp.publicKey.toString());
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    if (phantom) {
      try {
        await phantom.disconnect();
        setConnected(false);
        setPublicKey(null);
      } catch (error) {
        console.error('Error disconnecting from Phantom:', error);
      }
    }
  };

  const signMessage = async (message: string): Promise<Uint8Array | null> => {
    if (!phantom || !connected) {
      throw new Error('Phantom wallet not connected');
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await phantom.signMessage(encodedMessage);
      return signedMessage.signature;
    } catch (error) {
      console.error('Error signing message:', error);
      return null;
    }
  };

  const value: PhantomContextValue = {
    phantom,
    connected,
    connecting,
    publicKey,
    connect,
    disconnect,
    signMessage,
  };

  return (
    <PhantomContext.Provider value={value}>
      {children}
    </PhantomContext.Provider>
  );
}
