import { ref, computed } from 'vue';
import enTranslations from '../i18n/locales/en.json';
import ruTranslations from '../i18n/locales/ru.json';
import kgTranslations from '../i18n/locales/kg.json';

type Translations = typeof enTranslations;

const translations: Record<string, Translations> = {
  en: enTranslations,
  ru: ruTranslations,
  kg: kgTranslations
};

const getSavedLocale = (): string => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('locale') || 'en';
  }
  return 'en';
};

const currentLocale = ref<string>(getSavedLocale());

export function useTranslation() {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLocale.value];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const currentLanguage = computed(() => {
    switch (currentLocale.value) {
      case 'kg':
        return 'KG';
      case 'ru':
        return 'RU';
      case 'en':
      default:
        return 'EN';
    }
  });

  const changeLanguage = (lang: string) => {
    const newLocale = lang.toLowerCase();
    currentLocale.value = newLocale;
    localStorage.setItem('locale', newLocale);
    document.documentElement.setAttribute('lang', newLocale);
  };

  return {
    t,
    currentLanguage,
    changeLanguage,
    locale: currentLocale
  };
}
