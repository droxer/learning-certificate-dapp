"use client";

import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface RainbowKitWrapperProps {
  children: ReactNode;
}

// Create a singleton query client to avoid recreation on each render
let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always create a new client
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
  } else {
    // Browser: use singleton pattern
    if (!clientQueryClientSingleton) {
      clientQueryClientSingleton = new QueryClient({
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
    }
    return clientQueryClientSingleton;
  }
};

// Dynamically import RainbowKitProvider to avoid SSR issues
const DynamicRainbowKitProvider = dynamic(
  () => import("@rainbow-me/rainbowkit").then((mod) => mod.RainbowKitProvider),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

export function RainbowKitWrapper({ children }: RainbowKitWrapperProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DynamicRainbowKitProvider>
        {children}
      </DynamicRainbowKitProvider>
    </QueryClientProvider>
  );
}