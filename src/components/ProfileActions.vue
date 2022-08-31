<template>
  <div class="actions-list">
    <h2 class="actions-title">Actions</h2>
    <div class="spacer"></div>
    <div v-for="(action, index) in actions">
      <div
        class="action"
        v-touch
      >
        <p class="action-name">{{ action.name }}</p>
        <RightArrowIcon class="arrow" :size="24"></RightArrowIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import RightArrowIcon from "./icons/RightArrowIcon.vue";
const isActive = ref(-1);
const actions = [
  {
    name: "View Transactions",
    action: function () {
      console.log(this.name);
    },
  },
  {
    name: "Friends List",
    action: function () {
      console.log(this.name);
    },
  },
  {
    name: "Personal Info",
    action: function () {
      console.log(this.name);
    },
  },
  {
    name: "Linked bank accounts",
    action: function () {
      console.log(this.name);
    },
  },
];

function performAction(index) {
  return function () {
    actions[index].action();
  };
}
function setActive(index) {
  //   isActive.value = index;
  //   setTimeout(() => (isActive.value = -1), 15);
  return function () {
    isActive.value = index;
    console.log(index);
  };
}
function unsetActive(index) {
  return function () {
    isActive.value = -1;
  };
}
function something() {
  console.log("");
}
</script>
<style scoped>
.actions-list{
    margin-top: 50px;
}
.action {
  display: flex;
  align-items: center;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: left;
}
.action-name {
  margin: 0;
}
.actions-title {
  text-align: left;
  padding-left: 10px;
}
.arrow{
    align-self: center;
    justify-self: end;
    margin-left: auto;
}


</style>
