import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';

import { defaultNS, resources } from '../../assets/i18n';

// initialize i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common'],
    defaultNS,
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });
