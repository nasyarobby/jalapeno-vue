<template>
  <v-layout>
    <v-flex xs12>
      <v-layout align-center justify-center row fill-height>
        <div>Logged out</div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  mounted: function() {
    if (localStorage.getItem("token") != null) {
      localStorage.removeItem("token");
    }
    this.$emit("loggedout");
  }
};
</script>