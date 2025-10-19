"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/index";
import { ReactNode, useEffect } from "react";

export const LANGUAGE_STORAGE_KEY = "learning-certificate-language";

export function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedLanguage =
      typeof window !== "undefined"
        ? localStorage.getItem(LANGUAGE_STORAGE_KEY) ??
          localStorage.getItem("i18nextLng") ??
          (navigator.language ? navigator.language.split("-")[0] : null)
        : null;

    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
