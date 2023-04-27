<template>
  <div class="page">
    <slot name="top"/>

    <Breadcrumb class="page-breadcrumb"/>

    <div class="page-nav-wrapper">
      <PageNav :sidebar-items="sidebarItems" :allPages="allPages"/>
    </div>

    <Content class="content" :custom="false"/>

    <div class="page-edit">
      <div
          class="edit-link"
          v-if="isEditLinkText"
      >
        <img :src="editIcon" alt="icon pen"/>
        <a
            :href="editLink"
            target="_blank"
            rel="noopener noreferrer"
        >{{ isEditLinkText }}</a>
      </div>

      <div
          class="last-updated"
          v-if="isLastUpdated"
      >
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </div>

    <BackToTop/>

    <slot name="bottom"/>
  </div>
</template>

<script setup>
import {endingSlashRE, normalize, outboundRE} from '../util'
import BackToTop from './BackToTop.vue';
import {usePageData, usePageFrontmatter, usePageLang} from "@vuepress/client";
import {computed, inject} from "vue";
import Breadcrumb from "./Breadcrumb.vue";
import PageNav from "./PageNav.vue";

const {
  editIcon, lastUpdated, repo, editLinks,
  docsDir = '',
  docsBranch = 'master',
  docsRepo = repo,
  editLinkText
} = inject('themeConfig')
const props = defineProps({
  sidebarItems: {
    type: Array,
    default: () => []
  },
  allPages: {
    type: Array
  }
})

const page = usePageData()
const lang = usePageLang()
const frontmatter = usePageFrontmatter()
const isLastUpdated = computed(() => {
  if (page.value.lastUpdated) {
    return new Date(page.value.lastUpdated).toLocaleString(lang.value)
  }
})

const lastUpdatedText = computed(() => {
  if (typeof frontmatter.value.lastUpdated === 'string') {
    return frontmatter.value.lastUpdated
  }
  if (typeof lastUpdated === 'string') {
    return lastUpdated
  }
  return 'Last Updated'
})

const editLink = computed(() => {
  if (frontmatter.value.editLink === false) {
    return
  }

  let path = normalize(page.value.path)
  if (endingSlashRE.test(path)) {
    path += 'README.md'
  } else {
    path += '.md'
  }
  if (docsRepo && editLinks) {
    return createEditLink(repo, docsRepo, docsDir, docsBranch, path)
  }
})

const isEditLinkText = computed(() => {
  return (
      editLinkText ||
      lastUpdated ||
      'Edit this page'
  )
})

const createEditLink = (repo, docsRepo, docsDir, docsBranch, path) => {
  const bitbucket = /bitbucket.org/
  if (bitbucket.test(repo)) {
    const base = outboundRE.test(docsRepo)
        ? docsRepo
        : repo
    return (
        base.replace(endingSlashRE, '') +
        `/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path +
        `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
    )
  }

  const base = outboundRE.test(docsRepo)
      ? docsRepo
      : `https://github.com/${docsRepo}`

  return (
      base.replace(endingSlashRE, '') +
      `/edit/${docsBranch}` +
      (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
      path
  )
}
</script>

<style lang="stylus">
@import '../../styles/config.styl'
@require '../../styles/wrapper.styl'

.page
  padding-bottom 2rem
  padding-top 6rem

  &-breadcrumb
    margin-left 3rem

  &-nav-wrapper
    max-width: 847px;
    margin: 0 3rem;
    position relative

  &-edit
    @extend $wrapper
    padding-top 1rem
    padding-bottom 1rem
    overflow auto

    .edit-link
      display flex
      align-items center
      gap 5px

      a
        color $mainColor
        font-weight 600
        font-size $text-default
        line-height 16px
        margin-right 0.25rem

    .last-updated
      float right
      font-size 0.9em

      .prefix
        font-weight 500
        color lighten($textColor, 25%)

      .time
        font-weight 400
        color #aaa

.content
  h1
    max-width 80%
</style>
