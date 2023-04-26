<template>
  <div class="docs-cards-wrapper">
    <template v-for="card in docsCards" :key="card.text">
      <DocsCard
          :docs-title="card.title"
          :docs-text="card.text"
          :url="card.url"
          :default-opened-sidebar-item="card.defaultOpenedSidebarItem"
      />
    </template>
  </div>
</template>

<script setup>
import DocsCard from "./DocsCard.vue"
import {inject} from "vue";

const {docsCards} = inject('themeConfig')
</script>

<style lang="stylus">
.docs-cards-wrapper
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  max-width 1170px
  margin 0 auto
  margin-bottom 14rem
</style>