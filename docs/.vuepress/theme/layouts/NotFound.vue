<template>
  <div class="custom-container">
    <h1>404</h1>
    <p class="custom-text">The page you are looking for does not exist. It might have been moved or deleted.</p>
    <a class="custom-btn" href="./">Home</a>
  </div>
</template>

<style>
/* Custom styles for the container */
.custom-container {
  padding: 40px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
}

.custom-img {
  color: white;
}

.custom-text {
  color: white;
  margin-top: 18px;
  text-align: center;
}

.custom-btn {
  padding: 10px 20px;
  border-radius: 6px;
  color: blue;
  background-color: white;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 15px;
  cursor: pointer;
}
</style>


<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { pagesData } from "../../.temp/internal/pagesData.js";
import redirects from './redirects.json';

const route = useRoute();
const router = useRouter();
const allPages = ref([]);

// Function to escape special characters in a string for use in a regular expression
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

const redirectionURL = async () => {
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
};

onMounted(async () => {
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
});
</script>
