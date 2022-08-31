<template>
  <div class="profile">
    <div class="account-card">
      <div class="profile-row">
        <div class="image-cropper big">
          <img :src="pfp" class="horizontal center" />
        </div>
        <div class="user-names">
          <div class="display-name">{{ displayName }}</div>
          <div class="username">{{ username }}</div>
          <p class="pk-label">Pubkey:</p>
          <div class="pubkey" @click="copyKey">
            {{ pubkey.substring(0, 17) }}...
          </div>
        </div>
      </div>
      <div class="btn-row">
        <button v-touch class="icon-btn">
          <SettingsIcon :size="iconSize"></SettingsIcon>
        </button>
        <button v-touch class="icon-btn">
          <ShareIcon :size="iconSize"></ShareIcon>
        </button>
        <button
          v-touch
          class="icon-btn"
          @click="openFriendSelect"
        >
          <AddFriendIcon :size="iconSize"></AddFriendIcon>
        </button>
      </div>
    </div>
    <ProfileActions></ProfileActions>
    <UserSelect
      :users="users"
      :show="showFriendSelect"
      @search="search"
      @selected="friendSelected"
      @close="closeFriendSelect"
    ></UserSelect>
    <Modal @close="closeModal" v-if="showModal">
      <UserListItem :user="selectedFriend"></UserListItem>
      <button v-touch @click="addSelectedFriend">
        <p>Add friend</p>
      </button>
      <p class="error-message">{{ modalErrorMessage }}</p>
    </Modal>
  </div>
</template>

<script setup>
import UserSelect from "../components/UserSelect.vue";
import { onBeforeMount, ref } from "vue";
import searchUsers from "../methods/searchUsers";
import Modal from "../components/Modal.vue";
import UserListItem from "../components/UserListItem.vue";
import getStoredLoginToken from "../methods/get/getStoredLoginToken";
import addFriend from "../methods/addFriend.js";
import getStoredUserInfo from "../methods/get/getStoredUserInfo";
import SettingsIcon from "../components/icons/SettingsIcon.vue";
import ShareIcon from "../components/icons/ShareIcon.vue";
import AddFriendIcon from "../components/icons/AddFriendIcon.vue";
import ProfileActions from "../components/ProfileActions.vue";

const pfp = ref();
const displayName = ref();
const username = ref();
const pubkey = ref();
const iconSize = 28;
onBeforeMount(() => {
  getStoredUserInfo().then((user) => {
    console.log(user);
    pfp.value = user.pfp;
    displayName.value = user.displayName;
    username.value = user.username;
    pubkey.value = user.pubkey;
  });
});
const showFriendSelect = ref(false);

const modalErrorMessage = ref("");
const selectedFriend = ref({});
const users = ref([]);
async function search(searchStr) {
  let searchResults = await searchUsers(searchStr);
  // console.log(searchResults.data.results)
  users.value = searchResults.data.results;
  // console.log(users.value);
}

const showModal = ref(false);
function closeModal() {
  showModal.value = false;
  modalErrorMessage.value = "";
}
const openFriendSelect = () => (showFriendSelect.value = true);
const closeFriendSelect = () =>
  (showFriendSelect.value = false);
async function friendSelected(friend) {
  console.log(friend);
  selectedFriend.value = friend;
  showModal.value = true;
}
async function addSelectedFriend() {
  const token = await getStoredLoginToken();
  const friendUsername = selectedFriend.value.username;
  console.log(friendUsername);
  try {
    const addFriendRes = await addFriend(token, friendUsername);
    console.log(addFriendRes);
  } catch (e) {
    console.log(e);
    modalErrorMessage.value = e.response.data.e;
  }
}

function copyKey() {
  navigator.clipboard.writeText(pubkey);
}
</script>
<style scoped>
.account-card {
  width: 90%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 20px;
  margin: auto;
  margin-top: 20px;
}
.profile-row {
  display: flex;
  flex-direction: row;
  text-align: left;
}
.user-names {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;
  margin-top: 30px;
}

.display-name {
  font-size: 30px;
  font-weight: bold;
}

.username {
  font-size: 18px;
  margin-top: 8px;
}
.pk-label{
  font-size: 16px;
  margin: 0;
  margin-top: 16px;
}
.pubkey {
  text-decoration: underline;
  color: gray;
}

.btn-row {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
}
.icon-btn {
  width: fit-content;
  height: fit-content;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
}
.image-cropper.big {
  width: 100px;
  height: 170px;
  min-width: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 50%/30%;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  /* border: 2px solid #f00; */
}
</style>
