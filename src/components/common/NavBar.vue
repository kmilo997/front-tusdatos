<template>
  <v-app-bar app color="blue" dark>
    <div class="d-flex align-center">Mis eventos</div>
    <v-spacer></v-spacer>
    <v-btn color="red" elevation="2" small v-if="isLoggedIn" @click="logout">
      Cerrar sesion
    </v-btn>
  </v-app-bar>
</template>
<script>
import {  mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    logout() {
      this.$router.push('/login');
    }
  }
};
</script>
