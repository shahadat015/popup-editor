<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import Promo from "./components/Promo.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ScrollToTop from "./components/ScrollToTop.vue";

const route = useRoute();

let promoBannerOpen = ref(true);
</script>

<template>
  <Promo
    v-if="promoBannerOpen && route.name == 'Home'"
    @close="promoBannerOpen = false"
  />

  <Header />

  <router-view></router-view>

  <Footer />

  <ScrollToTop />
</template>
