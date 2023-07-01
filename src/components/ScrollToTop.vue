<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ArrowSmallUpIcon } from "@heroicons/vue/24/outline";

const showTopBtn = ref(false);

onMounted(() => {
  window.addEventListener("scroll", scrollToTop);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollToTop);
});

const scrollToTop = () => {
  if (window.scrollY > 400) {
    showTopBtn.value = true;
  } else {
    showTopBtn.value = false;
  }
};

const goToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <button
    type="button"
    @click="goToTop"
    class="fixed right-5 bottom-8 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg transition-all"
    :class="showTopBtn ? 'opacity-100 visible' : 'opacity-0 invisible'"
  >
    <ArrowSmallUpIcon class="h-5 w-5" aria-hidden="true" />
  </button>
</template>
