<template>
  <VueSelect
      ref="dropdown"
      @update:model-value="changeSidebarItems"
      :model-value="selectedValue"
      :clearable="false"
      :searchable="false"
      :options="options">
      <template #open-indicator="{ attributes }">
          <span v-if="withIcon" class="select-icon" v-bind="attributes">
        <img :src="withBase(searchSelectIcon)" alt="search Icon"/>
      </span>
      <span v-else/>
    </template>
  </VueSelect>
</template>

<script setup>
import VueSelect from "vue-select";
import 'vue-select/dist/vue-select.css';
import {inject, onMounted, onUnmounted, ref} from "vue";
import {withBase} from "@vuepress/client";

defineProps({
    withIcon: {
        type: Boolean,
        default: true
    },
    selectedValue: {
        type: Object,
        default: () => ({
            label: '',
            value: ''
        })
    },
    options: {
        type: Array,
        default: () => {
            return []
        }
    }
})
const { searchSelectIcon } = inject("themeConfig")
const emit = defineEmits(['changeSidebarItems', 'update:selectedValue'])
const changeSidebarItems = (e) => {
    emit('changeSidebarItems', e)
    emit('update:model-value', e)
}
const dropdown = ref();
const closeDropdown = () => {
    if (!dropdown.value) return
    dropdown.value.open = false
}
onMounted(() => window.addEventListener('click', (event) => {
        if (!dropdown.value?.$el.contains(event.target)) closeDropdown()
    }))
onUnmounted(() => window.removeEventListener('click', closeDropdown))
</script>
<style lang="stylus">
@import '../../styles/config.styl'
.v-select
  .vs__selected-options
    padding 5px 0 5px 1rem

  .vs__search
    display none

  .vs__dropdown
    &-toggle
      width 100%
      height 43px
      border 1px solid $selectBorderColor
      outline none
      border-radius $selectBorderRadius
      background white

    &-menu
      margin-top 5px
      border-radius 4px

    &-option
      padding 8px

  .select-icon
    margin-right 1rem
</style>