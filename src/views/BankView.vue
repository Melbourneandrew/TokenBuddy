<template>
  <div class="home">
    <div class="balance">
      <p class="balance-label">Balance:</p>
      <h1>$5,000</h1>
      <div class="balance-buttons">
        <button v-touch class="balance-btn left">
          <p>Buy tokens</p>
        </button>
        <button v-touch class="balance-btn right">
          <p>Cash out</p>
        </button>
      </div>
    </div>
    <div class="transactions">
      <h2>Transactions:</h2>
      <div class="spacer"></div>
      <div v-if="showLoadingWheel" class="lds-dual-ring"></div>
      <div v-else class="transaction-list">
        <div
          v-for="(transaction, index) in transactions"
          :key="index"
        >
          <div class="transaction">
            <div class="image-cropper">
              <img
                class="horizontal center"
                :src="transaction.pfp"
              />
            </div>
            <div class="display-name">
              <p>{{ transaction.displayName }}</p>
            </div>
            <div class="ammount">
              <p
                v-bind:class="{
                  'ammount-label green': transaction.incoming,
                  'ammount-label red': !transaction.incoming,
                }"
              >
                <span v-if="transaction.incoming">+</span>
                <span v-else>-</span>{{transaction.tokenSymbol}} {{ transaction.tokenAmmount }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import fetchTransactions from "../methods/fetch/fetchTransactions";
import { ref } from "vue";
import getStoredUserInfo from "../methods/get/getStoredUserInfo";

const transactions = ref([]);
const showLoadingWheel = ref(false);
assembleTxList();
async function assembleTxList() {
  const client = await getStoredUserInfo();
  const fetchTx = await fetchTransactions();
  const txs = fetchTx.data.txs;
  console.log(txs);
  //designate transactions as outgoing or incoming
  for (let tx of txs) {
    console.log(tx);
    //client is reciever
    if (tx.reciever._id == client._id) {
      tx.incoming = true;
      tx.pfp = tx.sender.pfp;
      tx.displayName = tx.sender.displayName;
    }
    //client is sender
    if (tx.sender._id == client._id) {
      tx.incoming = false;
      tx.pfp = tx.reciever.pfp;
      tx.displayName = tx.reciever.displayName;
    }
  }
  transactions.value = txs.reverse();
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
h1 {
  margin-top: 5px;
  margin-bottom: 10px;
}
.balance {
  width: 90%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 20px;
  margin: auto;
  padding-top: 10px;
}
.balance-buttons {
  display: flex;
  flex-direction: row;
}
.balance-btn {
  width: 45%;
  margin: 10px;
}
.balance-btn.right {
  margin-left: 5px;
}
.balance-btn.left {
  margin-right: 5px;
}
h2 {
  margin-right: auto;
}
.transactions {
  display: flex;
  flex-direction: column;
}
.transaction-list {
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
  margin-bottom: 50px;
}
.transaction {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
}
.display-name {
  align-self: center;
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
}
.ammount {
  align-self: center;
  justify-self: flex-end;
  margin-left: auto;
  margin-right: 10px;
  width: fit-content;
  font-weight: bold;
}
.ammount-label.red {
  color: red;
}
.ammount-label.green {
  color: green;
}

</style>
