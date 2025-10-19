import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 引入语言包
import zh from "./locales/zh.json";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

i18n
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      zh: { translation: zh },
      en: { translation: en },
      ko: { translation: ko },
    },
    interpolation: {
      escapeValue: false, // React 已自动转义
    },
  });

export default i18n;