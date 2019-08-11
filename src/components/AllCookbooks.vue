<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <h1 class="headline">Cookbooks Collection</h1>
      </v-flex>
      <v-flex v-for="(cookbook, index) in this.cookbooks" :key="cookbook.id" xs12 sm6 md4 lg3>
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
                    :to="`/users/${cookbook.owner.username}/cookbooks/${cookbook.id}`"
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
                <router-link
                  :to="`users/${cookbook.owner.username}/cookbooks/`"
                  style="text-decoration:none"
                >
                  <span class="white--text headline">{{cookbook.owner.name[0]}}</span>
                </router-link>
              </v-avatar>
              <router-link
                :to="`/users/${cookbook.owner.username}/cookbooks/`"
                style="text-decoration:none"
              >{{cookbook.owner.name}}</router-link>
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="light-blue"
              dark
              :to="`/users/${cookbook.owner.username}/cookbooks/${cookbook.id}`"
            >
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
            <v-btn
              icon
              v-if="$user && $user.username == cookbook.owner.username"
              @click.stop="openDeleteDialog(index)"
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="deleteCookbookDialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Delete this cookbook and its contents?</v-card-title>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-card>
                <v-img
                  class="white--text"
                  height="400px"
                  :src="`http://23.95.85.208:3001/pictures/book${this.cookbookOnDialog.id%7}.jpg`"
                >
                  <v-layout
                    pa-0
                    ma-0
                    row
                    fill-height
                    align-end
                    ccookbookOnDialoglass="lightbox white--text"
                  >
                    <v-flex xs12 class="text-xs-center titlebg">
                      <h3 class="headline mb-0">{{this.cookbookOnDialog.name}}</h3>
                    </v-flex>
                  </v-layout>
                </v-img>

                <v-card-text>
                  <v-chip color="pink" text-color="white">
                    <v-icon left>label</v-icon>
                    {{this.cookbookOnDialog.category}}
                  </v-chip>
                  <v-chip color="blue" text-color="white">
                    <v-icon>book</v-icon>
                    {{this.cookbookOnDialog.numOfRecipes }} recipes
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="deleteCookbookDialog = false">cancel</v-btn>
          <v-btn color="error" @click="deleteCookbook(cookbookOnDialog.index)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      cookbooks: [],
      cookbookOnDialog: { id: 0, owner: { name: "" } },
      deleteCookbookDialog: false
    };
  },
  methods: {
    openDeleteDialog(index) {
      this.cookbookOnDialog = this.cookbooks[index];
      this.cookbookOnDialog.index = index;
      this.deleteCookbookDialog = true;
    },
    deleteCookbook(index) {
      this.$http
        .delete(
          "/api/cookbooks/id/" + this.cookbooks[index].id,
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
            this.cookbooks.splice(index, 1);
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    getRecentCookbooks(num) {
      let url = "/api/cookbooks/";

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
