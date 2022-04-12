import { createApp } from "vue";
import App from "./App.vue";
import "mapbox-gl/dist/mapbox-gl.css";
import "./assets/styles/index.scss";
import router from "./components/Routes";
createApp(App).use(router).mount("#app");
