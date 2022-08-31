<template>
  <Modal @close="$emit('close')">
    <h2>You want to {{ action }}</h2>
    <UserListItem class="user" :user="user"></UserListItem>
    <h1>${{ ammount }}</h1>
    <div v-if="showLoadingWheel" class="lds-dual-ring"></div>
    <button v-touch v-else @click="$emit('confirm')">
      <p>Confirm</p>
    </button>
  </Modal>
</template>

<script setup>
import Modal from "./Modal.vue";
import UserListItem from "./UserListItem.vue";
import { computed } from "vue";
const props = defineProps({
  selectedUser: Object,
  action: String,
  ammount: String,
  showLoadingWheel: Boolean
});
const user = computed(() => props.selectedUser);
const action = computed(() => props.action);
const ammount = computed(() => props.ammount);
const showLoadingWheel = computed(() => props.showLoadingWheel)
</script>
<style scoped>
.user {
  border: 2px black solid;
  border-radius: 15px;
}
</style>
