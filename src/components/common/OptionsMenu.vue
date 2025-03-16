<template>
  <v-list class="options-menu">
    <v-list-item-group v-model="getSelectedMenu" color="primary">
      <v-list-item v-for="(item) in getOptionsMenu" :key="item.value">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
 import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
    }
  },
  mounted() {
    const indexCurrentRoute = this.optionsMenu.findIndex(item => item.value === this.$route.name)
    this.getSelectedMenu = indexCurrentRoute
  },
  computed: {
    ...mapGetters(["optionsMenu", "selectedMenu", "currentRole", "isLoggedIn"]),
    getSelectedMenu: {
      get() {
        return this.selectedMenu
      },
      set(val) {
        this.updateKeyStore({key: 'selectedMenu', value: val});

        const indexCurrentRoute = this.optionsMenu.findIndex(item => item.value === this.$route.name)
        if (val!== undefined && indexCurrentRoute !== val) {
          this.$router.push({ name: this.optionsMenu[val].value });
        }
      }
    },
    getOptionsMenu() {
      return this.optionsMenu.filter((opt) => opt.roles.includes(this.currentRole))
    }
  },
  methods: {
    ...mapActions(["updateKeyStore"]),
  }
};
</script>
