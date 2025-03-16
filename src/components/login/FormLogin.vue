<template>
  <div
    class="d-flex flex-column pa-5 px-8 justify-center form-login__container"
  >
    <div>
      <h2>Login</h2>
      <v-form ref="formLogin" v-model="formLogin" lazy-validation>
        <v-text-field
          v-model="name"
          label="Usuario/email"
          :rules="requiredRules"
          required
          placeholder="Ingresa tu usuario o email"
        />
        <v-text-field
          v-model="password"
          label="Contraseña"
          :rules="requiredRules"
          @click:append="showPass = !showPass"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          required
          placeholder="Ingresa tu contraseña"
        />
      </v-form>

      <span v-if="errorLogin" class="form-login__container--error-login">
        {{ currentError }}
      </span>
      <v-btn
        class="mt-6"
        color="primary"
        elevation="2"
        large
        @click="validateInfo"
      >
        Ingresar
      </v-btn>
      <span class="form-login__container--hint" @click="registerUser">
        Registrarse
      </span>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from "jwt-decode";
import { mapActions, mapGetters } from "vuex";
import api from "@/api/api";

export default {
  name: "FormLogin",

  data() {
    return {
      requiredRules: [
        v => !!v || 'Este campo es requerido',
      ],
      formLogin: true,
      errorLogin: false,
      currentError: '',
      showPass: false,
    }
  },
  computed: {
    ...mapGetters(["currentNameLogin", "currentPasswordLogin"]),
    name: {
      get() {
        return this.currentNameLogin;
      },
      set(value) {
        this.updateNameLogin(value);
      }
    },
    password: {
      get() {
        return this.currentPasswordLogin;
      },
      set(value) {
        this.updatePasswordLogin(value);
      }
    },
  },
  methods: {
    ...mapActions(["updateNameLogin", "updatePasswordLogin","login", "updateKeyStore"]),
    registerUser() {
      this.$router.push({ name: "register" });
    },
    getRoleFromToken(token) {
      if (token) {
        return jwtDecode(token).role
      }
      return null;
    },
    validateInfo() {
      this.errorLogin = false
      this.currentError = ''
      if (this.$refs.formLogin.validate()) {
        const params = {
          username: this.currentNameLogin,
          password: this.currentPasswordLogin,
        }
        api.post('/login', params).then(response => {
          const token = response.data.access_token
          this.updateKeyStore({ key: 'currentRole', value: this.getRoleFromToken(token) })
          this.updateKeyStore({ key: 'isLoggedIn', value: true })
          localStorage.setItem('token', token);
          this.$router.push({ name: "events" });
        })
        .catch(error => {
          console.error('Error login:', error)
          this.errorLogin = true;
          this.currentError = error.response.data.msg
        });
      }
    },
  }
};
</script>
