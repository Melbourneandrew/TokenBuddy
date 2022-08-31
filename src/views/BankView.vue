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
      <div class="transaction-list">
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
                  'ammount-label green': transaction.paidYou,
                  'ammount-label red': !transaction.paidYou,
                }"
              >
                <span v-if="transaction.paidYou">+</span>
                <span v-else>-</span>${{ transaction.ammount }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import pfp1 from "../assets/cryptopunk3.jpeg";
import pfp2 from "../assets/cryptopunk1.jpeg";
import pfp3 from "../assets/bayc1.jpeg";
import pfp4 from "../assets/cryptopunk4.png";
import pfp5 from "../assets/cryptopunk2.jpeg";

const transactions = [
  {
    pfp: pfp1,
    displayName: "Anthony Vern",
    paidYou: false,
    ammount: "45",
  },
  {
    pfp: pfp2,
    displayName: "Carson Droner",
    paidYou: false,
    ammount: "7.40",
  },
  {
    pfp: pfp3,
    displayName: "Sarah Miller",
    paidYou: true,
    ammount: "110",
  },
  {
    pfp: pfp4,
    displayName: "Usman Alam",
    paidYou: false,
    ammount: "12.22",
  },
  {
    pfp: pfp5,
    displayName: "Brodie Eldred",
    paidYou: false,
    ammount: "50",
  },
];
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

.avatar {
  vertical-align: middle;
  width: 65px;
  height: 65px;
  border-radius: 50%;
}
</style>
