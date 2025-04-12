<template>
  <meta name="google-site-verification" content="5-Q2NFM8YQ1f64j819in5tsqnlwNjQXX6Y0PQzmBEcs" />
  <div class="theme-container">
    <HeaderLayout :isMobileWidth="isMobileWidth"/>
    <DocsCardsWrapper/>
    <Footer/>
  </div>
</template>

<script setup>
import DocsCardsWrapper from "../cards/DocsCardsWrapper.vue";
import Footer from "../footer/Footer.vue";
import HeaderLayout from '../header/HeaderLayout.vue'
import {inject, onMounted, onUnmounted, ref} from "vue";

const { MOBILE_BREAKPOINT } = inject('themeConfig')
const isMobileWidth = ref(false);
const handleResize = () => isMobileWidth.value = window.innerWidth <= MOBILE_BREAKPOINT;

onMounted(() => {
  window.addEventListener('resize', handleResize)
  isMobileWidth.value = window.innerWidth <= MOBILE_BREAKPOINT;
})
onUnmounted(() => window.removeEventListener('resize', handleResize));
</script>
