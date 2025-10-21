<template>
  <header
    :class="{ 'container': true, 'hidden': isHidden, 'color-flash': flashColor }"
    ref="header"
  >
    <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
      <span :class="['hamburger', { 'active': mobileMenuOpen }]">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <div class="container-blok1">
      <router-link to="/" class="container-logo">
         <p class="container-ltext">MUH</p>
         <p class="container-ltext2">.</p>
         <p class="container-ltext3">dev</p>
      </router-link>
    </div>

    <div :class="['container-blok2', { 'mobile-menu-open': mobileMenuOpen }]">
      <router-link class="container-text text-1" to="/" @click="closeMobileMenu">{{ t('nav.home') }}</router-link>
      <router-link class="container-text text-2" to="/page1" @click="closeMobileMenu">{{ t('nav.portfolio') }}</router-link>
      <router-link class="container-text text-3" to="/page2" @click="closeMobileMenu">{{ t('nav.journey') }}</router-link>
      <router-link class="container-text text-4" to="/page3" @click="closeMobileMenu">{{ t('nav.contact') }}</router-link>
    </div>

    <div class="container-blok3">
      <div class="container-dropdown">
        <div class="dropdown-btn" @click.stop="toggleDropdown">
          <svg class="container-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <p class="container-lang">{{ currentLanguage }}</p>
          <svg class="dropdown-arrow" :class="{ 'open': dropdownOpen }" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
        <ul v-if="dropdownOpen" class="dropdown-list">
          <li @click="selectLang('KG')" :class="{ active: currentLanguage === 'KG' }">KG</li>
          <li @click="selectLang('EN')" :class="{ active: currentLanguage === 'EN' }">EN</li>
          <li @click="selectLang('RU')" :class="{ active: currentLanguage === 'RU' }">RU</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useLanguage } from '../composables/useLanguage';

const { currentLanguage, changeLanguage, t } = useLanguage();

const isHidden = ref(false);
const flashColor = ref(false);
const lastScroll = ref(0);
const dropdownOpen = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  const currentScroll = window.scrollY;
  const delta = currentScroll - lastScroll.value;

  if (delta > 0) {
    isHidden.value = true;
    mobileMenuOpen.value = false;
  } else if (delta < 0) {
    if (isHidden.value) {
      isHidden.value = false;
      flashColor.value = true;
      setTimeout(() => flashColor.value = false, 1000);
    }
  }

  lastScroll.value = currentScroll <= 0 ? 0 : currentScroll;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

const selectLang = (code: string) => {
  changeLanguage(code);
  dropdownOpen.value = false;
};

const closeDropdownOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.container-dropdown');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeDropdownOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeDropdownOutside);
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped src="./Header.scss"></style>
