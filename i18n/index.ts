import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 引入语言包
import zh from "./locales/zh.json";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

const resources = {
  zh: { translation: zh },
  en: { translation: en },
  ko: { translation: ko },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false, // React 已自动转义
  },
});

export default i18n;
export { resources };
