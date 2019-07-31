<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <v-card>
          <v-img
            class="white--text"
            height="500px"
            :src="`https://unsplash.it/600/300?image=${Math.floor(Math.random() * 100) + 1}`"
          >
            <v-layout pa-0 ma-0 row fill-height align-end class="lightbox white--text">
              <v-flex xs12 class="text-xs-center titlebg">
                <h3 class="headline mb-0">{{cookbook.name}}</h3>
              </v-flex>
            </v-layout>
          </v-img>
          <v-card-text class="text-xs-center">
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
        </v-card>
        <v-container px-2>
          <v-layout wrap>
            <v-flex v-for="recipe in this.cookbook.recipes" :key="recipe.id" xs12 sm6 md4>
              <v-card height="100%">
                <v-img
                  class="white--text"
                  height="200px"
                  :src="`https://unsplash.it/600/300?image=${Math.floor(Math.random() * 100) + 1}`"
                ></v-img>
                <v-card-title primary-title>
                  <h3 class="headline mb-0">
                    <router-link
                      :to="`/users/${username}/recipe/${recipe.id}`"
                    >{{recipe.recipe_name}}</router-link>
                  </h3>
                  <div>{{ recipe.description }}</div>
                  <div
                    class="headline text-xs-center mt-2 font-weight-thin font-italic"
                  >"{{ recipe.notes }}"</div>
                </v-card-title>
                <v-card-text>
                  <v-chip color="pink" text-color="white">
                    <v-icon left>label</v-icon>
                    {{recipe.categories[0].category}}
                  </v-chip>
                  <v-chip>
                    <v-avatar color="red">
                      <span class="white--text headline">{{cookbook.owner.name[0]}}</span>
                    </v-avatar>
                    {{cookbook.owner.name}}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
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
      cid: this.$route.params.cid,
      cookbook: {}
    };
  },
  methods: {
    dummyClick() {
      alert("Ets");
    },
    love() {
      alert("Love");
    },
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
    }
  },
  mounted: function() {
    this.getUserCookbookContent();
  }
};
</script>
