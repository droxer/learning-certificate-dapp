// learning-certificate-dapp/app/layout.tsx
'use client';

import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AppProviders } from "@/components/AppProviders";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 to-gray-100`}>
        <AppProviders>
          {/* Skip navigation link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Skip to main content
          </a>

          <div className="flex min-h-screen flex-col">
            <Header />

            <main
              className="flex-1 overflow-y-auto"
              role="main"
              id="main-content"
            >
              <div className="max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 md:py-10">
                {children}
              </div>
            </main>

            <footer className="mt-auto border-t border-gray-200 py-8 bg-white/60 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <p className="text-sm text-gray-600">
                      © {currentYear} {t("footer.copyright")}
                    </p>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {t("common.beta")}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-600">
                      {t("footer.tagline")}
                    </span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
