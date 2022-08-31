<template>
  <Modal @close="$emit('close')">
    <h2 class="modal-title">Select Currency</h2>
    <div class="spacer"></div>
    <div
      v-touch
      class="token-entry"
      v-for="(token, index) in tokens"
      @click="$emit('selected', token)"
    >
      <img class="token-logo" :src="token.tokenInfo.logo" />
      <div class="token-labels">
        <div class="token-name">
          {{ token.tokenInfo.name }}
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import getStoredUserInfo from "../methods/get/getStoredUserInfo";
import getTokenBalances from "../methods/get/getTokenBalances";
import Modal from "./Modal.vue";
import { ref } from "vue";

getTokens();
const tokens = ref([]);
async function getTokens() {
  const user = await getStoredUserInfo();
  tokens.value = await getTokenBalances(user.pubkey, "devnet");
}
</script>
<style scoped>
.token-entry {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding: 10px;
}
.token-logo {
  vertical-align: middle;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
.token-labels {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  padding-left: 10px;
}
.token-name {
  font-size: 25px;
  font-weight: bold;
}
.modal-title {
  margin: 5px;
}
</style>
