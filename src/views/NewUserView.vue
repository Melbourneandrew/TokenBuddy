<template>
  <div class="landing">
    <button v-touch class="wallet-option" @click="routeNewWallet">
      <h2>New Wallet</h2>
    </button>
    <button v-touch class="wallet-option" @click="routeImportWallet">
      <h2>Import Wallet</h2>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const texasLogo = new URL(
  "../assets/texas-outline.png",
  import.meta.url
);
const router = useRouter();
function routeNewWallet() {
  console.log("Routing to new wallet...")
  router.push({ path: "/new-wallet" });
}
function routeImportWallet() {
  console.log("Routing to import wallet...")
  // router.push({ path: "/import-wallet" });
}
</script>

<style scoped>
.landing {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 180px;
}

.wallet-option{
  margin-bottom: 50px;
}
h2{
  margin: auto;
  margin-inline: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
