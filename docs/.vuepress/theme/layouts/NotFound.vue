<template>
  <div class="custom-container">
    <iframe v-if="showIframe" :src="iframeSrc" style="width: 100%; height: 100vh; border: none;"></iframe>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { pagesData } from "../../.temp/internal/pagesData.js";

const route = useRoute();
const router = useRouter();
const showIframe = ref(false);
const iframeSrc = ref("");

const getRecursiveLevelPath = (child, rootPath) => {
  let haveSolution = false;

  if (haveSolution) return;

  if (child.children?.length > 0) {
    for (let h of child.children) {
      const path = rootPath + "/" + h.link;

      if (path.search(route.path) !== -1) {
        router.push(path);
        haveSolution = true;
        return;
      }

      if (child.children.length > 0) {
        getRecursiveLevelPath(h, rootPath);
      }
    }
  }
};

onMounted(async () => {
  const values = Object?.values(pagesData);

  for (let value of values) {
    const res = await value();
    let rootPath = res.path;

    if (rootPath.at(-1) === "/") {
      rootPath = rootPath.slice(0, -1);
    }

    if (res.headers?.length > 0) {
      for (let h of res.headers) {
        const path = rootPath + "/" + h.link;

        if (path.search(route.path) !== -1) {
          router.push(path);
          return;
        }
        getRecursiveLevelPath(h, rootPath);
      }
    }
  }

  if (route.fullPath.startsWith('/legacy')) {
    const newPath = route.fullPath.replace('/legacy', '/cloudlinuxos');
    window.location.href = newPath;
  } else if (route.fullPath.startsWith('/shared')) {
    const newPath = route.fullPath.replace('/shared', '/cloudlinuxos');
    router.push(newPath);
    window.location.href = newPath;
  } else {
    router.push('/not-found.html');
    window.location.href = ('/not-found.html');
  }
});
</script>

<style>
.custom-container {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>