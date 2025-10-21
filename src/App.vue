<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import ChatBot from './components/ChatBot.vue'
</script>

<template>
  <div id="app">
    <ScrollProgress />
    <Header />
    <router-view />
    <Footer />
    <ScrollToTop />
    <ChatBot />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  background-color: var(--bg-primary, #0a060d);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}
</style>
