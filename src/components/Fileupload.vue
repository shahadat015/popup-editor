<script setup>
import { ref, watch } from "vue";

let props = defineProps(["modelValue"]);

const emit = defineEmits(["update:modelValue"]);

let active = ref(false);
let input = ref(false);

function toggleActive() {
  active.value = !active.value;
}

function onDrop(e) {
  emit("update:modelValue", e.dataTransfer.files[0]);
}

function handleFile(e) {
  emit("update:modelValue", e.target.files[0]);
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      input.value = null;
    }
  }
);
</script>

<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="onDrop"
    @click="input.click()"
    class="flex items-center justify-center w-full border-2 border-dashed py-9 text-primary hover:border-primary transition-colors rounded cursor-pointer"
    :class="{ 'text-white': active }"
  >
    <div class="text-center">
      <svg
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        class="mx-auto mb-4"
        :class="active ? 'text-white' : 'text-primary'"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.35 6.04C18.67 2.59 15.64 0 12 0C9.11 0 6.6 1.64 5.35 4.04C2.34 4.36 0 6.91 0 10C0 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM19 14H6C3.79 14 2 12.21 2 10C2 7.95 3.53 6.24 5.56 6.03L6.63 5.92L7.13 4.97C8.08 3.14 9.94 2 12 2C14.62 2 16.88 3.86 17.39 6.43L17.69 7.93L19.22 8.04C20.78 8.14 22 9.45 22 11C22 12.65 20.65 14 19 14ZM10.55 9H8L12 5L16 9H13.45V12H10.55V9Z"
          fill="currentColor"
        />
      </svg>

      <div class="font-light text-sm">Drop file here or click to upload</div>
      <input
        class="hidden"
        type="file"
        @change="handleFile"
        ref="input"
        accept="image/*"
      />
    </div>
  </div>
</template>
