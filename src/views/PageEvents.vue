<template>
  <v-container>
    <h2>Eventos</h2>
    <div class="d-flex align-center justify-space-between">
      <v-row class="d-flex justify-space-between">
        <v-col cols="8" class="d-flex align-center">
          <v-text-field
            label="Buscador"
            v-model="barSearcher"
            placeholder="Ingresa el nombre o el ID del evento"
          ></v-text-field>
          <v-btn @click="getEvents" class="ml-3" fab dark small color="blue">
            <v-icon dark> mdi-magnify </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-btn
        v-if="currentRole === 'admin'"
        class="ml-2"
        dark
        color="blue"
        @click="openModalNewEvent"
      >
        <v-icon dark> mdi-plus </v-icon>
        Crear evento
      </v-btn>
    </div>
    <v-row class="pt-4">
      <v-col
        v-for="(card, index) in listEvents"
        :key="index"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <CardEvent :card="card" />
      </v-col>
    </v-row>
    <FormEvent />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CardEvent from "../components/events/CardEvent";
import FormEvent from "../components/events/FormEvent";

export default {
  name: "PageEvents",
  components: {
    CardEvent,
    FormEvent,
  },
  data() {
    return {
    }
  },
  mounted() {
    this.getEvents()
    this.getStates()
    this.getUsers();
  },
  computed: {
    ...mapGetters(["modalEvent", "isEditingEvent", "currentEvent", "searcherEvent", "listEvents", "currentRole", "isLoggedIn"]),
    barSearcher: {
      get() {
        return this.searcherEvent
      },
      set(value) {
        this.updateKeyStore({ key: "searcherEvent", value })
      }
    }
  },
  methods:{
    ...mapActions(["openModalNewEvent", "getEvents", "updateKeyStore", "getEvents","getStates", "getUsers"]),
  }
};
</script>
