<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <v-card>
          <v-img
            class="white--text"
            height="500px"
            :src="`http://23.95.85.208:3001/pictures/book${cookbook.id%7}.jpg`"
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
            <v-spacer></v-spacer>
            <v-btn
              icon
              :to="{ name: 'editCookbook', params: { username: cookbook.owner.username, cid: cookbook.id }}"
              v-if="$user && $user.username == cookbook.owner.username"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
              icon
              v-if="$user && $user.username == cookbook.owner.username"
              @click.stop="deleteCookbookDialog=true"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>

        <v-dialog v-model="deleteCookbookDialog" max-width="600">
          <v-card>
            <v-card-title class="headline">Delete this cookbook?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="deleteCookbookDialog = false">cancel</v-btn>
              <v-btn color="error" @click="deleteCookbook()">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-container px-2>
          <v-layout wrap>
            <v-flex xs12 sm6 md4 v-if="$user && $user.username==username">
              <v-card color="blue" height="100%">
                <v-container fluid fill-height>
                  <v-layout align-center justify-center column>
                    <v-card-actions class="justify-center" xs12>
                      <v-btn
                        color="error"
                        fab
                        large
                        dark
                        :to="`/users/${this.username}/cookbooks/${this.cid}/create-new-recipe`"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-card-title class="justify-center white--text" xs12>
                      <h3 class="headline">Create New Recipe</h3>
                    </v-card-title>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex v-for="recipe in this.cookbook.recipes" :key="recipe.id" xs12 sm6 md4>
              <v-card height="100%">
                <v-img
                  class="white--text"
                  height="200px"
                  :src="`http://23.95.85.208:3001/pictures/food${recipe.id%18}.jpg`"
                ></v-img>

                <v-card-title primary-title>
                  <v-layout column>
                    <v-flex mb-0>
                      <h3 class="headline mb-0">
                        <router-link
                          :to="`/users/${username}/recipe/${recipe.id}`"
                        >{{recipe.recipe_name}}</router-link>
                      </h3>
                    </v-flex>
                    <v-flex>
                      <div>{{ recipe.description }}</div>
                    </v-flex>
                  </v-layout>
                  <!--<div
                    class="headline text-xs-center mt-2 font-weight-thin font-italic"
                  >"{{ recipe.notes }}"</div>-->
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
      deleteCookbookDialog: false,
      cookbook: {}
    };
  },
  methods: {
    deleteCookbook() {
      this.$http
        .delete(
          "/api/cookbooks/id/" + this.cid,
          {},
          {
            validateStatus: function(status) {
              return status < 500;
            }
          }
        )
        .then(response => {
          if (response.data.status == "success") {
            this.deleteCookbookDialog = false;
            this.$router.push({
              name: "userCookbooks",
              params: { username: this.username }
            });
          }
        })
        .catch(err => {
          alert(err);
        });
    },
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
