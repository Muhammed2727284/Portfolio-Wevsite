<template>
  <main class="portfolio">
    <div class="portfolio-header">
      <div class="container">
        <h1 class="portfolio-title fade-in">{{ t('portfolio.title') }}</h1>
        <p class="portfolio-subtitle fade-in-delay-1">
          {{ t('portfolio.subtitle') }}
        </p>
      </div>
    </div>

    <section class="projects">
      <div class="container">
        <div class="filter-buttons">
          <button
            v-for="filter in filters"
            :key="filter.key"
            :class="['filter-btn', { active: activeFilter === filter.key }]"
            @click="activeFilter = filter.key"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="projects-grid">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="project-card fade-in-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="openModal(project)"
          >
            <div class="project-image">
              <img :src="project.image" :alt="t(project.titleKey)" loading="lazy" />
              <div class="project-overlay">
                <span class="view-details">{{ t('portfolio.viewDetails') }}</span>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{ t(project.titleKey) }}</h3>
              <p class="project-description">{{ t(project.shortKey) }}</p>
              <div class="project-tags">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <transition name="modal">
      <div v-if="selectedProject" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="modal-image">
            <img :src="selectedProject.image" :alt="t(selectedProject.titleKey)" />
          </div>

          <div class="modal-body">
            <h2 class="modal-title">{{ t(selectedProject.titleKey) }}</h2>
            <p class="modal-description">{{ t(selectedProject.fullKey) }}</p>

            <div class="modal-tags">
              <h4>{{ t('portfolio.technologies') }}</h4>
              <div class="tags-list">
                <span
                  v-for="tag in selectedProject.tags"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="modal-links">
              <a
                v-if="selectedProject.github"
                :href="selectedProject.github"
                target="_blank"
                class="btn-link github"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {{ t('portfolio.github') }}
              </a>
              <a
                v-if="selectedProject.demo"
                :href="selectedProject.demo"
                target="_blank"
                class="btn-link demo"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                {{ t('portfolio.liveDemo') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTranslation } from '../composables/useTranslation';
import { useScrollAnimation } from '../composables/useScrollAnimation';

const { t } = useTranslation();
useScrollAnimation();

interface Project {
  id: number;
  titleKey: string;
  shortKey: string;
  fullKey: string;
  image: string;
  tags: string[];
  category: string;
  github?: string;
  demo?: string;
}

const activeFilter = ref('all');
const selectedProject = ref<Project | null>(null);

const filters = computed(() => [
  { key: 'all', label: t('portfolio.all') },
  { key: 'webApps', label: t('portfolio.webApps') },
  { key: 'react', label: t('portfolio.react') },
  { key: 'vue', label: t('portfolio.vue') },
  { key: 'python', label: t('portfolio.python') }
]);

const projects = ref<Project[]>([
  {
    id: 1,
    titleKey: 'portfolio.projects.ecommerce.title',
    shortKey: 'portfolio.projects.ecommerce.short',
    fullKey: 'portfolio.projects.ecommerce.full',
    image: "https://images.pexels.com/photos/1369476/pexels-photo-1369476.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ['Vue.js', 'Django', 'MySQL', 'REST API'],
    category: 'webApps',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    id: 2,
    titleKey: 'portfolio.projects.task.title',
    shortKey: 'portfolio.projects.task.short',
    fullKey: 'portfolio.projects.task.full',
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ['React', 'JavaScript', 'CSS'],
    category: 'react',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    id: 3,
    titleKey: 'portfolio.projects.weather.title',
    shortKey: 'portfolio.projects.weather.short',
    fullKey: 'portfolio.projects.weather.full',
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ['Vue.js', 'API', 'SCSS'],
    category: 'vue',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    id: 4,
    titleKey: 'portfolio.projects.analytics.title',
    shortKey: 'portfolio.projects.analytics.short',
    fullKey: 'portfolio.projects.analytics.full',
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ['Python', 'Django', 'MySQL'],
    category: 'python',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    id: 5,
    titleKey: 'portfolio.projects.portfolioSite.title',
    shortKey: 'portfolio.projects.portfolioSite.short',
    fullKey: 'portfolio.projects.portfolioSite.full',
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ['Vue.js', 'SCSS', 'HTML'],
    category: 'vue',
    github: 'https://github.com',
    demo: 'https://example.com'
  },
  {
    id: 6,
    titleKey: 'portfolio.projects.social.title',
    shortKey: 'portfolio.projects.social.short',
    fullKey: 'portfolio.projects.social.full',
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ['React', 'JavaScript', 'API'],
    category: 'react',
    github: 'https://github.com',
    demo: 'https://example.com'
  }
]);

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value;
  }
  return projects.value.filter(project =>
    project.category === activeFilter.value ||
    project.tags.some(tag => tag.toLowerCase().includes(activeFilter.value.toLowerCase()))
  );
});

const openModal = (project: Project) => {
  selectedProject.value = project;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedProject.value = null;
  document.body.style.overflow = '';
};
</script>

<style lang="scss" scoped src="./Page1.scss"></style>
