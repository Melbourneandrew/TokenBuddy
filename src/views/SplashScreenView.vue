<template>
  <div class="splash-screen">
    <img class="logo" src="/MONEY-STACK.png" />
  </div>
</template>

<script setup>
import getStoreKeys from "../methods/get/getStoreKeys.js";
import { useRouter } from "vue-router";
const router = useRouter();

setTimeout(checkStore, 1000);

async function checkStore() {
  const storedKeys = await getStoreKeys();
  if (storedKeys.includes("privKey"))
    router.push({ path: "/pay" });
  else router.push({ path: "/new-user" });
}
</script>
<style scoped>
.splash-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 235px;
}
@keyframes expand {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
.logo {
  height: 250px;
  width: 250px;
  animation: expand 1s;
}

</style>
