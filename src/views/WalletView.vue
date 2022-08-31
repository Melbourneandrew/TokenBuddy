<template>
  <div class="wallet">
    <div class="wallet-card">
      <WalletIcon :size="64"></WalletIcon>
      <div class="wallet-labels">
        <div class="wallet-name">Main Wallet</div>
        <div class="wallet-key" @click="copyKey">
          {{ pubkey.substring(0, 20) }}...
        </div>
      </div>
    </div>
    <div class="token-list">
      <h2 class="token-title">Tokens</h2>
      <div class="spacer"></div>
      <div
        class="token-entry"
        v-for="(token, index) in tokenBalances"
      >
        <img class="token-logo" :src="token.tokenInfo.logo" />
        <div class="token-labels">
          <div class="token-name">
            {{ token.tokenInfo.name }}
          </div>
          <div class="token-bal">
            {{ token.balance }} {{ token.tokenInfo.symbol }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WalletIcon from "../components/icons/WalletIcon.vue";
import getStoredUserInfo from "../methods/get/getStoredUserInfo";
import getTokenBalances from "../methods/get/getTokenBalances";
import { ref } from "vue";

main();
const pubkey = ref("");
const tokenBalances = ref([]);
async function main() {
  await getUserInfo();
  await getBalances();
}
var userInfo = {};
async function getUserInfo() {
  userInfo = await getStoredUserInfo();
  pubkey.value = userInfo.pubkey;
  console.log(userInfo);
}
async function getBalances() {
  const balances = await getTokenBalances(
    pubkey.value, 'devnet'
  );
  const sortedBalances = balances.sort((a, b) => {
    if (a.balance < b.balance) return 1;
    if (a.balance > b.balance) return -1;
    return 0;
  });

  tokenBalances.value = sortedBalances
}
function copyKey() {
  navigator.clipboard.writeText(pubkey.value);
}
</script>
<style scoped>
.wallet {
  display: flex;
  flex-direction: column;
}
.wallet-card {
  display: flex;
  flex-direction: row;
  height: fit-content;
  width: 90%;
  border: 2px solid black;
  border-radius: 20px;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
}
.wallet-labels {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  text-align: left;
}
.wallet-name {
  font-size: 30px;
  font-weight: bold;
}
.wallet-key {
  text-decoration: underline;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
}
.token-list {
  margin-top: 30px;
  /*Space for scrolling */
  margin-bottom: 70px;
}
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
  padding-left: 10px;
}
.token-name {
  font-size: 20px;
  font-weight: bold;
}
.token-bal {
  color: gray;
}
.token-title {
  text-align: left;
  padding-left: 10px;
}
</style>
