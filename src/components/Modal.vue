<template>
  <div class="modal-background">
    <div class="modal-content">
      <div class="xrow">
        <CloseIcon
          class="x"
          :size="24"
          @click="closeModal"
        ></CloseIcon>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from "./icons/CloseIcon.vue";
import { useStore } from "vuex";

const store = useStore();
const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}
</script>
<style scoped>
/* The Modal (background) */
.modal-background {
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  padding-top: 200px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.xrow {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: fit-content;
  width: 100%;
}
</style>
