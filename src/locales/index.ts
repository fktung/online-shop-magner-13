import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// import en from "./en";
import id from "./id";

const resources = {
  id: {
    translation: id,
  },
};

i18n
  // pass the i18n instance to react-i18next.
  // .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: process.env.NODE_ENV !== "production",
    fallbackLng: "id",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18n;
