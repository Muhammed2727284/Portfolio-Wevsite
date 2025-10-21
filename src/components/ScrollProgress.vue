<template>
  <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollProgress.value = (scrollTop / documentHeight) * 100;
};

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<style lang="scss" scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  z-index: 9999;
  transition: width 0.2s ease;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}
</style>
