<template>
  <section v-if="data.length" class="drawer-main__search-results">
    <template v-for="(i) in visibleResults" :key="i">
      <div class="search-result" @click="gotTo(parseUrl(i.url))">
        <div class="search-result__title" v-html="getTitleForArticle(i.title)"></div>
        <div class="search-result__breadcrumb" v-html="getBreadcrumbsForArticle(i.title)"></div>
        <div class="search-result__text" v-html="formatPreviewMarkdown(i.preview)"></div>
      </div>
    </template>
  </section>
  <div v-else>
    <p v-if="!modelValue.length" class="no_results">Write your search query, then press Enter or click the search button.</p>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { marked } from "marked";

// Create a new renderer instance
const renderer = new marked.Renderer();

// Redefine how headers are processed
renderer.heading = function (text) {
  // check if text is a string
  if (typeof text !== "string") {
    return "";
  }
  return `<strong>${text}</strong>`;
};

// Define image rendering to exclude images
renderer.image = function () {
  return ""; // Exclude image tags by returning an empty string
};

const formatPreviewMarkdown = (markdown) => {
  return marked(markdown, { renderer });
};

const props = defineProps({
  data: {
    type: [Array, Object],
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const { MAX_VISIBLE_RESULT, MAX_VISIBLE_ROWS } = inject('themeConfig');
const isShowAllResult = ref(false);

const gotTo = (url) => {
  let parsedCurrentUrl = new URL(window.location.href);
  let parsedCurrentUrlBase = parsedCurrentUrl.origin;
  let parsedCurrentUrlHash = parsedCurrentUrl.hash;
  let parsedCurrentUrlPathname = parsedCurrentUrl.pathname;

  if (parsedCurrentUrlPathname + parsedCurrentUrlHash === url) {
    window.location.reload();
    return;
  }
  window.location.href = parsedCurrentUrlBase + url;
};

const parseUrl = (url) => {
  let parsed = new URL(url);
  return parsed.pathname + parsed.hash;
};

const visibleResults = computed(() => {
  return isShowAllResult.value ? props.data : props.data?.slice(0, MAX_VISIBLE_RESULT);
});

const countOfHiddenResults = computed(() => {
  return props.data.length - visibleResults.value.length;
});

const showAllHiddenResult = () => {
  isShowAllResult.value = true;
};

const collapseResults = () => {
  isShowAllResult.value = false;
};

const getTitleForArticle = (title) => {
  let sliced = title.split("->").map((part) => part.trim());
  return sliced.pop();
};

const getBreadcrumbsForArticle = (title) => {
  let sliced = title.split("->").map((part) => part.trim());
  sliced.pop();
  return sliced.join(' > ');
};

</script>

<style lang="stylus">
@import "../../styles/config.styl";

.algolia-docsearch-suggestion--highlight {
  background: $drawerHighlightTextBgColor !important;
  color: $drawerHighlightTextColor !important;
}

.drawer-main__search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  column-gap: $drawerSearchColumnGap;
  row-gap: $drawerSearchRowGap;
}

.search-result {
  padding: 1rem;
  border: 1px solid $drawerSearchBorderColor;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: $drawerOneSearchResultGap;
  width: 100%;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);

    .search-result__title {
      color: $mainColor;
      text-decoration: underline;
    }
  }

  &__title {
    font-size: $drawerSearchResultTitleFontSize;
    font-weight: $drawerSearchResultTitleWeight;
    line-height: $drawerSearchResultTitleLineHeight;
    color: $drawerSearchResultTitleColor;
    margin: 0;
  }

  &__text {
    font-size: $drawerSearchResultTextFontSize;
    line-height: $drawerSearchResultTextLineHeight;
    color: $drawerSearchResultTextColor;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: v-bind(MAX_VISIBLE_ROWS);
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }

  &__breadcrumb {
    font-size: $drawerSearchResultBreadcrumbTextSize;
    line-height: $drawerSearchResultBreadcrumbLineHeight;
    color: $drawerSearchResultBreadcrumbColor;
    margin: 0;
  }
}

.no_results {
  font-size: 1.5625rem;
  text-align: center;

  &__link {
    color: $mainColor;
    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: $mobileBreakpoint) {
  .drawer-main__search-results {
    grid-template-columns: repeat(1, 1fr);
  }

  .no_results {
    font-size: 1.25rem;
  }
}
</style>
