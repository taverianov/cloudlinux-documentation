<template>
  <div class="theme-container">
    Not found
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {pagesData} from "../../.temp/internal/pagesData.js";
import redirects from './redirects.json';

const route = useRoute()
const router = useRouter()
const allPages = ref([])

// Function to escape special characters in a string for use in a regular expression
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

const redirectionURL = async () => {
  // Check if the route starts with /index.html?
  if (route.path.startsWith('/index.html?')) {
    // Extract the part after the ?
    const key = route.path.split('?')[1];
    // Check if this key exists in the redirects
    if (key in redirects) {
      // If it does, redirect to the associated path
      router.push(redirects[key]);
      return true;
    }
  }
  
  for (let [from, to] of Object.entries(redirects)) {
    // Existing code for paths without special characters
    const escapedFrom = escapeRegExp(from);
    if (route.path.search(escapedFrom) !== -1) {
      const path = route.path.replace(new RegExp(escapedFrom, 'g'), to);
      router.push(path);
      return true;
    }
  }
  return false;
};


const getRecursiveLevelPath = (child, rootPath) => {
  let haveSolution = false;

  if (haveSolution) return;

  if(child.children?.length > 0) {
    for (let h of child.children) {
      const path = rootPath + "/" + h.link

      if (path.search(route.path) !== -1) {
        router.push(path)
        haveSolution = true
        return;
      }

      if (child.children.length > 0) {
        getRecursiveLevelPath(h, rootPath)
      }
    }
  }
}

onMounted(async ()=>{
  // If a redirect was performed, stop checking the other techniques
  if (await redirectionURL()) {
    return;
  }

  // If no match found in JSON redirects, then check the existing techniques
  const values = Object?.values(pagesData);

  for (let value of values) {
    const res = await value();

    let rootPath = res.path;

    if (rootPath.at(-1) === "/")
      rootPath = rootPath.slice(0, -1);

    if(res.headers?.length > 0) {
      for (let h of res.headers) {
        const path = rootPath + "/" + h.link

        if (path.search(route.path) !== -1){
          router.push(path)
          return;
        }
        getRecursiveLevelPath(h, rootPath);
      }
    }
  }
})
</script>
