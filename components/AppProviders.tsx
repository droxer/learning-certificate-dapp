"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import type { Config } from "wagmi";
import { createWagmiConfig, chains } from "@/lib/wagmi";
import { I18nProvider } from "@/components/I18nProvider";

declare global {
  // eslint-disable-next-line no-var
  var __WAGMI_CONFIG__: Config | undefined;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isBrowserReady, setIsBrowserReady] = useState(false);

  useEffect(() => {
    setIsBrowserReady(true);
  }, []);

  const wagmiConfig = useMemo<Config | null>(() => {
    if (!isBrowserReady || typeof window === "undefined") {
      return null;
    }

    if (!globalThis.__WAGMI_CONFIG__) {
      const { connectors } = getDefaultWallets({
        appName: "Learning Certificate DApp",
        projectId: "YOUR_PROJECT_ID", // Replace with your actual WalletConnect project ID
        chains,
      });

      globalThis.__WAGMI_CONFIG__ = createWagmiConfig(connectors);
    }

    return globalThis.__WAGMI_CONFIG__ ?? null;
  }, [isBrowserReady]);

  if (!wagmiConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm font-medium text-slate-300">
        Preparing wallet experience...
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <I18nProvider>{children}</I18nProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
