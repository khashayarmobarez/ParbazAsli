import React, { createContext, useContext, useState } from "react";
import en from "../../locales/en.json";
import fa from "../../locales/fa.json";

const translations = { en, fa };

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {

  const [language, setLanguage] = useState("en");

  // Utility function to get translations
  const t = (key, params = {}) => {
    const keys = key.split(".");
    let value = keys.reduce((acc, cur) => acc?.[cur], translations[language]);

    // Replace placeholders with dynamic values
    if (typeof value === "string") {
      Object.keys(params).forEach((paramKey) => {
        value = value.replace(`{{${paramKey}}}`, params[paramKey]);
      });
    }

    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );

};

export const useTranslation = () => useContext(TranslationContext);


// example usage of the translation


// import React from "react";
// import { useTranslation } from "./context/TranslationContext";

// const MyComponent = () => {
//   const { t, setLanguage, language } = useTranslation();

//   return (
//     <div>
//       <h1>{t("welcome")}</h1>
//       <h2>{t("user.profile.title")}</h2>
//       <p>{t("user.profile.greeting", { name: "Khashayar" })}</p>
//     </div>
//   );
// };

// export default MyComponent;
