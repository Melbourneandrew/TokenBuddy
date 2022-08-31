<template>
  <div class="user-item" @click="emit('selected', props.user)">
    <div class="image-cropper">
      <img :src="props.user?.pfp" class="horizontal center" />
    </div>
    <div class="user-names">
      <div class="display-name">
        {{ props.user?.displayName }}
      </div>
      <div class="username">{{ props.user?.username }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object,
  active: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["selected"]);
</script>
<style scoped>
.user-item {
  display: flex;
  flex-direction: row;
  height: fit-content;
  padding: 15px;
}
.user-item.active {
  background-color: rgba(128, 128, 128, 0.4);
}
.user-names {
  display: flex;
  flex-direction: column;
  text-align: left;
  align-self: center;
  margin-left: 20px;
}
.display-name {
  font-weight: bold;
  font-size: 23px;
}
.username {
  margin-top: 5px;
}
</style>
