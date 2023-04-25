<template>
  <div class="header-products-wrapper">
    <div ref="menu" class="dropdown">
      <img @click="openedMenu = !openedMenu" width="20" height="13" :src="hamburgerIcon"
           alt="hamburger icon">
      <div v-if="openedMenu" class="dropdown-wrapper">
        <p class="dropdown-content__paragraph" v-for="product in productsList" :key="product.label">
          <a class="dropdown-content__link" href="#">{{ product.label }}</a>
        </p>
      </div>
    </div>
    <p class="header-products-wrapper-paragraph">{{ productsText }}</p>
    <img width="10" height="8" :src="arrowDownIcon" alt="arrow down icon"/>
  </div>
</template>
<script setup>

import {inject, onMounted, onUnmounted, ref} from "vue";

const {productsText, arrowDownIcon, hamburgerIcon, productsList} = inject('themeConfig');

const openedMenu = ref(false)

const menu = ref(null)

const clickOutside = (event) => {
  const target = menu.value
  openedMenu.value = event.composedPath().includes(target)
}

onMounted(() => {
  document.addEventListener('click', clickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', clickOutside)
})
</script>

<style lang="stylus">
@import '../../styles/config.styl'

.header-products-wrapper
  display: flex;
  align-items center
  justify-content space-between
  gap 0.75rem
  margin-right 25px

  &-paragraph
    font-size $text-default
    line-height 16px
    color white

.dropbtn
  color: black;
  font-size: 13px;
  line-height 15px
  border: none;
  cursor: pointer;

.dropdown
  position: relative;
  display: inline-block;

  & > img
    cursor pointer

.dropdown-wrapper
  display: none;
  position: absolute;
  background-color: $dropdownBgColor;
  min-width: 200px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
  right 0

.dropdown-content__paragraph
  color: black;
  padding: 8px 20px;
  text-decoration: none;
  display: block;
  cursor pointer
  margin 0

.dropdown .dropdown-wrapper
  display: block;


.dropdown-content__link
  color black
  text-decoration none

.dropdown-wrapper p:hover
  background-color: white;

</style>