<template>
  <v-container>
    <v-btn class="mb-4" dark color="blue" @click="newResource">
      <v-icon dark> mdi-plus </v-icon>
      Crear recurso
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="listResources"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <div>
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="cyan"
            @click="editResource(item)"
          >
            <v-icon dark> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            class="mx-2"
            fab
            dark
            x-small
            color="red"
            @click="deleteResource(item)"
          >
            <v-icon dark> mdi-delete </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CardEvent",
  props: {
    card: Object
  },
  data() {
    return {
      headers: [
        { text: 'Acciones', value: 'actions', width: '200px' },
        { text: 'Nombre', value: 'name' },
        { text: 'Asignado a (evento)', value: 'event' },
        { text: 'URL (adjuntos)', value: 'url' },
      ],
    }
  },
  computed: {
    ...mapGetters(["listResources"]),
    renderIcon() {
      switch (this.card.state_id) {
        case 1:
          return {
            icon: 'mdi-plus-circle',
            color: 'green'
          }
        case 2:
          return {
            icon: 'mdi-cancel',
            color: 'red'
          }
        case 3:
          return {
            icon: 'mdi-progress-check',
            color: 'green'
          }
        case 4:
          return {
            icon: 'mdi-check-circle',
            color: 'green'
          }
        case 5:
          return {
            icon: 'mdi-pause-circle',
            color: 'blue'
          }
        default:
          return ''
      }
    },
  },
  mounted(){
    this.getAllResources()
    this.getEventsToResources();
  },
  methods: {
    ...mapActions(["getAllResources", "updateKeyStore", "getEventsToResources", "updateValueResource", "deleteResource"]),
    newResource() {
      this.getEventsToResources();
      this.updateKeyStore({ key: 'modalResource', value: true })
      this.updateKeyStore({ key: 'isEditingResource', value: false })
    },
    editResource(item) {
      this.updateValueResource({ key: 'id', value: item.id })
      this.updateValueResource({ key: 'name', value: item.name })
      this.updateValueResource({ key: 'url', value: item.url })
      this.updateValueResource({ key: 'event', value: item.event_id })
      this.updateKeyStore({ key: 'modalResource', value: true })
      this.updateKeyStore({ key: 'isEditingResource', value: true })
    }
  }
};
</script>
