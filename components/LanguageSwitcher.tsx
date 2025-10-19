"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { LANGUAGE_STORAGE_KEY } from "@/components/I18nProvider";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    }
  };

  const getCurrentLanguageName = () => {
    switch (i18n.language) {
      case 'zh':
        return t('language.chinese');
      case 'ko':
        return t('language.korean');
      default:
        return t('language.english');
    }
  };

  return (
    <div className="relative text-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 font-semibold text-slate-100 shadow-sm shadow-indigo-500/10 transition hover:border-indigo-400/60 hover:bg-white/20"
      >
        <span>{getCurrentLanguageName()}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-40 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-indigo-500/20">
          <button
            onClick={() => changeLanguage("zh")}
            className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-white/10 ${
              i18n.language === "zh" ? "bg-white/10 text-white" : "text-slate-200"
            }`}
          >
            {t("language.chinese")}
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-white/10 ${
              i18n.language === "en" ? "bg-white/10 text-white" : "text-slate-200"
            }`}
          >
            {t("language.english")}
          </button>
          <button
            onClick={() => changeLanguage("ko")}
            className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-white/10 ${
              i18n.language === "ko" ? "bg-white/10 text-white" : "text-slate-200"
            }`}
          >
            {t("language.korean")}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
