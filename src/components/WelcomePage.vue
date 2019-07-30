<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <h1 class="headline">Cookbooks Collection</h1>
      </v-flex>
      <v-flex v-for="cookbook in this.cookbooks" :key="cookbook.id" xs12 sm6 md4 lg3>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            :src="`https://unsplash.it/600/300?image=${Math.floor(Math.random() * 100) + 1}`"
          >
            <v-layout pa-0 ma-0 row fill-height align-end class="lightbox white--text">
              <v-flex xs12 class="text-xs-center titlebg">
                <h3 class="headline mb-0">
                  <router-link
                    class="white--text"
                    style="text-decoration:none;"
                    :to="`/users/${cookbook.owner.id}/cookbooks/${cookbook.id}`"
                  >{{cookbook.name}}</router-link>
                </h3>
              </v-flex>
            </v-layout>
          </v-img>

          <v-card-text>
            <v-chip color="pink" text-color="white">
              <v-icon left>label</v-icon>
              {{cookbook.category}}
            </v-chip>
            <v-chip>
              <v-avatar color="red">
                <span class="white--text headline">{{cookbook.owner.name[0]}}</span>
              </v-avatar>
              {{cookbook.owner.name}}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn color="light-blue" dark>
              <v-icon>book</v-icon>
              {{cookbook.numOfRecipes }} recipes
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="love">
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.titlebg {
  background: rgba(70, 70, 70, 0.5);
}
</style>
<script>
export default {
  data() {
    return {
      username: this.$route.params.username,
      cookbooks: []
    };
  },
  methods: {
    dummyClick() {
      alert("Ets");
    },
    love() {
      alert("Love");
    },
    getRecentCookbooks(num) {
      let url = "/api/cookbooks/recent/" + num;

      this.$http
        .get(url, {
          validateStatus: function(status) {
            return status < 500;
          }
        })
        .then(response => {
          if (response.data.status == "success") {
            this.cookbooks = response.data.data.cookbooks;
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  mounted: function() {
    this.getRecentCookbooks(4);
  }
};
</script>
