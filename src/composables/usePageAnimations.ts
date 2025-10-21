import { onMounted } from 'vue';

export function usePageAnimations() {
  onMounted(() => {
    const animatedElements = document.querySelectorAll('.animate-on-load');

    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated');
      }, index * 100);
    });
  });
}
