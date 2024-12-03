import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import myPlugin from "./plugins/i18nplugin";
import { pluginOptions } from "./plugins/i18nOptions";

//creating
const app = createApp(App);

//adding global custom directives
app.directive("focus", (e) => e.focus());

app.use(myPlugin, pluginOptions);

//mounting
app.mount("#app");
