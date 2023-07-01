<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div
    class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1"
  >
    <div
      class="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primary to-[#9089fc] opacity-30"
      />
    </div>
    <div
      class="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-primary to-[#9089fc] opacity-30"
      />
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p class="text-sm leading-6 text-gray-900">
        <strong class="font-semibold">DevConf 2023</strong
        ><svg
          viewBox="0 0 2 2"
          class="mx-2 inline h-0.5 w-0.5 fill-current"
          aria-hidden="true"
        >
          <circle cx="1" cy="1" r="1" />
        </svg>
        Join us in Dhaka from June 1 – 3 to see what's coming next.
      </p>
      <a
        href="#"
        class="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
      >
        Register now <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
    <div class="flex flex-1 justify-end">
      <button
        @click="$emit('close')"
        type="button"
        class="-m-3 p-3 z-10 focus-visible:outline-offset-[-4px]"
      >
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="h-5 w-5 text-gray-900" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
