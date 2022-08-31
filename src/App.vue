<script setup>
import { computed } from "vue";
import NavBar from "./components/NavBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const meta = computed(() => route.meta);
</script>

<template>
  <div class="iphone-notch-spacer"></div>
  <router-view />
  <NavBar
    v-if="
      route.meta.showNavBar ||
      route.meta.showNavBar === undefined
    "
  ></NavBar>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap");

* {
  font-family: "Montserrat", sans-serif;
}
html,
body {
  max-width: 100%;
  overflow-x: hidden;
}
button {
  background-color: transparent !important;
  width: fit-content;
  min-height: 45px;
  color: black;
  font-size: 20px;
  border: 2px solid black;
  border-radius: 50px;
  margin: auto;
  margin-top: 25px;
  display: flex;
}
.active {
  background-color: rgba(128, 128, 128, 0.5) !important;
}
.spacer {
  width: 100%;
  height: 2px;
  background-color: black;
}
p {
  margin: auto;
  font-size: 20px;
}
p.error-message {
  color: crimson;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
}

.iphone-notch-spacer {
  width: 100%;
  height: 40px;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: auto;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid black;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.image-cropper {
  width: 55px;
  height: 80px;
  position: relative;
  overflow: hidden;
  border-radius: 50%/30%;
  /* border: 2px solid #f00; */
}

/* Common img styles in web dev environments */
img {
  height: auto;
  max-width: 100%;
}

/* Center image inside of parent */
img.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* For horizontal rectangles */
img.horizontal {
  height: 100%;
  width: auto;
  max-width: 9999px; /* max-content fall back */
  max-width: max-content;
}
</style>
