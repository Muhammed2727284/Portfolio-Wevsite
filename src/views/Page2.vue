<template>
  <main class="journey">
    <div class="journey-header">
      <div class="container">
        <div class="header-content">
          <div class="header-photos fade-in">
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
                  :class="['dot', { active: currentSlide === index }]"
                  aria-label="Slide indicator"
                ></button>
              </div>
            </div>
          </div>
          <div class="header-text">
            <h1 class="journey-title fade-in-delay-1">{{ t('journey.title') }}</h1>
            <p class="journey-subtitle fade-in-delay-2">
              {{ t('journey.subtitle') }}
            </p>
            <p class="intro-paragraph fade-in-delay-3" v-html="t('journey.intro')"></p>
          </div>
        </div>
      </div>
    </div>

    <section class="timeline">
      <div class="container">
        <h2 class="section-title">{{ t('journey.growthStages') }}</h2>

        <div class="timeline-container">
          <div class="timeline-line"></div>

          <div
            v-for="(milestone, index) in milestones"
            :key="milestone.year"
            class="timeline-item fade-in-up"
            :class="{ 'timeline-item-left': index % 2 === 0, 'timeline-item-right': index % 2 !== 0 }"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="timeline-content">
              <div class="timeline-year">{{ milestone.year }}</div>
              <h3 class="timeline-title">{{ t(milestone.titleKey) }}</h3>
              <p class="timeline-description">{{ t(milestone.descKey) }}</p>
              <div class="timeline-image">
                <!-- <div class="image-placeholder">
                  <span>{{ t(milestone.labelKey) }}</span>
                </div> -->
              </div>
              <div class="timeline-tags" v-if="milestone.tags">
                <span
                  v-for="tag in milestone.tags"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="timeline-dot">
              <div class="dot-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="challenges">
      <div class="container">
        <h2 class="section-title">{{ t('journey.challenges') }}</h2>
        <div class="challenges-grid">
          <div class="challenge-card fade-in-up">
            <div class="challenge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2v4"/>
                <path d="M10 2v4"/>
                <path d="M14 2v4"/>
                <path d="M18 2v4"/>
                <rect x="2" y="6" width="20" height="14" rx="2"/>
                <path d="M7 11h10"/>
                <path d="M7 15h6"/>
              </svg>
            </div>
            <h3>{{ t('journey.challengesTitle') }}</h3>
            <p>{{ t('journey.challengesDesc') }}</p>
          </div>
          <div class="challenge-card fade-in-up" style="animation-delay: 0.2s">
            <div class="challenge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <h3>{{ t('journey.achievementsTitle') }}</h3>
            <p>{{ t('journey.achievementsDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <h2 class="section-title">{{ t('journey.skillsTitle') }}</h2>
        <div class="skills-grid">
          <div
            v-for="(skill, index) in skills"
            :key="skill.name"
            class="skill-card fade-in-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="skill-icon" v-html="skill.icon"></div>
            <h4>{{ skill.name }}</h4>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTranslation } from '../composables/useTranslation';
import { useScrollAnimation } from '../composables/useScrollAnimation';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

const { t } = useTranslation();
useScrollAnimation();

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

let autoSlideInterval: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % photos.value.length;
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 3000);
};

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

const milestones = ref([
  {
    year: "2024",
    titleKey: "journey.milestones.2022.title",
    descKey: "journey.milestones.2022.desc",
    labelKey: "journey.milestones.2022.label",
    tags: ["HTML", "CSS"]
  },
  {
    year: "2025",
    titleKey: "journey.milestones.2023.title",
    descKey: "journey.milestones.2023.desc",
    labelKey: "journey.milestones.2023.label",
    tags: ["JavaScript","React", "Vue.js"]
  },
  {
    year: "2025",
    titleKey: "journey.milestones.2024.title",
    descKey: "journey.milestones.2024.desc",
    labelKey: "journey.milestones.2024.label",
    tags: ["Responsive", "Animations", "SCSS"]
  },
  {
    year: "2025",
    titleKey: "journey.milestones.2025.title",
    descKey: "journey.milestones.2025.desc",
    labelKey: "journey.milestones.2025.label",
    tags: ["Full-Stack", "ChatBot", "API"]
  }
]);

const skills = ref([
  {
    name: "HTML5",
    icon: `<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>`
  },
  {
    name: "CSS3",
    icon: `<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z"/><path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z"/><path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z"/><path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z"/><path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z"/><path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z"/></svg>`
  },
  {
    name: "JavaScript",
    icon: `<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.184H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>`
  },
  {
    name: "Vue.js",
    icon: `<svg viewBox="0 0 128 128"><path d="M0 8.934l49.854.158 14.167 24.47 14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02-38.476 66.053L25.691 9.592.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168-15.053 24.647L49.216 9.73l-22.794-.168 37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01" fill="none"/><path d="M25.997 9.393l23.002.009L64.035 34.36 79.018 9.404 102 9.398 64.15 75.053z" fill="#35495e"/><path d="M.91 9.569l25.067-.172 38.15 65.659L101.98 9.401l25.11.026-62.966 108.06z" fill="#41b883"/></svg>`
  },
  {
    name: "React",
    icon: `<svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21.1c-1.2-2-2.2-4.1-3.4-6.2-1.2-2.1-2.4-4.1-3.6-6-3.8.5-7.4 1.1-10.8 1.9 1.1 3.3 2.3 6.8 3.8 10.3zm-6.5-17.9c5.8.5 11.3 1.4 16.5 2.5-.6 2.3-1.1 4.6-1.7 6.9-1.5 5.9-3.5 11.8-6 17.6-1.9-3.3-3.9-6.7-6-10-2.1-3.3-4.3-6.5-6.6-9.6 1.9 0 3.8 0 5.8-.4z"/></g></svg>`
  },
  {
    name: "SCSS",
    icon: `<svg viewBox="0 0 128 128"><path fill="#CD6799" d="M107.677 21.542c-7.469-.658-13.972.946-19.354 4.495-4.01 2.635-8.34 6.058-9.768 10.823-.814 2.718-.684 4.823.457 7.146 1.141 2.324 3.179 4.236 5.548 5.593 5.169 2.963 11.575 4.063 17.549 5.264 8.891 1.786 18.145 3.881 24.769 10.185 3.641 3.465 6.052 8.012 6.724 12.993.672 4.98-.056 10.402-2.634 14.825-5.167 8.87-15.258 14.105-25.423 15.602-11.938 1.757-24.64-.576-35.104-7.012-7.797-4.796-14.277-11.759-17.895-20.041l15.177-9.012c2.282 5.564 6.321 10.315 11.399 13.385 5.078 3.07 11.196 4.467 17.125 3.725 4.397-.55 8.794-2.427 11.762-5.793 1.484-1.683 2.567-3.697 3.066-5.877.499-2.18.413-4.527-.357-6.644-.77-2.117-2.249-3.903-4.042-5.264-1.793-1.361-3.901-2.298-6.116-2.99-6.674-2.084-13.851-2.804-20.616-5.237-6.765-2.433-13.333-6.564-16.844-12.847-3.511-6.283-3.513-14.643-.726-21.307 2.787-6.664 8.486-11.976 15.122-14.818 9.954-4.264 21.349-4.652 31.851-2.054 7.837 1.938 15.27 5.829 21.154 11.332l-11.016 11.016c-3.91-3.651-8.732-6.332-13.94-7.789-5.208-1.457-10.799-1.69-16.077-.539-3.924.855-7.846 2.717-10.514 5.793-1.334 1.538-2.267 3.414-2.634 5.422-.367 2.008-.058 4.148.943 5.974 1.001 1.826 2.64 3.242 4.495 4.127 1.855.885 3.926 1.238 5.957 1.483 6.116.738 12.382 1.014 18.26 2.811 5.878 1.797 11.583 5.322 15.095 10.585 3.512 5.263 4.495 12.337 3.179 18.548-1.316 6.211-5.169 11.762-10.261 15.549"/></svg>`
  },
  {
    name: "Grid & Flexbox",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`
  },
  {
    name: "Animations",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
  },
  {
    name: "API Integration",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
  }
]);
</script>

<style lang="scss" scoped src="./Page2.scss"></style>
