<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import Fileupload from "../components/Fileupload.vue";
import Toast from "../components/Toast.vue";
import Popup from "../components/Popup.vue";
import DragIcon from "../components/icons/Drag.vue";
import {
  ChevronUpIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
  CursorArrowRippleIcon,
  PhotoIcon,
  TrashIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from "@heroicons/vue/24/solid";

let imageModal = ref(false);
let previewModal = ref(false);
let saveSuceess = ref(false);
let image = ref(null);
let openMenu = ref(null);
let device = ref("desktop");

let popup = reactive({});
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
  initDraggable();
});

function openActionMenu(id) {
  openMenu.value = id;
}

function savePopup() {
  try {
    localStorage.setItem(getPopupStorageKey(), JSON.stringify(popup));
    localStorage.setItem(getElementsStorageKey(), JSON.stringify(elements));

    saveSuceess.value = true;
  } catch (error) {
    console.log(error);
  }
}

function setPopupData() {
  let savedPopup = localStorage.getItem(getPopupStorageKey());

  if (!savedPopup) {
    if (device.value == "desktop") {
      return Object.assign(popup, {
        width: 500,
        height: 500,
        bg_color: "#df795e",
        btn_color: "#414142",
        btn_hover_color: "#7661df",
        padding: 16,
        constrains: true,
      });
    } else {
      return Object.assign(popup, {
        width: 350,
        height: 350,
        bg_color: "#df795e",
        btn_color: "#414142",
        btn_hover_color: "#7661df",
        padding: 8,
        constrains: true,
      });
    }
  }

  try {
    Object.assign(popup, JSON.parse(savedPopup));
  } catch (error) {
    console.log(error);
  }
}

function setPopupElements() {
  let savedElements = localStorage.getItem(getElementsStorageKey());

  elements.length = 0;

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
  if (device.value == "desktop") {
    return [
      {
        id: uniqueId(),
        type: "image",
        src: "/stars.png",
        alt: "stars",
        position: {
          position: "absolute",
          top: "30px",
          left: "160px",
        },
        style: {
          width: "145px",
          height: "45px",
        },
      },
      {
        id: uniqueId(),
        type: "text",
        content:
          "All the text and elements in this popup should be editable and draggable",
        position: {
          position: "absolute",
          top: "100px",
          left: "60px",
        },
        style: {
          width: "354px",
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
        position: {
          position: "absolute",
          top: "230px",
          left: "60px",
        },
        style: {
          width: "354px",
          padding: "12px 16px",
          borderRadius: "16px",
        },
      },
      {
        id: uniqueId(),
        type: "button",
        content: "Signup Now",
        position: {
          position: "absolute",
          top: "300px",
          left: "60px",
        },
        style: {
          width: "354px",
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
        position: {
          position: "absolute",
          top: "360px",
          left: "90px",
        },
        style: {
          color: "#fff",
          margingTop: "10px",
        },
      },
    ];
  }

  return [
    {
      id: uniqueId(),
      type: "image",
      src: "/stars.png",
      alt: "stars",
      position: {
        position: "absolute",
        top: "20px",
        left: "90px",
      },
      style: {
        width: "145px",
        height: "45px",
      },
    },
    {
      id: uniqueId(),
      type: "text",
      content:
        "All the text and elements in this popup should be editable and draggable",
      position: {
        position: "absolute",
        top: "80px",
        left: "15px",
      },
      style: {
        width: "300px",
        textAlign: "center",
        color: "#fff",
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    {
      id: uniqueId(),
      type: "input",
      inputType: "email",
      placeholder: "E-mail",
      position: {
        position: "absolute",
        top: "185px",
        left: "25px",
      },
      style: {
        width: "280px",
        padding: "10px 12px",
        borderRadius: "16px",
      },
    },
    {
      id: uniqueId(),
      type: "button",
      content: "Signup Now",
      position: {
        position: "absolute",
        top: "250px",
        left: "90px",
      },
      style: {
        width: "150px",
        padding: "10px 12px",
        borderRadius: "16px",
        textTransform: "uppercase",
        color: "#fff",
        fontSize: "16px",
        fontWeight: 700,
      },
    },
  ];
}

function getPopupStorageKey() {
  return device.value == "desktop" ? "popup" : "mobile_popup";
}
function getElementsStorageKey() {
  return device.value == "desktop" ? "elements" : "mobile_elements";
}

function addText() {
  let element = {
    id: uniqueId(),
    type: "text",
    content: "Sample text",
    position: {
      position: "absolute",
      top: getPosition(),
      left: getPosition(),
    },
    style: {
      width: "354px",
      textAlign: "center",
      color: "#fff",
      fontSize: "26px",
      fontWeight: "bold",
    },
  };
  if (device.value == "mobile") {
    element.style.width = "300px";
    element.style.fontSize = "16px";
  }
  elements.push(element);

  initDraggable();
}

function addButton() {
  let element = {
    id: uniqueId(),
    type: "button",
    content: "Signup Now",
    position: {
      position: "absolute",
      top: getPosition(),
      left: getPosition(),
    },
    style: {
      width: "354px",
      padding: "12px 16px",
      borderRadius: "16px",
      textTransform: "uppercase",
      color: "#fff",
      fontSize: "16px",
      fontWeight: 700,
    },
  };

  if (device.value == "mobile") {
    element.style.width = "150px";
  }

  elements.push(element);

  initDraggable();
}

async function addImage() {
  let convertedFile = await toBase64();

  if (!convertedFile) return;

  elements.push({
    id: uniqueId(),
    type: "image",
    src: convertedFile,
    alt: "stars",
    position: {
      position: "absolute",
      top: getPosition(),
      left: getPosition(),
    },
    style: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
    },
  });

  initDraggable();

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
    reader.readAsDataURL(image.value);
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

function initDraggable() {
  nextTick(() => {
    let elements = document.querySelectorAll(".draggable");

    for (let i = 0; i < elements.length; i++) {
      draggable(elements[i]);
    }
  });
}

function draggable(draggableElem) {
  let initialX = 0;
  let initialY = 0;
  let moveElement = false;

  draggableElem.addEventListener("mousedown", (e) => {
    e.preventDefault();
    //initial x and y points
    initialX = e.clientX;
    initialY = e.clientY;

    //Start movement
    moveElement = true;
  });

  draggableElem.addEventListener("mousemove", (e) => {
    e.preventDefault();

    let element = elements.find((element) => element.id == draggableElem.id);

    //if movement == true then set top and left to new X andY while removing any offset
    if (moveElement && element) {
      element.position.top =
        draggableElem.offsetTop - (initialY - e.clientY) + "px";
      element.position.left =
        draggableElem.offsetLeft - (initialX - e.clientX) + "px";
      initialX = e.clientX;
      initialY = e.clientY;
    }
  });

  draggableElem.addEventListener("mouseup", (e) => (moveElement = false));
  draggableElem.addEventListener("mouseleave", (e) => (moveElement = false));
}

function getPosition() {
  return Math.floor(Math.random() * 100) + "px";
}

function switchDevice(screen) {
  savePopup();
  device.value = screen;
  setPopupData();
  setPopupElements();
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
  () => image.value,
  (newVal) => {
    if (newVal) {
      addImage();
    }
  }
);
</script>

<template>
  <div class="lg:flex gap-7 px-6 lg:px-8 pt-7 obje">
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
    <div class="flex-auto w-full">
      <div
        class="sticky top-[110px] bg-white shadow rounded-lg overflow-x-auto"
      >
        <div class="flex items-center justify-between p-2">
          <div class="flex items-center gap-6 text-xs">
            <button
              @click="switchDevice('mobile')"
              class="grid place-items-center hover:text-secondary"
              :class="{ 'text-secondary': device == 'mobile' }"
            >
              <DevicePhoneMobileIcon class="w-5 h-5"></DevicePhoneMobileIcon>
              <span>Phone</span>
            </button>
            <button
              @click="switchDevice('desktop')"
              class="grid place-items-center hover:text-secondary"
              :class="{ 'text-secondary': device == 'desktop' }"
            >
              <ComputerDesktopIcon class="w-5 h-5"></ComputerDesktopIcon>
              <span>Desktop</span>
            </button>
          </div>
          <div class="flex items-center gap-2 hover:text-primary">
            <button
              @click="previewModal = true"
              class="px-4 py-2 text-secondary text-sm font-medium"
            >
              Preview
            </button>
            <button
              @click="savePopup"
              class="px-4 py-2 bg-secondary text-sm font-medium text-white rounded-bl-lg rounded-tr-lg"
            >
              Save
            </button>
          </div>
        </div>
        <div
          @click.stop="openMenu = false"
          :class="{ 'mobile-device': device == 'mobile' }"
          class="relative grid place-items-center min-h-[calc(100vh-150px)]"
        >
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
                :id="element.id"
                :class="[
                  'draggable',
                  element.id == openMenu
                    ? 'border-secondary bg-secondary/10'
                    : 'border-transparent ',
                ]"
                :style="element.position"
                @click.stop="openActionMenu(element.id)"
                class="flex flex-col items-center border-2 p-2 border-dashed rounded-sm"
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
                  @mousedown.stop
                />

                <button
                  v-if="element.type == 'button'"
                  class="btn-submit focus:outline-none"
                  :style="[btnStyle, element.style]"
                  v-html="element.content"
                  @mousedown.stop
                ></button>
                <div
                  v-show="openMenu == element.id"
                  class="absolute -bottom-8 -right-12 z-10 flex items-center gap-1"
                >
                  <button class="p-2 text-red-500 bg-gray-100 rounded-full">
                    <DragIcon class="w-6 h-6"></DragIcon>
                  </button>
                  <button
                    @click="removeElement(element)"
                    class="p-2 text-red-500 bg-gray-100 rounded-full"
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
  </div>

  <Toast
    v-if="saveSuceess"
    @close="saveSuceess = false"
    type="success"
    title="Popup saved succesfully!"
  ></Toast>

  <Popup :open="imageModal" @close="imageModal = false">
    <div class="bg-white p-8 rounded-lg">
      <Fileupload v-model="image"></Fileupload>
    </div>
  </Popup>

  <Popup :open="previewModal" @close="previewModal = false">
    <div class="relative grid place-items-center min-h-[calc(100vh-150px)]">
      <div
        class="grid place-items-center rounded-full"
        :style="{
          position: 'absolute',
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
            :id="element.id"
            :style="element.position"
            class="flex flex-col items-center p-2"
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

<style scoped>
.btn-submit {
  background-color: var(--color);
}
.btn-submit:hover {
  background-color: var(--color-hover);
}
.mobile-device {
  max-width: calc(443px - 2 * 12px);
  height: calc(698px - 2 * 12px + 43px);
  position: relative;
  padding-top: 43px;
  margin: auto;
  border: 12px solid #000;
  border-radius: 50px;
  margin-bottom: 20px;
}
.mobile-device:before {
  content: "";
  background: #000;
  width: 180px;
  height: 28px;
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 15px 15px;
}
.mobile-device:after {
  content: "";
  display: block;
  background: #000;
  width: calc(180px + 2 * 15px);
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  height: 15px;
  --mask: radial-gradient(15px at 15px 100%, #0000 98%, #000) calc(-1 * 15px);
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
</style>
