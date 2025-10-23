"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { RainbowKitWrapper } from "@/components/RainbowKitWrapper";
import { WagmiProvider, createConfig, http } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { sepolia, mainnet } from "wagmi/chains";
import { I18nProvider } from "@/components/I18nProvider";

interface Web3ProvidersProps {
  children: ReactNode;
}

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (typeof window !== "undefined" && !projectId) {
  console.warn(
    "WalletConnect disabled: set NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID to enable it."
  );
}

const connectors = [
  injected({ shimDisconnect: true }),
  coinbaseWallet({ appName: "Learning Certificate" }),
  ...(projectId ? [walletConnect({ projectId })] : []),
];

// Create wagmi config with SSR handling
const getWagmiConfig = () => createConfig({
  chains: [sepolia, mainnet],
  connectors,
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: false,
});

// Create query client outside component
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
      mutations: {
        retry: false,
      },
    },
  });
};

export function Web3Providers({ children }: Web3ProvidersProps) {
  const wagmiConfig = getWagmiConfig();

  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitWrapper>
        <I18nProvider>{children}</I18nProvider>
      </RainbowKitWrapper>
    </WagmiProvider>
  );
}
