<template>
<div class="login-test">
    <button v-touch @click="performLogin">
        <p>Login</p>
    </button>
</div>
</template>

<script setup>
import login from '../methods/login';
import getStoredKeypair from '../methods/get/getStoredKeypair';
import getStoredUserInfo from '../methods/get/getStoredUserInfo';
import storeUserInfo from '../methods/store/storeUserInfo';
async function performLogin(){
    const kp = await getStoredKeypair();
    const [token, user] = await login(kp);

    console.log(token)
    console.log(user);

    await storeUserInfo(user)
    const userInfo = await getStoredUserInfo()

    console.log(userInfo)
}
</script>
<style scoped>

</style>