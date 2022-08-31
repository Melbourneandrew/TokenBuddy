<template>
  <div class="signup">
    <h1>Signup</h1>
    <p>Enter the unique name people will use to find you</p>
    <div class="signup-input">
      <input v-model="username" placeholder="Username" />
    </div>
    <p>Enter the name that will be displayed when people search for you</p>
    <div class="signup-input">
      <input v-model="displayName" placeholder="Display Name" />
    </div>
    <p class="error-message">{{ errorMessage }}</p>
    <div v-if="showLoadingWheel" class="lds-dual-ring"></div>
    <p v-if="showLoadingWheel">Signing up... this will take a moment.</p>
    <button v-touch v-if="!showLoadingWheel" @click="submitSignup" class="signup-btn">
      <p>Sign Up</p>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import getStoredKeypair from "../methods/get/getStoredKeypair.js";
import getStoredLoginToken from "../methods/get/getStoredLoginToken.js";
import storeLoginToken from "../methods/store/storeLoginToken.js";
import signup from "../methods/signup.js";
import login from "../methods/login.js";
import { useRouter } from "vue-router";
import storeUserInfo from "../methods/store/storeUserInfo";
const username = ref("");
const displayName = ref("");
const errorMessage = ref("");
const showLoadingWheel = ref(false);

const router = useRouter();

async function submitSignup() {
  try {
    showLoadingWheel.value = true;

    const keypair = await getStoredKeypair();
    await signup(keypair, username.value, displayName.value);
    const [token, user] = await login(keypair);
    await storeLoginToken(token);
    await storeUserInfo(user);

    router.push({ path: "/new-pfp" });
  } catch (e) {
    console.log(e);
    showLoadingWheel.value = false;
    if (e.response?.data?.e != null) errorMessage.value = e.response?.data?.e;
    else errorMessage.value = e;
    return;
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}

.signup {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.signup-input {
  border: 2px solid black;
  border-radius: 50px;
  width: 330px;
  height: 50px;
  margin: auto;
  margin-bottom: 40px;
  margin-top: 10px;
  display: flex;
}

input {
  margin: auto;
  width: 90%;
  height: 50%;
  border-width: 0px;
  outline: none;
  font-size: 18px;
}

input:focus {
  height: 60%;
  border-bottom: 1px solid rgba(220, 220, 220, 0.6);
  outline: none !important;
}

.signup-btn {
  margin-top: 150px;
  width: 80%;
  height: fit-content;
}
</style>