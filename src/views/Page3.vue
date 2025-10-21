<template>
  <main class="contact-page">
    <div class="contact-header">
      <div class="container">
        <h1 class="contact-title fade-in">{{ t('contact.title') }}</h1>
        <p class="contact-subtitle fade-in-delay-1">
          {{ t('contact.subtitle') }}
        </p>
      </div>
    </div>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrapper animate-on-load">
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name">{{ t('contact.name') }}</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  :placeholder="t('contact.namePlaceholder')"
                  :class="{ 'error': errors.name }"
                  @input="clearError('name')"
                />
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="email">{{ t('contact.emailLabel') }}</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  :placeholder="t('contact.emailPlaceholder')"
                  :class="{ 'error': errors.email }"
                  @input="clearError('email')"
                />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label for="subject">{{ t('contact.subject') }}</label>
                <input
                  id="subject"
                  v-model="formData.subject"
                  type="text"
                  :placeholder="t('contact.subjectPlaceholder')"
                  :class="{ 'error': errors.subject }"
                  @input="clearError('subject')"
                />
                <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
              </div>

              <div class="form-group">
                <label for="message">{{ t('contact.message') }}</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  :placeholder="t('contact.messagePlaceholder')"
                  rows="6"
                  :class="{ 'error': errors.message }"
                  @input="clearError('message')"
                ></textarea>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>

              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="!isSubmitting">{{ t('contact.send') }}</span>
                <span v-else class="loading">
                  <span class="dot"></span>
                  <span class="dot"></span>
                  <span class="dot"></span>
                </span>
              </button>

              <transition name="fade">
                <div v-if="successMessage" class="success-message">
                  {{ successMessage }}
                </div>
              </transition>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import { usePageAnimations } from '../composables/usePageAnimations';

const { t } = useLanguage();
usePageAnimations();

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');

const validateForm = () => {
  errors.value = {};

  if (!formData.value.name.trim()) {
    errors.value.name = t('contact.nameRequired');
  }

  if (!formData.value.email.trim()) {
    errors.value.email = t('contact.emailRequired');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = t('contact.emailInvalid');
  }

  if (!formData.value.subject.trim()) {
    errors.value.subject = t('contact.subjectRequired');
  }

  if (!formData.value.message.trim()) {
    errors.value.message = t('contact.messageRequired');
  } else if (formData.value.message.trim().length < 10) {
    errors.value.message = t('contact.messageMin');
  }

  return Object.keys(errors.value).length === 0;
};

const clearError = (field: string) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  setTimeout(() => {
    isSubmitting.value = false;
    successMessage.value = t('contact.success');
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    setTimeout(() => {
      successMessage.value = '';
    }, 5000);
  }, 2000);
};
</script>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
  padding-top: 120px;
  font-family: "Inter", sans-serif;
  color: #fff;
  background-color: #0a060d;

  @media (max-width: 968px) {
    padding-top: 100px;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 481px) {
    padding: 0 24px;
  }

  @media (min-width: 769px) {
    padding: 0 32px;
  }

  @media (min-width: 1025px) {
    padding: 0 48px;
  }

  @media (min-width: 1441px) {
    padding: 0 64px;
  }
}

.contact-header {
  padding: 60px 0 40px;
  text-align: center;
  position: relative;
  z-index: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 0 30px;
    min-height: 180px;
  }

  @media (max-width: 480px) {
    min-height: 160px;
  }

  .contact-title {
    font-size: 4rem;
    font-weight: 800;
    margin: 0 0 20px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: #667eea;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  .contact-subtitle {
    font-size: 1.25rem;
    color: #a0a0a0;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem;
      padding: 0 20px;
    }

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }
}

.contact-section {
  padding: 60px 0 150px;
}

.contact-grid {
  display: flex;
  justify-content: center;
  align-items: start;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 968px) {
    max-width: 100%;
  }
}

.contact-form-wrapper {
  width: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid #2a2a2a;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
  }

  @media (max-width: 768px) {
    padding: 30px 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;

    @media (max-width: 480px) {
      font-size: 0.95rem;
    }
  }

  input,
  textarea {
    padding: 14px 18px;
    background: #0a060d;
    border: 2px solid #2a2a2a;
    border-radius: 12px;
    color: #fff;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    resize: vertical;
    width: 100%;

    @media (max-width: 480px) {
      padding: 12px 16px;
      font-size: 16px;
      border-radius: 10px;
    }

    &::placeholder {
      color: #666;
    }

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    &.error {
      border-color: #ff4757;
    }
  }

  textarea {
    min-height: 120px;

    @media (max-width: 480px) {
      min-height: 100px;
    }
  }

  .error-message {
    font-size: 0.9rem;
    color: #ff4757;
    margin-top: 4px;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
}

.submit-btn {
  padding: 0 32px;
  height: 46px;
  background-color: #100a16;
  color: #fff;
  border: 1px solid #ffffff;
  border-radius: 30px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: "Basier Mono", monospace;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;

  &:hover:not(:disabled) {
    border-color: #667eea;
    background-color: #667eea22;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0 28px;
    font-size: 10px;
    height: 44px;
    align-self: stretch;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .dot {
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;

      &:nth-child(1) {
        animation-delay: -0.32s;
      }

      &:nth-child(2) {
        animation-delay: -0.16s;
      }
    }
  }
}

.success-message {
  padding: 16px 24px;
  background: #10b98144;
  border: 1px solid #10b981;
  border-radius: 12px;
  color: #10b981;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.fade-in-delay-1 {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
