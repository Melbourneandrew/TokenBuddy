<template>
  <div class="navbar">
    <div
      class="nav-icon"
      @click="
        $router.push({ path: '/pay' });
        activeIcon = activeOptions[0];
      "
    >
      <PayIconVue
        :class="{ navactive: activeIcon == activeOptions[0] }"
        :size="iconSize"
      ></PayIconVue>
    </div>
    <div
      class="nav-icon"
      @click="
        $router.push({ path: '/bank' });
        activeIcon = activeOptions[1];
      "
    >
      <BankIconVue
        :class="{ navactive: activeIcon == activeOptions[1] }"
        :size="iconSize"
      ></BankIconVue>
    </div>
    <div
      class="nav-icon"
      @click="
        $router.push({ path: '/wallet' });
        activeIcon = activeOptions[2];
      "
    >
      <WalletIconVue
        :class="{ navactive: activeIcon == activeOptions[2] }"
        :size="iconSize"
      ></WalletIconVue>
    </div>
    <div
      class="nav-icon"
      @click="
        $router.push({ path: '/profile' });
        activeIcon = activeOptions[3];
      "
    >
      <UserIconVue
        :class="{ navactive: activeIcon == activeOptions[3] }"
        :size="iconSize"
      ></UserIconVue>
    </div>
  </div>
</template>

<script setup>
import BankIconVue from "./icons/BankIcon.vue";
import PayIconVue from "./icons/PayIcon.vue";
import UserIconVue from "./icons/UserIcon.vue";
import WalletIconVue from "./icons/WalletIcon.vue";
import { ref } from "vue";
const iconSize = 40;
const activeOptions = ["PAY", "BANK", "WALLET", "PROFILE"];
const activeIcon = ref("");
</script>

<style scoped>
.navbar {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  padding: 5px;
  padding-bottom: 13px;
  display: flex;
  flex-direction: row;
  background-color: white;
}
.nav-icon {
  display: flex;
  width: 33%;
  justify-content: center;
  align-content: center;
  margin-top: 15px;
}
.navactive {
  background-color: rgba(100, 100, 111, 0.15);
  box-shadow: rgba(100, 100, 111, 0.7) 0px 7px 29px 0px;
}
</style>
