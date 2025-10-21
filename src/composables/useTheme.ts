import { ref, watch, onMounted } from 'vue';

const isDark = ref(true);

function getSystemTheme(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function initTheme() {
  if (typeof window === 'undefined') return;

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    isDark.value = getSystemTheme();
  }

  applyTheme(isDark.value);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches;
        applyTheme(isDark.value);
      }
    });
  }
}

function applyTheme(dark: boolean) {
  if (typeof window === 'undefined') return;

  const theme = dark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  document.body.className = theme;
}

export function useTheme() {
  onMounted(() => {
    initTheme();
  });

  watch(isDark, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      applyTheme(newValue);
    }
  });

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  return {
    isDark,
    toggleTheme
  };
}

if (typeof window !== 'undefined') {
  initTheme();
}
