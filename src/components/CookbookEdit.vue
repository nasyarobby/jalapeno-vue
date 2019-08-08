<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <h1 class="headline">Edit Cookbook</h1>
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
          <v-btn color="success" @click="submit">Update</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      username: this.$route.params.username,
      cid: this.$route.params.cid,
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
  mounted() {
    this.getUserCookbookContent();
  },
  methods: {
    getUserCookbookContent() {
      let url = "/api/cookbooks/id/" + this.cid;

      this.$http
        .get(url, {
          validateStatus: function(status) {
            return status < 500;
          }
        })
        .then(response => {
          if (response.data.status == "success") {
            this.cookbook = response.data.data;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    submit() {
      if (this.$refs.form.validate()) {
        let url = "/api/cookbooks/id/" + this.cid;
        this.$http
          .put(url, this.cookbook, {
            validateStatus: function(status) {
              return status < 500;
            }
          })
          .then(response => {
            if (response.data.status == "success") {
              this.$router.push({
                name: "userCookbook",
                params: { username: this.username, cid: response.data.data.id }
              });
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
