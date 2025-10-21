import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useLanguage() {
  const { locale, t } = useI18n({ useScope: 'global' });

  const currentLanguage = computed(() => {
    switch (locale.value) {
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
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
    document.documentElement.setAttribute('lang', newLocale);
  };

  return {
    locale,
    currentLanguage,
    changeLanguage,
    t
  };
}
