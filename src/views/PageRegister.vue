<template>
  <div class="page-register">
    <v-row no-gutters class="fill-height">
      <v-col cols="6">
        <v-img class="page-register--image" :src="imgBanner"></v-img>
      </v-col>
      <v-col cols="6">
        <FormRegister></FormRegister>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FormRegister from "../components/register/FormRegister";


export default {
  name: "PageRegister",
  components: {
    FormRegister,
  },
  data() {
    return {
      imgBanner: 'https://www.jotform.com/blog/wp-content/uploads/2023/02/google-form-header-image-size-1280x500.jpg'
    }
  },
};
</script>
