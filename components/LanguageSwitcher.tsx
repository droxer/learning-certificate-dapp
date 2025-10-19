"use client";

import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeLanguage("zh")} className="px-2 py-1 border rounded">中文</button>
      <button onClick={() => changeLanguage("en")} className="px-2 py-1 border rounded">EN</button>
      <button onClick={() => changeLanguage("ko")} className="px-2 py-1 border rounded">한국어</button>
    </div>
  );
};

export default LanguageSwitcher;