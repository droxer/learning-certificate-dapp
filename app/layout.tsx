// learning-certificate-dapp/app/layout.tsx
import { Inter } from "next/font/google";
import "@/globals.css";
import { ReactNode } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import { AppProviders } from "@/components/AppProviders";

const inter = Inter({ subsets: ["latin"] });

function Navigation() {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-200">
      <Link
        href="/"
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-indigo-400/60 hover:bg-white/10 hover:text-white"
      >
        Home
      </Link>
      <Link
        href="/mint"
        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-indigo-400/60 hover:bg-white/10 hover:text-white"
      >
        Mint Certificate
      </Link>
    </nav>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <main className="relative min-h-screen w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/30 blur-3xl" />
              <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
            </div>
            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-10 sm:px-10 lg:px-14">
              <header className="glass-panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="space-y-3">
                  <span className="feature-badge">Web3 education</span>
                  <h1 className="text-3xl font-semibold text-white sm:text-4xl">
                    Learning Certificate DApp
                  </h1>
                  <p className="max-w-xl text-sm text-slate-300 sm:text-base">
                    Issue, manage, and showcase blockchain-backed learning certificates with a sleek,
                    responsive experience for both educators and students.
                  </p>
                </div>
                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Navigation />
                  <LanguageSwitcher />
                </div>
              </header>
              <section className="glass-panel flex-1 p-6 sm:p-8">
                {children}
              </section>
            </div>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
