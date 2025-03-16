<template>
  <v-row justify="center">
    <v-dialog persistent v-model="modalResource" width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">
            {{ isEditingResource ? 'Editar recurso' : 'Crear recurso' }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-form ref="formResource" v-model="formResource" lazy-validation>
            <v-text-field
              v-model="nameResource"
              label="Nombre"
              :rules="requiredRules"
              required
              placeholder="Ingresa el nombre"
            />
            <v-combobox
              label="Evento asignado"
              v-model="eventResource"
              :items="listEventsToResource"
              item-text="title"
              item-value="id"
              :return-object="false"
            >
              <template v-slot:selection>
                <div>
                  {{ getNameEvent }}
                </div>
              </template>
            </v-combobox>
            <v-text-field
              v-model="urlResource"
              label="URL"
              placeholder="Ingresa una URL"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancel"> Cancelar </v-btn>
          <v-btn
            color="primary"
            @click="isEditingResource ? editResource() : createResource()"
          >
            {{ isEditingResource ? 'Editar' : 'Crear' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
      requiredRules: [
        v => !!v || 'Este campo es requerido',
      ],
      formResource: false,
      menuDateStart: false,
      menuDateEnd: false,
      test: 1,
    }
  },
  watch: {
      modalResource() {
        if (!this.isEditingResource) {
          this.$nextTick(() => this.$refs.formResource.reset())
        }
      }
    },
  computed: {
    ...mapGetters(["modalResource", "isEditingResource", "currentResource", "listEventsToResource"]),
    nameResource: {
        get() {
          return this.currentResource.name;
        },
        set(value) {
            this.updateValueResource({key: 'name', value});
        }
    },
    urlResource: {
      get() {
          return this.currentResource.url;
        },
        set(value) {
            this.updateValueResource({key: 'url', value});
        }
    },
    eventResource: {
      get() {
          return this.currentResource.event;
        },
        set(value) {
          this.updateValueResource({key: 'event', value});
        }
    },
    getNameEvent() {
      console.log('this.currentResource', this.currentResource);

      if(this.eventResource === 0) return '-'
      return this.listEventsToResource.find((item) => item.id === this.eventResource).title
    }
  },
  methods: {
    ...mapActions(["cancelResource", "updateValueResource", "newResource", "updateResource"]),
    cancel() {
      this.cancelResource();
    },
    createResource() {
      if (this.$refs.formResource.validate()) {
        this.newResource();
      }
    },
    editResource() {
      if (this.$refs.formResource.validate()) {
        this.updateResource();
      }
    },
  }
};
</script>
