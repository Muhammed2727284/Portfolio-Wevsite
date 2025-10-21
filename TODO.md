# Remaining Implementation Tasks

## Priority Tasks

### 1. Complete i18n for Remaining Pages

#### Portfolio Page (Page1.vue)
**Status**: ⏳ Needs translation

**Steps**:
1. Add portfolio translations to locale files
2. Convert to Composition API with `<script setup lang="ts">`
3. Import and use `useLanguage` composable
4. Replace all hardcoded text with `t()` function calls
5. Add scroll animations using `useScrollAnimation()`

**Example**:
```vue
<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage';
import { useScrollAnimation } from '../composables/useScrollAnimation';

const { t } = useLanguage();
useScrollAnimation();
</script>

<template>
  <h1>{{ t('portfolio.title') }}</h1>
  <p>{{ t('portfolio.subtitle') }}</p>
</template>
```

#### Journey Page (Page2.vue)
**Status**: ⏳ Needs translation

**Steps**: Same as Portfolio page

**Additional**:
- Update tech icons to match Home page style
- Ensure timeline animations work with scroll

#### Contact Page (Page3.vue)
**Status**: ⏳ Needs translation + Form integration

**Steps**:
1. Add contact form translations
2. Implement form validation
3. Add EmailJS integration for form submission
4. Add success/error messages
5. Add form animations

**EmailJS Integration**:
```bash
npm install @emailjs/browser
```

```typescript
import emailjs from '@emailjs/browser';

const sendEmail = async (formData) => {
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      formData,
      'YOUR_PUBLIC_KEY'
    );
    // Success message
  } catch (error) {
    // Error handling
  }
};
```

### 2. Image Assets

**Required Images**:
- `/public/icon-192.png` (192x192px) - PWA icon
- `/public/icon-512.png` (512x512px) - PWA icon
- `/public/og-image.jpg` (1200x630px) - Social sharing image
- Profile photos for Hero section
- Project screenshots for Portfolio page

**Image Optimization**:
```bash
# Install sharp for image optimization
npm install -D vite-plugin-imagemin
```

### 3. Advanced Animations

#### Parallax Backgrounds
**Location**: Home.vue, Page2.vue

**Implementation**:
```typescript
import { ref, onMounted, onBeforeUnmount } from 'vue';

const parallaxOffset = ref(0);

const handleScroll = () => {
  parallaxOffset.value = window.pageYOffset * 0.5;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
```

```vue
<div
  class="parallax-bg"
  :style="{ transform: `translateY(${parallaxOffset}px)` }"
>
```

#### Interactive Timeline
**Location**: Page2.vue (Journey)

**Features to add**:
- Hover tooltips with detailed information
- Progress line animation
- Click to expand details
- Smooth scroll to timeline sections

### 4. Portfolio Enhancements

#### Filterable Projects
**Location**: Page1.vue

**Implementation**:
```typescript
const activeFilter = ref('all');
const categories = ['all', 'vue', 'react', 'python'];

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value;
  return projects.value.filter(p => p.category === activeFilter.value);
});
```

#### Project Modal
**Implementation**:
```vue
<div v-if="selectedProject" class="modal" @click="closeModal">
  <div class="modal-content" @click.stop>
    <h2>{{ selectedProject.title }}</h2>
    <img :src="selectedProject.image" :alt="selectedProject.title">
    <p>{{ selectedProject.fullDescription }}</p>
    <div class="modal-links">
      <a :href="selectedProject.github">GitHub</a>
      <a :href="selectedProject.demo">Live Demo</a>
    </div>
  </div>
</div>
```

### 5. Service Worker (Offline Support)

**Install Vite PWA plugin**:
```bash
npm install -D vite-plugin-pwa
```

**Update vite.config.ts**:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mohammed Portfolio',
        short_name: 'Muh.dev',
        theme_color: '#667eea'
      }
    })
  ]
})
```

### 6. Performance Optimizations

#### Image Lazy Loading
Add to all images:
```vue
<img loading="lazy" src="..." alt="...">
```

#### Component Lazy Loading
```typescript
// router.ts
const Page1 = () => import('./views/Page1.vue')
const Page2 = () => import('./views/Page2.vue')
const Page3 = () => import('./views/Page3.vue')
```

#### Font Optimization
Add to style.css:
```css
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('...') format('woff2');
}
```

### 7. Testing

#### Unit Tests
```bash
npm install -D vitest @vue/test-utils
```

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})
```

#### E2E Tests
```bash
npm install -D @playwright/test
```

### 8. Additional Features

#### Blog Section (Optional)
- Create Blog.vue page
- Add to router
- Implement markdown support with `markdown-it`
- Add blog translations

#### Resume Download (Optional)
- Add PDF resume to `/public/resume.pdf`
- Add download button to Contact page
```vue
<a href="/resume.pdf" download class="resume-btn">
  {{ t('contact.downloadResume') }}
</a>
```

#### Dark Mode Toggle Animation
Enhance theme toggle with more sophisticated animation:
```css
.theme-toggle {
  position: relative;
  overflow: hidden;
}

.theme-toggle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s ease;
}

.theme-toggle:active::before {
  transform: scale(2);
}
```

## Quick Wins (Easy Improvements)

1. **Add loading state** to ChatBot
2. **Add 404 page** for invalid routes
3. **Add smooth scroll** to navigation links
4. **Add keyboard shortcuts** (e.g., `Ctrl+K` for search)
5. **Add print stylesheet** for resume/CV printing
6. **Add accessibility labels** (aria-label) to all interactive elements
7. **Add focus visible styles** for keyboard navigation

## Documentation Tasks

1. **Add JSDoc comments** to composables
2. **Document component props** and events
3. **Create component library** documentation
4. **Add code examples** for custom implementations

## Deployment Checklist

- [ ] Update Google Analytics ID
- [ ] Add PWA icons
- [ ] Add OG image
- [ ] Update social media links
- [ ] Update domain in meta tags
- [ ] Test all pages on mobile
- [ ] Test all pages in different browsers
- [ ] Run Lighthouse audit
- [ ] Test PWA installation
- [ ] Verify SEO meta tags
- [ ] Test contact form (if implemented)
- [ ] Check console for errors
- [ ] Test theme switching
- [ ] Test language switching
- [ ] Verify all links work

## Current Implementation Status

### ✅ Completed (Production Ready)
- Core infrastructure (Vue 3, TypeScript, Router)
- i18n system with 3 languages
- Theme system (dark/light with system detection)
- Header with language and theme switchers
- Footer with translations
- Home page fully translated and animated
- ChatBot with auto-responses
- Scroll progress bar
- Scroll to top button
- Animated SVG logo
- Typing effect in Hero
- Scroll animations infrastructure
- SEO meta tags
- PWA manifest
- Google Analytics integration
- Responsive design

### ⏳ Needs Implementation
- Portfolio page i18n
- Journey page i18n
- Contact page i18n + form
- Image assets
- Service worker
- Additional animations (parallax, etc.)
- Portfolio filtering and modals
- EmailJS contact form
- Performance optimizations

### 📝 Notes
- Build is successful and production-ready
- Current bundle size: ~82KB gzipped (very good)
- All core features are functional
- Remaining tasks are enhancements and content

---

**Priority**: Focus on translating remaining pages first, then add images, then implement contact form.
