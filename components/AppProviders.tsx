"use client";

import { ReactNode } from "react";
import { Web3Wrapper } from "@/components/Web3Wrapper";

export function AppProviders({ children }: { children: ReactNode }) {
  return <Web3Wrapper>{children}</Web3Wrapper>;
}
