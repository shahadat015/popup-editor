<script setup>
import { ref } from "vue";

import { EyeIcon, PencilIcon } from "@heroicons/vue/24/solid";
import Popup from "../components/Popup.vue";

const open = ref(false);
</script>

<template>
  <div class="h-[calc(100vh-200px)] px-6 lg:px-8 pt-7">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="relative group">
        <img
          class="h-64 w-full object-cover rounded-md"
          src="../assets/template.png"
          alt="Popup Template"
        />
        <div
          class="absolute inset-0 bg-gray-700 opacity-60 rounded-md invisible group-hover:visible"
        ></div>
        <div
          class="absolute inset-0 flex items-center justify-center gap-2 invisible group-hover:visible"
        >
          <button
            @click="open = true"
            v-tooltip="'Preview'"
            class="p-2 bg-primary hover:bg-primary/80 text-white rounded-full"
          >
            <EyeIcon class="w-5 h-5"></EyeIcon>
          </button>
          <router-link
            :to="{ name: 'Editor' }"
            v-tooltip="'Edit'"
            class="p-2 bg-primary hover:bg-primary/80 text-white rounded-full"
          >
            <PencilIcon class="w-5 h-5"></PencilIcon>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Popup :open="open" @close="open = false">
    <div
      class="grid place-items-center w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-primary rounded-full"
    >
      <div
        class="flex flex-col items-center w-[334px] h-[334px] sm:w-[484px] sm:h-[484px] rounded-full border-4 border-white"
      >
        <img
          class="mt-4 sm:mt-6 w-[145px] h-[45px]"
          src="../assets/stars.png"
          alt=""
        />
        <h3
          class="mt-4 sm:mt-8 sm:w-[354px] text-center text-white text-[14px] sm:text-[26px] font-bold"
        >
          All the text and elements in this popup should be editable and
          dragable
        </h3>
        <input
          class="w-[300px] sm:w-[354px] mt-5 px-3 py-3 sm:py-4 rounded-[16px] placeholder:text-lg focus:outline-none"
          type="email"
          placeholder="E-mail"
        />

        <button
          class="w-[250px] sm:w-[354px] mt-5 px-3 py-3 sm:py-4 bg-[#414142] text-white uppercase rounded-[16px] text-sm sm:text-lg font-extrabold focus:outline-none"
        >
          Signup Now
        </button>

        <p class="mt-3 w-[200px] sm:w-full text-sm sm:text-base text-white">
          No credit card required. No surprises
        </p>
      </div>
    </div>
  </Popup>
</template>
