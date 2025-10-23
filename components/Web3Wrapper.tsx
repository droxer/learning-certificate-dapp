"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamic wrapper for Web3 providers to prevent SSR
const DynamicWeb3Providers = dynamic(
  () => import("./Web3Providers").then((mod) => mod.Web3Providers),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

interface Web3WrapperProps {
  children: ReactNode;
}

export function Web3Wrapper({ children }: Web3WrapperProps) {
  return <DynamicWeb3Providers>{children}</DynamicWeb3Providers>;
}