import { ref, onMounted } from 'vue';

export function useTypingEffect(texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const displayText = ref('');
  const currentIndex = ref(0);
  const isDeleting = ref(false);

  const type = () => {
    const currentText = texts[currentIndex.value];

    if (!isDeleting.value) {
      if (displayText.value.length < currentText.length) {
        displayText.value = currentText.slice(0, displayText.value.length + 1);
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => {
          isDeleting.value = true;
          type();
        }, pauseTime);
      }
    } else {
      if (displayText.value.length > 0) {
        displayText.value = displayText.value.slice(0, -1);
        setTimeout(type, deletingSpeed);
      } else {
        isDeleting.value = false;
        currentIndex.value = (currentIndex.value + 1) % texts.length;
        setTimeout(type, 500);
      }
    }
  };

  onMounted(() => {
    if (texts.length > 0) {
      setTimeout(type, 1000);
    }
  });

  return {
    displayText
  };
}
