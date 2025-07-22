import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextProviderProps {
    children: React.ReactNode;
}

export function WalletContextProvider({ children }: WalletContextProviderProps) {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => {
            try {
                return [
                    new PhantomWalletAdapter(),
                    // Add other wallet adapters here if needed
                ];
            } catch (error) {
                console.log('Wallet adapter initialization:', error);
                return [];
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    const onError = (error: any) => {
        // Suppress common wallet extension initialization errors
        if (error?.message?.includes('register') ||
            error?.toString?.()?.includes('register') ||
            error?.name?.includes('WalletNotConnectedError')) {
            return; // Silently ignore these errors
        }
        console.log('Wallet error:', error);
    };

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect onError={onError}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
