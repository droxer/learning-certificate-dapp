"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  isMobile?: boolean;
  closeMobileMenu?: () => void;
}

export function Navigation({ isMobile = false, closeMobileMenu = () => {} }: NavigationProps) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navClass = isMobile
    ? "fixed inset-x-0 top-16 bottom-0 bg-white z-45 flex flex-col items-center justify-center py-8 space-y-8 shadow-lg"
    : "flex items-center gap-1";

  const baseLinkClassDesktop = "flex px-5 py-2.5 font-semibold text-sm transition-all duration-300 rounded-xl group";
  const baseLinkClassMobile = "flex px-6 py-4 font-semibold text-lg transition-all duration-300 rounded-xl group w-full text-center";
  const activeLinkClass = isMobile
    ? `${baseLinkClassMobile} bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`
    : `${baseLinkClassDesktop} bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`;
  const inactiveLinkClass = isMobile
    ? `${baseLinkClassMobile} text-gray-700 hover:text-gray-900 hover:bg-gray-100`
    : `${baseLinkClassDesktop} text-gray-700 hover:text-gray-900 hover:bg-gray-100`;

  const getIconForPath = (path: string) => {
    switch (path) {
      case "/":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "/mint":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className={navClass} aria-label={isMobile ? "Mobile navigation" : "Main navigation"}>
      <ul className={isMobile ? "flex flex-col items-center gap-8 list-none" : "flex items-center gap-1 list-none"}>
        <li>
          <Link
            href="/"
            className={pathname === "/" ? activeLinkClass : inactiveLinkClass}
            onClick={closeMobileMenu}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <div className="flex items-center justify-center gap-2">
              <span>
                {getIconForPath("/")}
              </span>
              <span>
                {t("navigation.home")}
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/mint"
            className={pathname === "/mint" ? activeLinkClass : inactiveLinkClass}
            onClick={closeMobileMenu}
            aria-current={pathname === "/mint" ? "page" : undefined}
          >
            <div className="flex items-center justify-center gap-2">
              <span>
                {getIconForPath("/mint")}
              </span>
              <span>
                {t("navigation.mint")}
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
