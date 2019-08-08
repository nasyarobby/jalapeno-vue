<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <h1 class="headline">{{this.user.name}}'s Cookbooks</h1>
      </v-flex>
      <v-flex v-if="this.cookbooks.length==0" xs12>This user has not created any cookbooks yet.</v-flex>
      <v-flex xs12 sm6 md4 lg3 v-if="$user && $user.username==username">
        <v-card color="blue" height="397px">
          <v-container fluid fill-height>
            <v-layout align-center justify-center column>
              <v-card-actions class="justify-center" xs12>
                <v-btn
                  color="error"
                  fab
                  large
                  dark
                  :to="{ name: 'createNewCookbook', params: { username: this.username }}"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-actions>
              <v-card-title class="justify-center white--text">
                <h3 class="headline">Create New Cookbook</h3>
              </v-card-title>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
      <v-flex v-for="cookbook in this.cookbooks" :key="cookbook.id" xs12 sm6 md4 lg3>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            :src="`https://unsplash.it/600/300?image=${Math.floor(Math.random() * 100) + 1}`"
          ></v-img>
          <v-card-title primary-title>
            <h3 class="headline mb-0">
              <router-link :to="`/users/${username}/cookbooks/${cookbook.id}`">{{cookbook.name}}</router-link>
            </h3>
          </v-card-title>
          <v-card-text>
            <v-chip color="pink" text-color="white">
              <v-icon left>label</v-icon>
              {{cookbook.category}}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn color="light-blue" dark :to="`/users/${username}/cookbooks/${cookbook.id}`">
              <v-icon>book</v-icon>
              {{cookbook.numOfRecipes }} recipes
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              :to="{ name: 'editCookbook', params: { username: cookbook.owner.username, cid: cookbook.id }}"
              v-if="$user && $user.username == cookbook.owner.username"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon v-if="$user && $user.username == cookbook.owner.username">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      username: this.$route.params.username,
      cookbooks: [],
      user: { name: "" }
    };
  },
  methods: {
    dummyClick() {
      alert("Ets");
    },
    love() {
      alert("Love");
    },
    getUserCookbooks() {
      let url = "/api/cookbooks/user/" + this.username;

      this.$http
        .get(url, {
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
  },
  mounted: function() {
    this.getUserCookbooks();
  },
  beforeRouteUpdate(to, from, next) {
    (this.username = to.params.username), this.getUserCookbooks();
    next();
  }
};
</script>
