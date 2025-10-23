"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Navigation } from "@/components/Navigation";
import { MobileMenuButton } from "@/components/MobileMenuButton";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                  <span className="text-white font-bold text-lg">LC</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <Link href="/" className="text-gray-900 no-underline hover:text-blue-600 transition-colors">
                    {t("header.title")}
                  </Link>
                </h1>
                <p className="text-xs text-gray-500 hidden md:block">
                  {t("header.tagline")}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Navigation />
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <MobileMenuButton toggleMobileMenu={toggleMobileMenu} isOpen={isMobileMenuOpen} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <Navigation isMobile={true} closeMobileMenu={closeMobileMenu} />
        </div>
      )}
    </header>
  );
}
