import { createStore } from "vuex";
import { Preferences } from "@capacitor/preferences";
import { Keypair } from "@solana/web3.js";
export default createStore({
  state: {},
  getters: {},
  mutations: {
    SET_LOGIN_TOKEN(state, token) {
      state.loginToken = token;
    },
    SET_KEYPAIR(state, keypair) {
      state.keypair = keypair
    }
  },
  actions: {
    async storeKeypair({commit}, keypair){

      commit("SET_KEYPAIR", keypair);
      let privKey = keypair.secretKey();
      privKey = TextDecoder("utf-8").decode(privKey);
      await Preferences.set({
        key: "privKey",
        value: privKey
      })
    },
    async getStoredKeypair(){
        let privKey = await Preferences.get({key: 'privKey'})
        privKey = TextDecoder("utf-8").encode(privKey)
        return Keypair.fromSecretKey(privKey);
    },
    async storeLoginToken({ commit }, token) {
      commit("SET_LOGIN_TOKEN", token);
      await Preferences.set({
        key: "loginToken",
        value: token,
      });
    },
    async getLoginToken({ commit }) {
      if (this.state.loginToken !== undefined) return this.state.loginToken;

      let token = await Preferences.get({
        key: "loginToken",
      });
      commit("SET_LOGIN_TOKEN", token);
      return token;
    },
  },
  modules: {},
});
