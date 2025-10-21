import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ru from './locales/ru.json';
import kg from './locales/kg.json';

const getSavedLocale = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('locale') || 'en';
  }
  return 'en';
};

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    ru,
    kg
  }
});

export default i18n;
