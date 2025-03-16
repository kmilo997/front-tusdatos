<template>
  <v-row justify="center">
    <v-dialog persistent v-model="modalEvent" width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ isEditingEvent ? 'Editar evento' : 'Crear evento' }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formEvent" v-model="formEvent" lazy-validation>
            <v-text-field
              v-model="titleEvent"
              label="Titulo"
              :rules="requiredRules"
              required
              placeholder="Ingresa el titulo"
            />
            <v-text-field
              v-model="descriptionEvent"
              label="Descripcion"
              :rules="requiredRules"
              placeholder="Ingresa una descripcion"
            />
            <v-text-field
              v-model="locationEvent"
              label="Ubicacion"
              :rules="requiredRules"
              placeholder="Ingresa la ubicacion"
            />
            <v-combobox
              label="Estado"
              v-model="stateEvent"
              :items="listStates"
              item-text="name"
              item-value="id"
              :return-object="false"
              :rules="requiredRules"
              :disabled="!isEditingEvent"
            >
              <template v-slot:selection="{ item }">
                <div>
                  {{ listStates.find((state) => state.id === stateEvent).name }}
                </div>
              </template>
            </v-combobox>
            <v-combobox
              :disabled="currentRole === 'user'"
              label="Asignado a"
              v-model="userEvent"
              :items="listUsers"
              item-text="name"
              item-value="id"
              :return-object="false"
            >
              <template v-slot:selection="{ item }">
                <div>
                  {{ listUsers.find((state) => state.id === userEvent).name }}
                </div>
              </template>
            </v-combobox>
            <v-combobox
              :disabled="currentRole === 'user'"
              label="Recursos"
              multiple
              chips
              v-model="resourcesEvent"
              :items="listResourcesAvailables"
              item-text="name"
              item-value="id"
              outlined
              :return-object="true"
            >
            </v-combobox>
            <div>
              <v-menu
                v-model="menuDateStart"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateStartCard"
                    label="Selecciona una fecha de inicio"
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="requiredRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateStartCard"
                  :min="minDate"
                  @input="menuDateStart = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div>
              <v-menu
                v-model="menuDateEnd"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateEndEvent"
                    label="Selecciona una fecha fin"
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="requiredRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateEndEvent"
                  :min="minDate"
                  @input="menuDateEnd = false"
                ></v-date-picker>
              </v-menu>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancel"> Cancelar </v-btn>
          <v-btn
            color="primary"
            @click="isEditingEvent ? editEvent() : createEvent()"
          >
            {{ isEditingEvent ? 'Editar' : 'Crear' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { watch } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CardEvent",
  props: {
      card: Object
  },
  data() {
    return {
      requiredRules: [
        v => !!v || 'Este campo es requerido',
      ],
      formEvent: false,
      menuDateStart: false,
      menuDateEnd: false,
      test: 1,
      minDate: this.getTodayDate(),
    }
  },
  watch: {
      modalEvent() {
        if (!this.isEditingEvent) {
          this.$nextTick(() => {
            this.$refs.formEvent.reset()
            this.$nextTick(() => this.stateEvent = 1)
          })
        }
      }
    },
  computed: {
    ...mapGetters(["modalEvent", "isEditingEvent", "currentEvent", "listStates", "listResourcesAvailables", "currentRole", "listUsers"]),
    titleEvent: {
        get() {
          return this.currentEvent.title;
        },
        set(value) {
            this.updateValueEvent({key: 'title', value});
        }
    },
    descriptionEvent: {
      get() {
          return this.currentEvent.description;
        },
        set(value) {
            this.updateValueEvent({key: 'description', value});
        }
    },
    locationEvent: {
      get() {
          return this.currentEvent.location;
        },
        set(value) {
            this.updateValueEvent({key: 'location', value});
        }
    },
    dateStartCard: {
      get() {
          return this.currentEvent.date_start;
        },
        set(value) {
          this.updateValueEvent({key: 'date_start', value});
        }
    },
    dateEndEvent: {
      get() {
          return this.currentEvent.date_end;
        },
        set(value) {
          this.updateValueEvent({key: 'date_end', value});
        }
    },
    stateEvent: {
      get() {
          return this.currentEvent.state;
        },
        set(value) {
          this.updateValueEvent({key: 'state', value});
        }
    },
    resourcesEvent: {
      get() {
          return this.currentEvent.resources;
        },
        set(value) {
          this.updateValueEvent({key: 'resources', value});
        }
    },
    userEvent: {
      get() {
          return this.currentEvent.user;
        },
        set(value) {
          this.updateValueEvent({key: 'user', value});
        }
    },
  },
  methods: {
    ...mapActions(["cancelEvent", "updateValueEvent", "newEvent", "updateEvent"]),
    cancel() {
      this.cancelEvent();
    },
    createEvent() {
      if (this.$refs.formEvent.validate()) {
        this.newEvent();
      }
    },
    editEvent() {
      if (this.$refs.formEvent.validate()) {
        this.updateEvent();
      }
    },
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};
</script>
