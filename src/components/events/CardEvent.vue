<template>
  <v-card class="pa-3">
    <div class="d-flex align-center">
      <h2>#{{ card.id }} {{ card.title }}</h2>
    </div>

    <div class="d-flex align-center pb-1">
      <v-icon color="red"> mdi-map-marker-down </v-icon>
      <h5>
        {{ card.location }}
      </h5>
    </div>
    <div class="d-flex align-center pb-1">
      <v-icon color="blue"> mdi-calendar-range </v-icon>
      <h5>{{ card.date_start }} - {{ card.date_end }}</h5>
    </div>

    <div class="d-flex align-center pb-1">
      <v-icon :color="renderIcon.color" dark>
        {{renderIcon.icon}}
      </v-icon>
      <h5 class="pt-1">
        {{ card.state }}
      </h5>
    </div>
    <div class="d-flex align-center justify-end">
      <v-btn
        class="mx-2"
        fab
        dark
        x-small
        color="cyan"
        @click="editEvent(card)"
      >
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
      <v-btn
        v-if="currentRole === 'admin'"
        class="mx-2"
        fab
        dark
        x-small
        color="red"
        @click="deleteEvent(card.id)"
      >
        <v-icon dark> mdi-delete </v-icon>
      </v-btn>
    </div>
    <v-card-actions> </v-card-actions>
  </v-card>
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
    }
  },
  computed: {
    ...mapGetters(["currentNameLogin", "currentPasswordLogin", "currentFullname", "currentRole"]),
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
  methods: {
    ...mapActions(["updateNameLogin", "updatePasswordLogin", "updateFullname", "deleteEvent", "editEvent"]),
  }
};
</script>
