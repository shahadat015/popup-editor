<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import Fileupload from "../components/Fileupload.vue";
import Toast from "../components/Toast.vue";
import Popup from "../components/Popup.vue";
import {
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  CursorArrowRippleIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";

let imageModal = ref(false);
let previewModal = ref(false);
let saveSuceess = ref(false);
let file = ref(null);

let popup = reactive({
  width: 500,
  height: 500,
  bg_color: "#df795e",
  btn_color: "#414142",
  btn_hover_color: "#7661df",
  padding: 16,
  constrains: true,
});
let elements = reactive([]);

const btnStyle = computed(() => {
  return {
    "--color": popup.btn_color,
    "--color-hover": popup.btn_hover_color,
  };
});

onMounted(() => {
  setPopupData();
  setPopupElements();
});

function savePopup() {
  localStorage.setItem("popup", JSON.stringify(popup));
  localStorage.setItem("elements", JSON.stringify(elements));
  saveSuceess.value = true;
}

function setPopupData() {
  let savedPopup = localStorage.getItem("popup");

  if (!savedPopup) {
    return;
  }

  try {
    Object.assign(popup, JSON.parse(savedPopup));
  } catch (error) {
    console.log(error);
  }
}

function setPopupElements() {
  let savedElements = localStorage.getItem("elements");

  if (!savedElements) {
    return elements.push(...getDefaultElements());
  }

  try {
    elements.push(...JSON.parse(savedElements));
  } catch (error) {
    console.log(error);
  }
}

function getDefaultElements() {
  return [
    {
      id: uniqueId(),
      type: "image",
      src: "/stars.png",
      alt: "stars",
      class: "draggable",
      style: {
        position: "relative",
        top: "30px",
        width: "145px",
        height: "45px",
      },
    },
    {
      id: uniqueId(),
      type: "text",
      content:
        "All the text and elements in this popup should be editable and dragable",
      class: "draggable",
      style: {
        position: "relative",
        top: "60px",
        maxWidth: "354px",
        textAlign: "center",
        color: "#fff",
        fontSize: "26px",
        fontWeight: "bold",
      },
    },
    {
      id: uniqueId(),
      type: "input",
      inputType: "email",
      placeholder: "E-mail",
      class: "draggable",
      style: {
        position: "relative",
        top: "80px",
        maxWidth: "354px",
        width: "100%",
        maxWidth: "354px",
        padding: "12px 16px",
        borderRadius: "16px",
      },
    },
    {
      id: uniqueId(),
      type: "button",
      content: "Signup Now",
      class: "draggable",
      style: {
        position: "relative",
        top: "100px",
        width: "100%",
        maxWidth: "354px",
        padding: "12px 16px",
        borderRadius: "16px",
        textTransform: "uppercase",
        color: "#fff",
        fontSize: "16px",
        fontWeight: 700,
      },
    },
    {
      id: uniqueId(),
      type: "text",
      content: "No credit card required. No surprises",
      class: "draggable",
      style: {
        position: "relative",
        top: "110px",
        color: "#fff",
      },
    },
  ];
}

function addText() {
  elements.push({
    id: uniqueId(),
    type: "text",
    content: "Sample text",
    class: "draggable",
    style: {
      position: "relative",
      top: getPosition(),
      maxWidth: "354px",
      textAlign: "center",
      color: "#fff",
      fontSize: "26px",
      fontWeight: "bold",
    },
  });
}

function addButton() {
  elements.push({
    id: uniqueId(),
    type: "button",
    content: "Signup Now",
    class: "draggable",
    style: {
      position: "relative",
      top: getPosition(),
      width: "100%",
      maxWidth: "354px",
      padding: "12px 16px",
      borderRadius: "16px",
      textTransform: "uppercase",
      color: "#fff",
      fontSize: "16px",
      fontWeight: 700,
    },
  });
}

async function addImage() {
  let convertedFile = await toBase64();

  if (!convertedFile) return;

  elements.push({
    id: uniqueId(),
    type: "image",
    src: convertedFile,
    alt: "stars",
    class: "draggable",
    style: {
      position: "relative",
      top: getPosition(),
    },
  });

  imageModal = false;
}

function toBase64() {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Set up event handlers for the FileReader
    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as Data URL
    reader.readAsDataURL(file.value);
  });
}

function removeElement(item) {
  let index = elements.findIndex((element) => element.id == item.id);

  if (index == -1) return;

  elements.splice(index, 1);
}

function uniqueId() {
  return Math.random().toString(36).slice(2);
}

function getPosition() {
  return console.log(Math.floor(Math.random() * 10)) + "px";
}

watch(
  () => popup.width,
  (newValue) => {
    if (!popup.constrains || newValue == popup.height) return;

    popup.height = newValue;
  }
);

watch(
  () => popup.height,
  (newValue) => {
    if (!popup.constrains || newValue == popup.width) return;

    popup.width = newValue;
  }
);

watch(
  () => file.value,
  (newVal) => {
    if (newVal) {
      addImage();
    }
  }
);
</script>

<template>
  <div class="lg:flex gap-7 px-6 lg:px-8 pt-7">
    <!-- sidebar controlls -->
    <div class="w-full lg:w-[464px] mb-4 lg:mb-0">
      <!-- General Settings -->
      <Disclosure v-slot="{ open }" defaultOpen>
        <DisclosureButton
          class="flex w-full justify-between text-white p-4 text-left text-sm font-medium bg-secondary hover:bg-secondary/90 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          :class="open ? 'rounded-t-lg' : 'rounded-lg'"
        >
          <span>General settings</span>
          <ChevronUpIcon
            :class="{ 'rotate-180 transform': open }"
            class="h-5 w-5 text-white"
          />
        </DisclosureButton>
        <DisclosurePanel class="text-sm text-gray-500 shadow rounded-b-lg">
          <!-- Controll popup size -->
          <div class="p-4 border-b">
            <div class="flex items-center gap-1.5">
              <QuestionMarkCircleIcon
                class="w-6 h-6 text-gray-400"
                v-tooltip="'Controll your popup width and height'"
              ></QuestionMarkCircleIcon>
              <span>Popup Size</span>
            </div>
            <div class="sm:flex items-center gap-8 mt-3">
              <div class="flex items-center gap-5 mb-4 sm:mb-0">
                <label for="width">Width: </label>
                <div class="flex items-center gap-1">
                  <input
                    v-model="popup.width"
                    id="width"
                    class="max-w-[74px] p-3 border rounded focus:outline-none"
                    type="number"
                    min="10"
                  />
                  <span>px</span>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <label for="height">Height: </label>
                <div class="flex items-center gap-1">
                  <input
                    v-model="popup.height"
                    id="height"
                    class="max-w-[74px] p-3 border rounded focus:outline-none"
                    type="number"
                    min="10"
                  />
                  <span>px</span>
                </div>
              </div>

              <button
                class="p-2 bg-gray-100 rounded-full"
                @click="popup.constrains = !popup.constrains"
              >
                <LockClosedIcon
                  v-if="popup.constrains"
                  class="w-5 h-5"
                ></LockClosedIcon>
                <LockOpenIcon v-else class="w-5 h-5"></LockOpenIcon>
              </button>
            </div>
          </div>

          <!-- Controll background color -->
          <div class="p-4 border-b">
            <div class="flex items-center gap-1.5">
              <QuestionMarkCircleIcon
                class="w-6 h-6 text-gray-400"
                v-tooltip="'Controll your popup background color'"
              ></QuestionMarkCircleIcon>
              <span>Background Design</span>
            </div>
            <div class="flex items-center gap-16 mt-3">
              <div class="flex items-center gap-5">
                <label for="bgColor">Background: </label>
                <input
                  v-model="popup.bg_color"
                  id="bgColor"
                  class="max-w-[74px] p-3 border rounded focus:outline-none"
                  type="color"
                  min="10"
                />
              </div>
            </div>
          </div>

          <!-- Controll submit button -->
          <div class="p-4 border-b">
            <div class="flex items-center gap-1.5">
              <QuestionMarkCircleIcon
                class="w-6 h-6 text-gray-400"
                v-tooltip="'Controll your popup submit button'"
              ></QuestionMarkCircleIcon>
              <span>Submit Button</span>
            </div>
            <div class="flex items-center gap-5 sm:gap-16 mt-3">
              <div class="flex items-center gap-5">
                <label for="bgColor">Background: </label>
                <input
                  v-model="popup.btn_color"
                  id="bgColor"
                  class="max-w-[74px] p-3 border rounded focus:outline-none"
                  type="color"
                  min="10"
                />
              </div>
              <div class="flex items-center gap-5">
                <label for="hoverColor">Hover: </label>
                <input
                  v-model="popup.btn_hover_color"
                  id="hoverColor"
                  class="max-w-[74px] p-3 border rounded focus:outline-none"
                  type="color"
                  min="10"
                />
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <!-- Add new element -->
      <Disclosure as="div" v-slot="{ open }" defaultOpen class="mt-4">
        <DisclosureButton
          class="flex w-full justify-between text-white p-4 text-left text-sm font-medium bg-secondary hover:bg-secondary/90 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          :class="open ? 'rounded-t-lg' : 'rounded-lg'"
        >
          <span>Add element</span>
          <ChevronUpIcon
            :class="{ 'rotate-180 transform': open }"
            class="h-5 w-5 text-white"
          />
        </DisclosureButton>
        <DisclosurePanel class="text-sm text-gray-500 shadow rounded-b-lg">
          <!-- Controll popup size -->
          <div class="p-4 border-b">
            <div class="grid grid-cols-3 gap-5">
              <button
                @click="addText"
                class="grid place-items-center p-5 rounded-lg shadow"
              >
                <span class="border border-gray-400 rounded-full p-3">
                  <svg
                    class="w-4 h-4"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5h1V2h5v14H5v1h7v-1H9V2h5v3h1V1H2v4z"
                      fill-rule="nonzero"
                      fill-opacity="1"
                      fill="currentColor"
                      stroke="none"
                    ></path>
                  </svg>
                </span>
                <p class="mt-2 text-sm">Text</p>
              </button>

              <button
                @click="addButton"
                class="grid place-items-center p-5 rounded-lg shadow"
              >
                <span class="border border-gray-400 rounded-full p-3">
                  <CursorArrowRippleIcon
                    class="w-4 h-4"
                  ></CursorArrowRippleIcon>
                </span>
                <p class="mt-2 text-sm">Button</p>
              </button>
              <button
                @click="imageModal = true"
                class="grid place-items-center p-5 rounded-lg shadow"
              >
                <span class="border border-gray-400 rounded-full p-3">
                  <PhotoIcon class="w-4 h-4"></PhotoIcon>
                </span>
                <p class="mt-2 text-sm">Image</p>
              </button>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>

    <!-- popup contents -->
    <div class="flex-auto">
      <div
        class="sticky top-[110px] bg-white shadow rounded-lg overflow-x-auto"
      >
        <div class="flex items-center justify-end gap-2">
          <button
            @click="previewModal = true"
            class="px-4 py-2 text-secondary text-sm font-medium"
          >
            Preview
          </button>
          <button
            @click="savePopup"
            class="px-4 py-2 bg-secondary text-sm font-medium text-white rounded-bl-xl"
          >
            Save
          </button>
        </div>
        <div class="grid place-items-center min-h-[calc(100vh-150px)]">
          <div
            class="relative grid place-items-center rounded-full"
            :style="{
              width: popup.width + 'px',
              height: popup.height + 'px',
              backgroundColor: popup.bg_color,
            }"
          >
            <div
              class="rounded-full border-4 border-white"
              :style="{
                width: popup.width - popup.padding + 'px',
                height: popup.height - popup.padding + 'px',
              }"
            >
              <div
                v-for="element in elements"
                :class="element.class"
                class="relative flex flex-col items-center group"
              >
                <img
                  v-if="element.type == 'image'"
                  :style="element.style"
                  :src="element.src"
                  :alt="element.alt"
                />

                <div
                  v-if="element.type == 'text'"
                  :style="element.style"
                  v-html="element.content"
                ></div>

                <input
                  v-if="element.type == 'input'"
                  class="focus:outline-none"
                  :style="element.style"
                  :type="element.inputType"
                  :placeholder="element.placeholder"
                />

                <button
                  v-if="element.type == 'button'"
                  class="btn-submit focus:outline-none"
                  :style="[btnStyle, element.style]"
                  v-html="element.content"
                ></button>
                <button
                  @click="removeElement(element)"
                  class="absolute right-12 mt-4 p-2 text-red-500 bg-gray-100 rounded-full hidden group-hover:block"
                >
                  <TrashIcon class="w-5 h-5"></TrashIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Toast
    v-if="saveSuceess"
    @close="saveSuceess = false"
    type="success"
    title="Popup saved succesfully!"
  ></Toast>

  <Popup :open="imageModal" @close="imageModal = false">
    <div class="bg-white p-8 rounded-lg">
      <Fileupload v-model="file"></Fileupload>
    </div>
  </Popup>
  <Popup :open="previewModal" @close="previewModal = false">
    <div class="grid place-items-center min-h-[calc(100vh-150px)]">
      <div
        class="relative grid place-items-center rounded-full"
        :style="{
          width: popup.width + 'px',
          height: popup.height + 'px',
          backgroundColor: popup.bg_color,
        }"
      >
        <div
          class="rounded-full border-4 border-white"
          :style="{
            width: popup.width - popup.padding + 'px',
            height: popup.height - popup.padding + 'px',
          }"
        >
          <div
            v-for="element in elements"
            :class="element.class"
            class="flex flex-col items-center group"
          >
            <img
              v-if="element.type == 'image'"
              :style="element.style"
              :src="element.src"
              :alt="element.alt"
            />

            <div
              v-if="element.type == 'text'"
              :style="element.style"
              v-html="element.content"
            ></div>

            <input
              v-if="element.type == 'input'"
              class="focus:outline-none"
              :style="element.style"
              :type="element.inputType"
              :placeholder="element.placeholder"
            />

            <button
              v-if="element.type == 'button'"
              class="btn-submit focus:outline-none"
              :style="[btnStyle, element.style]"
              v-html="element.content"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </Popup>
</template>

<style>
.btn-submit {
  background-color: var(--color);
}
.btn-submit:hover {
  background-color: var(--color-hover);
}
</style>
