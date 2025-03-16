<template>
  <div class="page-login">
    <v-row no-gutters class="fill-height">
      <v-col cols="6">
        <v-img
          class="page-login--image"
          :src="imgBanner"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <FormLogin></FormLogin>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormLogin from "../components/login/FormLogin";

export default {
  name: "PageLogin",
  components: {
    FormLogin,
  },
  data() {
    return {
      imgBanner: 'https://media.istockphoto.com/id/1083815434/vector/concept-of-face-identification-a-crowd-of-people-with-id-marks-on-face-face-recognition.jpg?s=612x612&w=0&k=20&c=sNLJFBPFsZzJ9VA0yUkWFaT1uGs1LZp5jars-RdP1gw='
    }
  },
  mounted() {
    this.logout();
  },
  methods: {
    ...mapActions(["logout"]),
  }
};
</script>
