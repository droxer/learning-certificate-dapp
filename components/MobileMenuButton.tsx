"use client";

import { useTranslation } from "react-i18next";

interface MobileMenuButtonProps {
  toggleMobileMenu: () => void;
  isOpen: boolean;
}

export function MobileMenuButton({ toggleMobileMenu, isOpen }: MobileMenuButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleMobileMenu}
      className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={isOpen ? t("navigation.closeMenu") : t("navigation.openMenu")}
      aria-expanded={isOpen}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}
