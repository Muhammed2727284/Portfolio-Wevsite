<template>
  <div class="chatbot-container">
    <transition name="slide-up">
      <div v-if="isOpen" class="chatbot-window">
        <div class="chatbot-header">
          <div class="header-content">
            <div class="avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div class="header-info">
              <h3>{{ t('chatbot.title') }}</h3>
              <span class="status">Online</span>
            </div>
          </div>
          <button @click="toggleChat" class="close-btn" aria-label="Close chat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="chatbot-messages" ref="messagesContainer">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.type]"
          >
            <div class="message-content">
              {{ msg.text }}
            </div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
          <div v-if="isTyping" class="message bot">
            <div class="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div class="chatbot-input">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            :placeholder="t('chatbot.placeholder')"
            type="text"
            ref="messageInput"
          />
          <button @click="sendMessage" :disabled="!newMessage.trim()" aria-label="Send message" class="send-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <button
      v-if="!isOpen"
      @click="toggleChat"
      class="chatbot-toggle"
      aria-label="Open chat"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
      <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import { useLanguage } from '../composables/useLanguage';

const { t } = useLanguage();

const isOpen = ref(false);
const newMessage = ref('');
const isTyping = ref(false);
const unreadCount = ref(0);
const messagesContainer = ref<HTMLElement | null>(null);
const messageInput = ref<HTMLInputElement | null>(null);

interface Message {
  text: string;
  type: 'user' | 'bot';
  time: string;
}

const messages = ref<Message[]>([]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    unreadCount.value = 0;
    if (messages.value.length === 0) {
      addBotMessage(t('chatbot.greeting'));
    }
    nextTick(() => {
      messageInput.value?.focus();
    });
  }
};

const addBotMessage = (text: string) => {
  messages.value.push({
    text,
    type: 'bot',
    time: getCurrentTime()
  });
  scrollToBottom();
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  messages.value.push({
    text: newMessage.value,
    type: 'user',
    time: getCurrentTime()
  });

  const userMsg = newMessage.value.toLowerCase();
  newMessage.value = '';
  scrollToBottom();

  isTyping.value = true;
  setTimeout(() => {
    isTyping.value = false;
    const response = getAutoResponse(userMsg);
    addBotMessage(response);
  }, 1000 + Math.random() * 1000);
};

const getAutoResponse = (msg: string): string => {
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('привет') || msg.includes('салам')) {
    return t('chatbot.greeting');
  }
  if (msg.includes('help') || msg.includes('помощь') || msg.includes('жардам')) {
    return "I can help you with questions about my projects, skills, or contact information. What would you like to know?";
  }
  if (msg.includes('project') || msg.includes('portfolio') || msg.includes('проект')) {
    return "Check out my portfolio page to see all my projects! I've worked on e-commerce platforms, task management apps, and more.";
  }
  if (msg.includes('contact') || msg.includes('email') || msg.includes('связ')) {
    return "You can reach me at muhammed@example.com or through the contact form. I usually respond within 24 hours!";
  }
  if (msg.includes('skill') || msg.includes('technology') || msg.includes('навык')) {
    return "I specialize in Vue.js, React, Python, and Django. I'm passionate about creating beautiful, responsive web applications!";
  }
  return t('chatbot.offline');
};

const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

onMounted(() => {
  setTimeout(() => {
    if (!isOpen.value) {
      unreadCount.value = 1;
    }
  }, 5000);
});
</script>

<style lang="scss" scoped>
.chatbot-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
  }
}

.chatbot-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  position: relative;

  svg {
    width: 28px;
    height: 28px;
    color: white;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  .unread-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4757;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    animation: pulse 2s infinite;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.5);

    svg {
      width: 26px;
      height: 26px;
    }

    &:active {
      transform: scale(0.9);
    }
  }
}

.chatbot-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 550px;
  background: var(--bg-secondary, #ffffff);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    max-height: none;
    border-radius: 0;
  }

  @media (max-width: 768px) and (orientation: landscape) {
    height: 100vh;
  }
}

.chatbot-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 16px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      width: 42px;
      height: 42px;
    }

    svg {
      width: 28px;
      height: 28px;
      color: white;

      @media (max-width: 768px) {
        width: 24px;
        height: 24px;
      }
    }
  }

  .header-info {
    h3 {
      margin: 0;
      color: white;
      font-size: 18px;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 17px;
      }
    }

    .status {
      color: rgba(255, 255, 255, 0.9);
      font-size: 13px;

      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }

  .close-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;

    @media (max-width: 768px) {
      padding: 8px;
      margin-right: -8px;
    }

    svg {
      width: 24px;
      height: 24px;
      color: white;

      @media (max-width: 768px) {
        width: 28px;
        height: 28px;
      }
    }

    &:hover {
      opacity: 0.8;
    }

    &:active {
      transform: scale(0.9);
      opacity: 0.7;
    }
  }
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg-primary, #f5f5f5);
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 14px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 3px;
  }
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 75%;
  animation: messageSlide 0.3s ease;

  @media (max-width: 768px) {
    max-width: 85%;
  }

  &.bot {
    align-self: flex-start;

    .message-content {
      background: var(--bg-secondary, #ffffff);
      color: var(--text-primary, #1a1a1a);
      border-radius: 18px 18px 18px 4px;
    }
  }

  &.user {
    align-self: flex-end;

    .message-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 18px 18px 4px 18px;
    }
  }

  .message-content {
    padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    word-wrap: break-word;
    line-height: 1.5;
    font-size: 14px;

    @media (max-width: 768px) {
      padding: 14px 16px;
      font-size: 15px;
      line-height: 1.6;
    }
  }

  .message-time {
    font-size: 11px;
    color: var(--text-tertiary, #999999);
    margin-top: 4px;
    padding: 0 8px;

    @media (max-width: 768px) {
      font-size: 11px;
    }
  }
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px !important;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #667eea;
    animation: typing 1.4s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

.chatbot-input {
  padding: 20px;
  background: var(--bg-secondary, #ffffff);
  border-top: 1px solid var(--border-color, #e0e0e0);
  display: flex;
  gap: 10px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 16px;
    padding-bottom: max(16px, env(safe-area-inset-bottom));
    gap: 12px;
  }

  input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--border-color, #e0e0e0);
    border-radius: 25px;
    outline: none;
    font-size: 14px;
    background: var(--bg-primary, #f5f5f5);
    color: var(--text-primary, #1a1a1a);
    transition: border-color 0.3s ease;
    -webkit-appearance: none;

    @media (max-width: 768px) {
      font-size: 16px;
      padding: 14px 18px;
      border-radius: 28px;
    }

    &:focus {
      border-color: #667eea;
      background: var(--bg-secondary, #ffffff);
    }

    &::placeholder {
      color: var(--text-tertiary, #999999);
    }
  }

  .send-btn {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;

    @media (max-width: 768px) {
      width: 52px;
      height: 52px;
    }

    svg {
      width: 20px;
      height: 20px;
      color: white;

      @media (max-width: 768px) {
        width: 24px;
        height: 24px;
      }
    }

    &:hover:not(:disabled) {
      transform: scale(1.1);
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: linear-gradient(135deg, #999 0%, #666 100%);
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
