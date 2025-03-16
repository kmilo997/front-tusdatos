<template>
  <v-app>
    <v-main class="main-app">
      <NavBar></NavBar>
      <div class="d-flex flex-row main-app__container">
        <OptionsMenu v-if="isLoggedIn"></OptionsMenu>
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import { mapGetters, mapActions } from "vuex";

import NavBar from "./components/common/NavBar";
import OptionsMenu from "./components/common/OptionsMenu";

export default {
  name: "App",
  components: {
    NavBar,
    OptionsMenu,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  mounted() {
    const token = localStorage.getItem('token')

    if (token !== null && token !== '') {
      this.updateKeyStore({ key: 'currentRole', value: this.getRoleFromToken(token) })
      this.updateKeyStore({ key: 'isLoggedIn', value: true })
    } else {
      this.updateKeyStore({ key: 'currentRole', value: null })
      this.updateKeyStore({ key: 'isLoggedIn', value: false })
    }
  },
  methods: {
    ...mapActions(["updateKeyStore"]),
    getRoleFromToken(token) {
      if (token) {
        return jwtDecode(token).role
      }
      return null;
    },
  }
};
</script>
