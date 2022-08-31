<template>
  <div class="user-selection">
    <transition name="slide">
      <div v-if="show" class="select-menu">
        <div class="xrow">
          <CloseIcon
            class="x"
            :size="32"
            @click="closeMenu"
          ></CloseIcon>
        </div>
        <div class="search-input">
          <input v-model="search" placeholder="Search users" />
        </div>
        <div
          v-if="showLoadingWheel"
          class="lds-dual-ring"
        ></div>
        <div v-else class="user-list">
          <div v-for="(user, index) in users">
            <div class="user-item" @click="selectUser(user)">
              <div class="image-cropper">
                <img
                  :src="user.pfp"
                  class="horizontal center"
                />
              </div>
              <div class="user-names">
                <div class="display-name">
                  {{ user.displayName }}
                </div>
                <div class="username">{{ user.username }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import CloseIcon from "./icons/CloseIcon.vue";
import { ref, computed, watch } from "vue";

const emit = defineEmits(["search", "selected", "close"]);
const props = defineProps({
  users: Array,
  show: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const show = computed(() => props.show);
const showLoadingWheel = computed(() => props.loading);
const users = computed(() => props.users);
const search = ref("");
function selectUser(user) {
  emit("selected", user);
}
function closeMenu() {
  emit("close");
}
async function updateSearchResults(now, before) {
  emit("search", now);
}
watch(search, updateSearchResults);
</script>
<style scoped>
.user-selection {
  display: flex;
  flex-direction: column;
}
.xrow {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: fit-content;
  width: 100%;
  margin-top: 80px;
}
.x {
  margin-right: 20px;
}
.search-input {
  border: 2px solid black;
  border-radius: 50px;
  width: 330px;
  height: 50px;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
}
input {
  margin: auto;
  width: 90%;
  height: 50%;
  border-width: 0px;
  outline: none;
  font-size: 18px;
}

input:focus {
  height: 60%;
  border-bottom: 1px solid rgba(220, 220, 220, 0.6);
  outline: none !important;
}
.user-list {
  width: 100vw;
  height: fit-content;
}
.user-item {
  display: flex;
  flex-direction: row;
  height: fit-content;
  padding: 15px;
}
.user-item.active {
  background-color: rgba(128, 128, 128, 0.4);
}
.user-names {
  display: flex;
  flex-direction: column;
  text-align: left;
  align-self: center;
  margin-left: 20px;
}
.display-name {
  font-weight: bold;
  font-size: 23px;
}
.username {
  margin-top: 5px;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
  transition: all 150ms ease-in 0s;
}
.select-menu {
  overflow-y: auto;
  background-color: white;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1;
  width: 100%;
}
</style>
