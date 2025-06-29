import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./permissions";
import { createPinia } from "pinia";
import { Quasar, Dark } from "quasar";
import quasarIconSet from "quasar/icon-set/material-icons";
// styles
import "./assets/styles/main.sass";
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const app = createApp(App);
// Global properties
app.use(Quasar, {
    plugins: {
        Dark,
    },
    iconSet: quasarIconSet,
});
app.use(createPinia());
app.use(router);
app.mount("#app");
