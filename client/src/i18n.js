import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

i18next.use(HttpBackend).use(BrowserLanguageDetector).use(initReactI18next).init({
fallbackLng:'ru',
    debug:true,
    detection:{
    order: ['queryString', 'cookie'],
        cache:['cookie']
    },
    interpolation: {
    escapeValue: false
    }
})