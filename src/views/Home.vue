<template>
  <main class="home">
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__greeting fade-in">
              {{ t('home.greeting') }} <span class="highlight">{{ t('home.name') }}</span>
            </h1>
            <h2 class="hero__profession fade-in-delay-1">
              <span class="typing-text">{{ displayText }}</span><span class="cursor">|</span>
            </h2>
            <p class="hero__description fade-in-delay-2">
              {{ t('home.description') }}
            </p>
          </div>
          <div class="hero__photos fade-in-delay-2">
            <div class="photo-slider">
              <div class="photo-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div class="photo-slide" v-for="(photo, index) in photos" :key="index">
                  <div class="photo-frame">
                    <img :src="photo.url" :alt="photo.alt" loading="lazy" />
                  </div>
                </div>
              </div>
              <div class="slider-dots">
                <button
                  v-for="(_, index) in photos"
                  :key="index"
                  @click="goToSlide(index)"
                  :class="['dot', { active: currentSlide === index }]"
                  :aria-label="`Go to photo ${index + 1}`"
                ></button>
              </div>
              <button @click="prevSlide" class="slider-arrow prev" aria-label="Previous photo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button @click="nextSlide" class="slider-arrow next" aria-label="Next photo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="technologies">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('home.technologies') }}</h2>
        <div class="tech-grid">
          <div class="tech-card" v-for="(tech, index) in technologies" :key="tech.name" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="tech-card__icon" v-html="tech.icon"></div>
            <h3 class="tech-card__name">{{ tech.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="education">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('home.education') }}</h2>

        <div class="education-grid">
          <div class="education-card fade-in-up">
            <div class="education-card__header">
              <div class="education-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div class="education-card__type">{{ t('home.university') }}</div>
            </div>
            <h3 class="education-card__institution">{{ t('home.universityName') }}</h3>
            <p class="education-card__specialty">{{ t('home.degree') }}</p>
            <div class="education-card__details">
              <span class="education-card__period">2023 - 2027</span>
            </div>
          </div>

          <div class="education-card fade-in-up" style="animation-delay: 0.1s">
            <div class="education-card__header">
              <div class="education-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8"/>
                  <path d="M12 17v4"/>
                </svg>
              </div>
              <div class="education-card__type">{{ t('home.geeks') }}</div>
            </div>
            <h3 class="education-card__institution">{{ t('home.geeks') }}</h3>
            <p class="education-card__specialty">{{ t('home.geeksDesc') }}</p>
            <div class="education-card__details">
              <span class="education-card__period">2024 - 2025</span>
            </div>
            <!-- <div class="certificates">
              <div class="certificate-placeholder" v-for="lang in ['RU', 'EN', 'KG']" :key="lang">
                <span>{{ t('home.certificate') }} {{ lang }}</span>
              </div>
            </div> -->
          </div>

          <div class="education-card fade-in-up" style="animation-delay: 0.2s">
            <div class="education-card__header">
              <div class="education-card__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"/>
                  <polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <div class="education-card__type">{{ t('home.skillfactory') }}</div>
            </div>
            <h3 class="education-card__institution">{{ t('home.skillfactory') }}</h3>
            <p class="education-card__specialty">{{ t('home.skillDesc') }}</p>
            
            <div class="education-card__details">
              <span class="education-card__period">2025 - 2026</span>
            </div>
            <!-- <div class="certificate-single">
              <div class="certificate-placeholder">
                <span>{{ t('home.certificate') }}</span>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>

    <section class="languages">
      <div class="container">
        <h2 class="section-title fade-in-up">{{ t('home.languages') }}</h2>
        <div class="languages-grid">
          <div class="language-card fade-in-up" v-for="(lang, index) in languages" :key="lang.nameKey" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="language-card__header">
              <h3 class="language-card__name">{{ t(lang.nameKey) }}</h3>
              <span class="language-card__level">{{ lang.level }}</span>
            </div>
            <div class="language-card__progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: lang.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTranslation } from '../composables/useTranslation';
import { useTypingEffect } from '../composables/useTypingEffect';
import { useScrollAnimation } from '../composables/useScrollAnimation';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'


const { t } = useTranslation();
useScrollAnimation();

const typingTexts = computed(() => [
  t('home.profession'),
  'Vue.js Developer',
  'React Developer',
  'Python Developer'
]);

const { displayText } = useTypingEffect(typingTexts.value);

const currentSlide = ref(0);
const photos = ref([
  {
    url: img1,
    alt: 'Professional photo 1'
  },
  {
    url: img2,
    alt: 'Professional photo 2'
  },
  {
    url: img3,
    alt: 'Professional photo 3'
  }
]);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % photos.value.length;
};

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? photos.value.length - 1 : currentSlide.value - 1;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

const technologies = ref([
        {
          name: "HTML",
          icon: `<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>`
        },
        {
          name: "CSS",
          icon: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"/></svg>`
        },
        {
          name: "SCSS",
          icon: `<svg viewBox="0 0 128 128"><path fill="#CD6799" d="M107.677 21.542c-7.469-.658-13.972.946-19.354 4.495-4.01 2.635-8.34 6.058-9.768 10.823-.814 2.718-.684 4.823.457 7.146 1.141 2.324 3.179 4.236 5.548 5.593 5.169 2.963 11.575 4.063 17.549 5.264 8.891 1.786 18.145 3.881 24.769 10.185 3.641 3.465 6.052 8.012 6.724 12.993.672 4.98-.056 10.402-2.634 14.825-5.167 8.87-15.258 14.105-25.423 15.602-11.938 1.757-24.64-.576-35.104-7.012-7.797-4.796-14.277-11.759-17.895-20.041l15.177-9.012c2.282 5.564 6.321 10.315 11.399 13.385 5.078 3.07 11.196 4.467 17.125 3.725 4.397-.55 8.794-2.427 11.762-5.793 1.484-1.683 2.567-3.697 3.066-5.877.499-2.18.413-4.527-.357-6.644-.77-2.117-2.249-3.903-4.042-5.264-1.793-1.361-3.901-2.298-6.116-2.99-6.674-2.084-13.851-2.804-20.616-5.237-6.765-2.433-13.333-6.564-16.844-12.847-3.511-6.283-3.513-14.643-.726-21.307 2.787-6.664 8.486-11.976 15.122-14.818 9.954-4.264 21.349-4.652 31.851-2.054 7.837 1.938 15.27 5.829 21.154 11.332l-11.016 11.016c-3.91-3.651-8.732-6.332-13.94-7.789-5.208-1.457-10.799-1.69-16.077-.539-3.924.855-7.846 2.717-10.514 5.793-1.334 1.538-2.267 3.414-2.634 5.422-.367 2.008-.058 4.148.943 5.974 1.001 1.826 2.64 3.242 4.495 4.127 1.855.885 3.926 1.238 5.957 1.483 6.116.738 12.382 1.014 18.26 2.811 5.878 1.797 11.583 5.322 15.095 10.585 3.512 5.263 4.495 12.337 3.179 18.548-1.316 6.211-5.169 11.762-10.261 15.549"/></svg>`
        },
        {
          name: "JavaScript",
          icon: `<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.184H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>`
        },
        {
          name: "React",
          icon: `<svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21.1c-1.2-2-2.2-4.1-3.4-6.2-1.2-2.1-2.4-4.1-3.6-6-3.8.5-7.4 1.1-10.8 1.9 1.1 3.3 2.3 6.8 3.8 10.3zm-6.5-17.9c5.8.5 11.3 1.4 16.5 2.5-.6 2.3-1.1 4.6-1.7 6.9-1.5 5.9-3.5 11.8-6 17.6-1.9-3.3-3.9-6.7-6-10-2.1-3.3-4.3-6.5-6.6-9.6 1.9 0 3.8 0 5.8-.4z"/></g></svg>`
        },
        {
          name: "Vue.js",
          icon: `<svg viewBox="0 0 128 128"><path d="M0 8.934l49.854.158 14.167 24.47 14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02-38.476 66.053L25.691 9.592.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168-15.053 24.647L49.216 9.73l-22.794-.168 37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01" fill="none"/><path d="M25.997 9.393l23.002.009L64.035 34.36 79.018 9.404 102 9.398 64.15 75.053z" fill="#35495e"/><path d="M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z" fill="#41b883"/></svg>`
        },
        {
          name: "Python",
          icon: `<svg viewBox="0 0 128 128"><linearGradient id="python-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><linearGradient id="python-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#python-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/><path fill="url(#python-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/><radialGradient id="python-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8B8B8" stop-opacity=".498"/><stop offset="1" stop-color="#7F7F7F" stop-opacity="0"/></radialGradient><path opacity=".444" fill="url(#python-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"/></svg>`
        },
        {
          name: "Django",
          icon: `<svg viewBox="0 0 128 128"><path fill="#092E20" d="M59.448 0h20.93v96.88c-10.737 2.04-18.62 2.855-27.181 2.855-25.551 0-38.87-11.551-38.87-33.705 0-21.338 14.135-35.2 36.015-35.2 3.398 0 5.98.272 9.106 1.087zm0 48.765c-2.446-.815-4.485-1.086-7.067-1.086-10.6 0-16.717 6.523-16.717 17.939 0 11.145 5.845 17.26 16.582 17.26 2.309 0 4.212-.136 7.202-.542z"/><path fill="#092E20" d="M113.672 32.321V80.84c0 16.717-1.224 24.735-4.893 31.666-3.398 6.661-7.883 10.873-17.124 15.494l-19.435-9.241c9.242-4.35 13.726-8.153 16.58-14 2.99-5.979 3.943-12.91 3.943-31.122V32.321zM92.742.111h20.93v21.474h-20.93z"/></svg>`
        },
        {
          name: "MySQL",
          icon: `<svg viewBox="0 0 128 128"><path fill="#00758F" d="M2.001 90.458h4.108v-16.223l6.36 14.143c.75 1.712 1.777 2.317 3.792 2.317s3.003-.605 3.753-2.317l6.36-14.143v16.223h4.108v-16.196c0-1.58-.632-2.345-1.936-2.739-3.121-.974-5.215-.131-6.163 1.976l-6.241 13.958-6.043-13.959c-.909-2.106-3.042-2.949-6.163-1.976C2.632 71.917 2 72.682 2 74.263v16.196l.001-.001zM33.899 77.252h4.107v8.938c-.038.485.156 1.625 2.406 1.661 1.148.018 8.862 0 8.934 0v-10.643h4.117c.019 0-.004 14.514-.004 14.574.022 3.58-4.441 4.357-6.499 4.417H33.864v-2.764h.02c.295 0 12.278.133 12.278.133 2.481-.479 2.758-1.962 2.661-3.141-.01-.119.075-1.182-.057-1.196h-14.88V77.252h.013zM61.941 82.265c-1.455-.876-2.339-1.84-2.339-3.42 0-2.566 2.08-3.849 4.546-3.849 3.245 0 4.527 1.602 4.527 2.889 0 .597-.22 1.025-.752 1.025-.61 0-.563-.876-.759-1.228-.663-1.217-1.593-1.477-2.768-1.477-1.493 0-2.614.8-2.614 2.485 0 4.116 7.715 3.527 7.715 8.988 0 3.156-2.673 3.944-5.243 3.944-1.753 0-4.487-.726-4.487-2.687 0-.727.39-1.029 1.015-1.029.7 0 .644.927.93 1.43.632 1.077 1.639 1.383 2.854 1.383 1.91 0 2.912-1.383 2.912-2.587 0-5.019-7.537-3.997-7.537-8.867z"/><path fill="#00758F" d="M74.601 70.494c-2.925 0-4.691 1.338-4.691 4.691v11.872c0 3.352 1.766 4.69 4.691 4.69 2.925 0 4.689-1.338 4.689-4.69V75.185c.001-3.353-1.764-4.691-4.689-4.691zm2.545 17.279c0 1.217-.818 1.705-2.545 1.705-1.729 0-2.543-.488-2.543-1.705V74.468c0-1.217.814-1.705 2.543-1.705 1.727 0 2.545.488 2.545 1.705v13.305zM82.26 90.458h4.108V71.056h-4.108v19.402zM97.278 70.494c-2.925 0-4.691 1.338-4.691 4.691v11.872c0 3.352 1.766 4.69 4.691 4.69 2.925 0 4.689-1.338 4.689-4.69V75.185c0-3.353-1.764-4.691-4.689-4.691zm2.544 17.279c0 1.217-.818 1.705-2.544 1.705-1.729 0-2.543-.488-2.543-1.705V74.468c0-1.217.814-1.705 2.543-1.705 1.726 0 2.544.488 2.544 1.705v13.305z"/><path fill="#F29111" d="M125.681 88.302c-.133-.291-.281-.443-.304-.605l.026.002c0-.485-.396-.605-.771-.605h-3.044l-.058-.132c-.073.043-.138.104-.146.19-.362.057-.767.104-1.006.303-2.424 1.315-5.139 1.315-7.91 1.315-3.241 0-5.742-.702-8.028-2.563-1.642-1.336-2.701-3.192-2.892-5.537-.232-2.883.607-5.306 2.892-7.21 2.058-1.714 4.677-2.565 7.608-2.565 3.778 0 6.888 1.21 8.539 3.834 1.562 2.485 1.844 5.381 1.844 8.15v.002c0 .294.396.737.72.737h3.934c.323 0 .59-.443.59-.737v-.669c0-1.897-.294-4.214-.976-6.56C124.695 68.965 118.063 64 108.693 64c-6.222 0-11.452 1.949-14.546 6.116-2.605 3.51-3.407 7.65-3.438 12.294-.013 2.335.214 4.672.96 6.871 1.713 5.04 5.05 8.635 9.855 10.646 2.477 1.038 5.203 1.509 7.97 1.509 2.025 0 4.152-.225 6.168-.608 1.992-.38 3.98-.93 5.698-2.004 2.461-1.539 3.866-3.531 4.321-6.522z"/></svg>`
        }
]);

const languages = ref([
        {
          nameKey: "home.russian",
          level: "Native",
          percentage: 100
        },
        {
          nameKey: "home.english",
          level: "B1",
          percentage: 60
        },
        {
          nameKey: "home.kyrgyz",
          level: "Intermediate",
          percentage: 60
        }
]);
</script>

<style lang="scss" scoped src="./Home.scss"></style>
