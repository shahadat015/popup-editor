<script setup>
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

let props = defineProps({
  type: String,
  title: String,
  message: String,
  open: Boolean,
});

defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div
      class="absolute bottom-10 left-10 z-20 rounded-md p-3 flex items-center"
      :class="type == 'success' ? 'bg-green-100' : 'bg-red-100'"
    >
      <CheckBadgeIcon
        v-if="type == 'success'"
        class="h-8 w8 mr-2 flex-shrink-0"
        :class="type == 'success' ? 'text-green-600' : 'text-red-600'"
      ></CheckBadgeIcon>

      <ExclamationTriangleIcon
        v-if="type == 'error'"
        class="h-8 w-8 mr-2 flex-shrink-0"
        :class="type == 'success' ? 'text-green-600' : 'text-red-600'"
      ></ExclamationTriangleIcon>

      <div
        class="text-green-700"
        :class="type == 'success' ? 'text-green-700' : 'text-red-700'"
      >
        <div class="font-bold text-xl">{{ title }}</div>

        <div v-if="message">
          {{ message }}
        </div>
      </div>
      <button @click="$emit('close')">
        <XMarkIcon class="w-6 h-6 ml-2"></XMarkIcon>
      </button>
    </div>
  </Teleport>
</template>
