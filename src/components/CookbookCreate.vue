<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <h1 class="headline">Create New Cookbook</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <v-form ref="form">
          <v-text-field v-model="cookbook.name" :rules="rules.name" label="Cookbook Name" required></v-text-field>
          <v-text-field
            v-model="cookbook.category"
            :rules="rules.category"
            label="Category"
            required
          ></v-text-field>
          <v-btn color="success" @click="submit">Create</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      cookbook: {
        name: "",
        category: ""
      },
      rules: {
        name: [v => !!v || "Name is required"],
        category: [v => !!v || "category is required"]
      }
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let url = "/api/cookbooks";
        this.$http
          .put(url, this.cookbook, {
            validateStatus: function(status) {
              return status < 500;
            }
          })
          .then(response => {
            if (response.data.status == "success") {
              this.cookbooks = response.data.data.cookbooks;
              this.user = response.data.data.owner;
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  }
};
</script>
