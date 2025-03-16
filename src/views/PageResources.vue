<template>
  <v-container>
    <h2>Recursos</h2>
    <ListResources />
    <FormResource />
  </v-container>
</template>

<script>
import ListResources from "../components/resources/ListResources";
import FormResource from "../components/resources/FormResource.vue";

export default {
  name: "PageResources",
  components: {
    ListResources,
    FormResource,
  },
  data() {
    return {
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
    }
  },
};
</script>
