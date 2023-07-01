<script setup>
import {
  DevicePhoneMobileIcon,
  PaintBrushIcon,
  CogIcon,
  CursorArrowRaysIcon,
} from "@heroicons/vue/24/outline";

const features = [
  {
    name: "Custom Popup Design",
    description:
      "Create unique and visually appealing popups tailored to the needs of your clients.",
    icon: PaintBrushIcon,
  },
  {
    name: "Interactive Elements",
    description:
      "Incorporate interactive elements like animations, hover effects, and click triggers to engage users.",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Responsive Design",
    description:
      "Ensure that popups are responsive and compatible with various devices, including desktop, tablets, and mobile.",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Easy Customization",
    description:
      "Provide an intuitive interface for clients to customize and tailor the design and content of their popups.",
    icon: CogIcon,
  },
];
</script>
<template>
  <div class="bg-white py-24 sm:pyb32" id="features">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-primary">
          Design faster
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Everything you need to design your popup
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          The website for your custom popup design service aims to provide an
          eye-catching and interactive experience for visitors.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="relative pl-16"
          >
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div
                class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary"
              >
                <component
                  :is="feature.icon"
                  class="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
