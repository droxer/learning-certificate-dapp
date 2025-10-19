// learning-certificate-dapp/app/layout.tsx
import "@/i18n"; // 初始化 i18next
import { Inter } from "next/font/google";
import "@/globals.css";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "@/lib/wagmi";
import { sepolia } from "wagmi/chains";
import { ReactNode } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={[sepolia]}>
            <main className="min-h-screen p-4">
              <div className="flex justify-between mb-4">
                <h1 className="text-lg font-semibold">Learning Cert DApp</h1>
                <LanguageSwitcher />
              </div>
              {children}
            </main>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
