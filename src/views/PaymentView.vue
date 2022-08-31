<template>
  <div class="pay-ammount">${{ numberDisplay }}</div>
  <button
    class="currency-select"
    v-touch
    @click="showTokenSelectModal = true"
  >
    <p>{{ currencySymbol }}</p>
  </button>
  <div class="numpad">
    <div class="num-row">
      <div class="num-btn" @click="numPress(1)">1</div>
      <div class="num-btn" @click="numPress(2)">2</div>
      <div class="num-btn" @click="numPress(3)">3</div>
    </div>
    <div class="num-row">
      <div class="num-btn" @click="numPress(4)">4</div>
      <div class="num-btn" @click="numPress(5)">5</div>
      <div class="num-btn" @click="numPress(6)">6</div>
    </div>
    <div class="num-row">
      <div class="num-btn" @click="numPress(7)">7</div>
      <div class="num-btn" @click="numPress(8)">8</div>
      <div class="num-btn" @click="numPress(9)">9</div>
    </div>
    <div class="num-row">
      <div class="num-btn" @click="decimalPress()">.</div>
      <div class="num-btn" @click="numPress(0)">0</div>
      <div class="num-btn" @click="backspaceClick()">
        <BackspaceIcon :size="35"></BackspaceIcon>
      </div>
    </div>
  </div>
  <div class="btn-row">
    <button v-touch class="btn left" @click="requestClick">
      <p>Request</p>
    </button>
    <button v-touch class="btn right" @click="payClick">
      <p>Pay</p>
    </button>
  </div>
  <UserSelect
    :users="users"
    :show="showUserSelect"
    :loading="showLoadingWheel"
    @search="userSearch"
    @selected="userSelected"
    @close="showUserSelect = false"
  ></UserSelect>
  <TxConfirmModal
    @close="showConfirmModal = false"
    @confirm="performAction"
    :selectedUser="selectedUser"
    :action="selectedAction"
    :ammount="numberDisplay"
    :loading="showLoadingWheel"
    v-if="showConfirmModal"
  ></TxConfirmModal>
  <TokenSelectModal
    @close="showTokenSelectModal = false"
    @selected="changeCurrency"
    v-if="showTokenSelectModal"
  >
  </TokenSelectModal>
</template>

<script setup>
import { ref } from "vue";
import BackspaceIcon from "../components/icons/BackspaceIcon.vue";
import UserSelect from "../components/UserSelect.vue";
import getStoredLoginToken from "../methods/get/getStoredLoginToken";
import searchUsers from "../methods/searchUsers";
import fetchFriends from "../methods/fetch/fetchFriends";
import TxConfirmModal from "../components/TxConfirmModal.vue";
import TokenSelectModal from "../components/TokenSelectModal.vue";
import web3SendSOL from "../methods/web3SendSOL";
//these are the values that will be used when the transaction is comitted
let recipient, transactionToken, transactionAmmount;
//Functions to handle the number pad
const numberDisplay = ref("0");
var decimal = 0;
var moneyNumber = 0;
function numPress(num) {
  if (numberDisplay.value.length >= 6) return;
  if (decimal > 2) return;
  if (numberDisplay.value == "0" && num == 0) return;
  if (decimal != 1)
    moneyNumber = +numberDisplay.value.replace(",", "");
  else
    moneyNumber = +numberDisplay.value
      .substring(0, numberDisplay.value.length - 1)
      .replace(",", "");
  if (decimal == 0) moneyNumber = moneyNumber * 10 + num;
  else if (decimal == 1) {
    moneyNumber = moneyNumber + num / 10;
    decimal = 2;
  } else if (decimal == 2) {
    moneyNumber = moneyNumber + num / 100;
    decimal++;
  }

  numberDisplay.value = moneyNumber.toLocaleString("en-US");
}
function decimalPress() {
  if (numberDisplay.value.length >= 4) return;
  if (decimal != 0) return;
  decimal = 1;
  numberDisplay.value = numberDisplay.value.concat(".");
}
function backspaceClick() {
  if (numberDisplay.value == "0") return;
  if (numberDisplay.value.length == 1)
    return (numberDisplay.value = "0");
  numberDisplay.value = numberDisplay.value.substring(
    0,
    numberDisplay.value.length - 1
  );
  if (decimal > 0) decimal--;
}

//Functions to handle the pay/request buttons
var actionOptions = ["PAY", "REQUEST"];
const selectedAction = ref(actionOptions[0]);
async function requestClick() {
  selectedAction.value = actionOptions[1];
  openUserSelect();
}
function payClick() {
  selectedAction.value = actionOptions[0];
  openUserSelect();
}

//Functions to handle currency selection
const showTokenSelectModal = ref(false);
//this is what is prefixed before the big number
const currencySymbol = ref("USD");
//this displays the max the user can send of that token
const tokenBalance = ref("");
async function changeCurrency(token) {
  console.log(token);
  currencySymbol.value = token.tokenInfo.symbol;
  tokenBalance.value = token.balance;
  transactionToken = token;
  showTokenSelectModal.value = false;
}
const showUserSelect = ref(false);
const showLoadingWheel = ref(false);
const showConfirmModal = ref(false);
const users = ref([]);
const selectedUser = ref({});
var friends;
async function openUserSelect() {
  showLoadingWheel.value = true;
  showUserSelect.value = true;

  let token = await getStoredLoginToken();
  let friendsRes = await fetchFriends(token);
  showLoadingWheel.value = false;

  users.value = friendsRes.data.friends;
  friends = friendsRes.data.friends;
}
async function userSearch(searchStr) {
  if (searchStr == "") return (users.value = friends);
  showLoadingWheel.value = true;

  let searchResults = await searchUsers(searchStr);
  showLoadingWheel.value = false;

  users.value = searchResults.data.results;
}
async function userSelected(user) {
  selectedUser.value = user;
  showConfirmModal.value = true;
}
async function performAction() {
  console.log("Perform action");
  recipient = selectedUser.value;
  transactionAmmount = +numberDisplay.value;
  if (selectedAction.value == "PAY") {
    payAction();
  }
  if (selectedAction.value == "REQUEST") {
    console.log("Request User");
  }
}
async function payAction() {
  console.log(recipient, transactionAmmount, transactionToken);
  if (transactionToken.mint == "SOL") {
    showLoadingWheel.value = true;
    await web3SendSOL(
      recipient.pubkey,
      transactionAmmount,
      "devnet"
    );
    showConfirmModal.value = false;
    showLoadingWheel.value = false;
  }
}
</script>

<style scoped>
.pay-ammount {
  font-size: 80px;
  font-weight: bold;
  margin-top: 80px;
}
.currency-select {
  font-size: 14px;
  width: fit-content;
  height: fit-content;
}
.numpad {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: auto;
  margin-top: 10px;
}

.num-row {
  display: flex;
  flex-direction: row;
}

.num-btn {
  display: flex;
  margin: 10px;
  margin-right: 40px;
  margin-left: 40px;
  text-align: center;
  font-size: 55px;
  width: 32px;
  align-items: center;
  justify-content: center;
}

.num-btn.zero {
  margin: auto;
}
.btn-row {
  display: flex;
  flex-direction: row;
  margin-top: 40px;
}
.btn {
  margin: 5px;
  width: 200px;
}
</style>
