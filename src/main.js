import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { globalCookiesConfig } from "vue3-cookies";
import Vue3TouchEvents from "vue3-touch-events";
import {Buffer} from 'buffer'

window.Buffer = Buffer
globalCookiesConfig({
  expireTimes: "30d",
});
createApp(App)
  .use(router)
  .use(store)
  .use(Vue3TouchEvents,{
    touchClass:'active'
  })
  .mount("#app");
