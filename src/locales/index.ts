import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

// import en from "./en";
import id from "./id";
import { useParams } from "next/navigation";

const resources = {
  id: {
    translation: id,
  },
};

const initI18next = () => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  i18nInstance.use(initReactI18next).init({
    // debug: process.env.NODE_ENV !== "production",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });
  return i18nInstance;
};

export function useTranslationLocales() {
  const { lang } = useParams();
  const i18nextInstance = initI18next();
  return {
    t: i18nextInstance.getFixedT(lang),
    i18n: i18nextInstance,
  };
}
