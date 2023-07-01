import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { VTooltip } from "floating-vue";
import "./style.css";
import "floating-vue/dist/style.css";

const app = createApp(App);

app.use(router);

app.directive("tooltip", VTooltip);

app.mount("#app");
