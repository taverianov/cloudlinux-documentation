<template>
  <div class="header-layout__search-container">
    <h1 v-if="isGlobalLayout" class="header-layout__search-title">
      {{ headerSearch }}
    </h1>
    <div class="header-layout__search-wrapper">
      <input :class="searchClass" type="text" :placeholder="placeholder">
      <div class="header-layout__search-icon" :class="{'header-layout__search-icon-default':!isGlobalLayout}">
        <img alt="search icon" :src="searchColorIcon"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, inject} from "vue";
import {usePageFrontmatter} from "@vuepress/client";

const {headerSearch, headerSearchPlaceholder, headerDefaultSearchIcon, headerSearchIcon} = inject('themeConfig')

const frontmatter = usePageFrontmatter()

const isGlobalLayout = computed(() => {
  return frontmatter.value.layout === 'HomeLayout'
})

const placeholder = computed(() => {
  return isGlobalLayout.value ? headerSearchPlaceholder : 'Search'
})

const searchClass = computed(() => {
  return isGlobalLayout.value ? 'header-layout__search' : 'header-layout__search-default'
})

const searchColorIcon = computed(() => {
  return isGlobalLayout.value ? headerSearchIcon : headerDefaultSearchIcon
})
</script>

<style lang="stylus">
@import '../../styles/config.styl'

.header-layout__search
  &-container
    display: flex
    justify-content: center
    align-items: center
    flex-direction column

  &-wrapper
    position relative
    display: flex;
    justify-content center
    align-content center
    width: 70%

  &-title
    font-weight: 500
    font-size: 3.4rem
    line-height: 4rem
    color white
    margin-top 5.625rem
    margin-bottom: 2.5rem

  &
    width: 70%
    border-radius: $homeSearchBorderRadius
    border none
    padding 1.4rem 2rem
    color: $gray-500;
    font-size: 14px
    line-height: 16px
    margin-bottom 7.25rem
    outline: none

  &-default
    border-radius $defaultSearchBorderRadius
    border: none
    outline: none
    padding 12px 15px
    width 250px
    background rgba(0, 0, 0, 0.1)
    color white
    font-size: $text-default
    line-height: 16px

  &-default::placeholder
    color: white;


  &-icon
    position absolute
    top: 8%;
    right 15%
    cursor pointer

  &-icon-default
    right 10%
</style>