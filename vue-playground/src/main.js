import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import myPlugin from "./plugins/i18nplugin";
import { pluginOptions } from "./plugins/i18nOptions";
import { router } from "./router";

//creating
const app = createApp(App);

//adding global custom directives
app.directive("focus", (e) => e.focus());

app.use(myPlugin, pluginOptions);

//use router
app.use(router);

//mounting
app.mount("#app");
