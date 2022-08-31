<template>
  <div class="new-wallet">
    <h1>New wallet created</h1>
    <h2>Below is the seed phrase for your brand-new wallet!</h2>
    <div class="seed-phrase">
      <p>{{ seedPhrase }}</p>
    </div>
    <p class="instructions">
      This seed phrase will not be shown again and is the only way to recover
      your account if it is lost. Please record it in a safe place now.
    </p>
    <button v-touch @click="routeToSignup" class="continue-btn"><p>Continue</p></button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import generateSeed from "../methods/generateSeed.js";
import generateKeypair from "../methods/generateKeypair.js";
import storeKeypair from "../methods/store/storeKeypair.js"
import router from "../router/index.js";

const store = useStore();
const seedPhrase = ref("");

const { mnemonic, seed } = generateSeed();
const keypair = generateKeypair(seed);

seedPhrase.value = mnemonic;

async function routeToSignup(){
  console.log("Routing to signup")
  await storeKeypair(keypair);
  router.push({path:'/signup'});
}
</script>

<style scoped>
.new-wallet {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.seed-phrase {
  margin-top: 25px;
  text-decoration: underline;
  padding-inline: 35px 35px;
}
.instructions {
  margin-top: 50px;
  font-weight: bold;
}
.continue-btn{
  margin-top: 200px;
}
</style>