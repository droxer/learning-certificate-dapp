"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY } from "@/components/I18nProvider";
import { resources } from "@/i18n";

type LanguageCode = keyof typeof resources;

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside and ensure proper cleanup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Only add listeners if dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Ensure dropdown is closed on component unmount
  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  const availableLanguages = useMemo(
    () => (["en", "zh", "ko"] as LanguageCode[]).filter(
      (code) => Object.prototype.hasOwnProperty.call(resources, code)
    ),
    []
  );

  const currentLanguage = useMemo(() => {
    const normalized = i18n.language.split("-")[0] as LanguageCode;
    return availableLanguages.includes(normalized) ? normalized : "en";
  }, [availableLanguages, i18n.language]);

  const changeLanguage = (lng: LanguageCode) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    }
  };

  const getLanguageInfo = (code: LanguageCode) => {
    const languageMap = {
      en: {
        name: "English",
        flag: "🇺🇸",
        nativeName: "English"
      },
      zh: {
        name: "Chinese",
        flag: "🇨🇳",
        nativeName: "中文"
      },
      ko: {
        name: "Korean",
        flag: "🇰🇷",
        nativeName: "한국어"
      }
    };
    return languageMap[code] || { name: code, flag: "🌐", nativeName: code };
  };

  if (!mounted) {
    return (
      <div className="h-11 w-11 animate-pulse rounded-xl bg-gradient-to-br from-gray-200 to-gray-300" aria-hidden />
    );
  }

  const currentLang = getLanguageInfo(currentLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium shadow-md shadow-indigo-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t("common.language")}: ${currentLang.name}`}
        title={`Change language (${currentLang.name})`}
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border border-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-xl shadow-indigo-500/10">
          <div className="p-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {t("common.selectLanguage")}
            </div>
            {availableLanguages.map((languageCode) => {
              const isActive = languageCode === currentLanguage;
              const langInfo = getLanguageInfo(languageCode);

              return (
                <button
                  key={languageCode}
                  onClick={() => changeLanguage(languageCode)}
                  role="option"
                  aria-selected={isActive}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="text-base leading-none">{langInfo.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm ${isActive ? 'text-white' : 'text-gray-900'}`}>
                      {langInfo.nativeName}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                      {langInfo.name}
                    </div>
                  </div>
                  {isActive && (
                    <div className="flex items-center justify-center h-4 w-4 rounded-full bg-white/20">
                      <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
