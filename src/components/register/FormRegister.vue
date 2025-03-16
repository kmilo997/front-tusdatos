<template>
  <div
    class="d-flex flex-column pa-5 px-8 justify-center form-login__container"
  >
    <div>
      <h2>Registrate!</h2>
      <v-form ref="formRegister" v-model="formRegister" lazy-validation>
        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          placeholder="Ingresa tu email"
        />
        <v-text-field
          v-model="password1"
          :append-icon="showPass1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass1 ? 'text' : 'password'"
          label="Contraseña"
          :rules="pass1Rule"
          placeholder="Ingresa tu contraseña"
          @click:append="showPass1 = !showPass1"
        />
        <v-text-field
          v-if="password1.length > 0"
          v-model="password2"
          :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass2 ? 'text' : 'password'"
          label="Confirma tu contraseña"
          :rules="[passRules]"
          placeholder="Ingresa tu contraseña de nuevo"
          @click:append="showPass2 = !showPass2"
        />
      </v-form>
      <v-btn
        class="mt-6"
        color="primary"
        elevation="2"
        large
        @click="registerUser"
      >
        Registrarte!
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import api from "@/api/api";

export default {
  name: "FormLogin",
  data() {
    return {
      showPass1: false,
      showPass2: false,
      email: "",
      password1: "",
      password2: "",
      formRegister: true,
      nameRules: [
        v => !!v || 'Nombre es requerido',
      ],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser valido',
      ],
      pass1Rule: [
        v => !!v || 'Este campo es requerido'
      ],
    }
  },
  watch: {
    password1(value) {
      if (value.length === 0) this.password2 = "";
    }
  },
  computed: {
    ...mapGetters(["currentNameLogin", "currentPasswordLogin", "currentFullname"]),
    passRules() {
      return this.password2 === this.password1 || "La contraseña no coincide";
    },
  },
  methods: {
    ...mapActions(["updateNameLogin", "updatePasswordLogin", "updateFullname", "newUser"]),
    registerUser() {
      if (this.$refs.formRegister.validate()) {
        this.$router.push({ name: "dashboard" });
      }
    },
    registerUser() {
      this.errorLogin = false
      this.currentError = ''
      if (this.$refs.formRegister.validate()) {
        const params = {
          username: this.email,
          password: this.password2,
        }
        api.post('/register', params).then(response => {
          this.$router.push({ name: "login" });
        })
        .catch(error => {
          console.error('Error register:', error)
        });
      }
    },
  }
};
</script>
