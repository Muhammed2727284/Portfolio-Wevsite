import { onMounted, onBeforeUnmount } from 'vue';

export function useScrollAnimation() {
  let observer: IntersectionObserver | null = null;

  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in, .fade-in-delay-1, .fade-in-delay-2, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer?.observe(el));
  };

  onMounted(() => {
    setTimeout(initScrollAnimations, 100);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return {
    initScrollAnimations
  };
}
