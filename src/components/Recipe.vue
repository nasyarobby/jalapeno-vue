<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <v-card>
          <v-img
            src="https://media.istockphoto.com/photos/fresh-salad-with-arugula-feta-cheese-red-onion-and-red-currant-in-a-picture-id836788304?k=6&m=836788304&s=612x612&w=0&h=CXDq2OWR526FbV4t2IAz0596adCePkHzaKQ5kfDLv_I="
            aspect-ratio="2"
          ></v-img>

          <v-card-title primary-title class="text-xs-center">
            <v-container>
              <div class="display-1 font-weight-thin">{{recipe.name}}</div>
              <div>{{recipe.description}}</div>
            </v-container>
          </v-card-title>
        </v-card>
        <v-card color="orange darken-1">
          <v-card-title primary-title class="text-xs-center">
            <v-container class="white--text" pa-0>
              <v-flex xs12 align-self-center>
                <v-icon color="white">access_time</v-icon>
              </v-flex>1 min
            </v-container>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-title primary-title class="text-xs-center">
            <v-container>
              <v-layout wrap>
                <v-flex xs12 class="headline font-weight-thin">Ingredients</v-flex>
                <template v-for="ing in recipe.ingredients">
                  <v-flex
                    class="xs6 text-xs-right pr-1"
                    :key="'a'+ing.id"
                  >{{ing.quantity_text}} {{ing.unit}}</v-flex>
                  <v-flex
                    class="xs6 text-xs-left font-weight-bold pl-1"
                    :key="'e'+ing.id"
                  >{{ing.name}}</v-flex>
                </template>
              </v-layout>
            </v-container>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-title primary-title class="text-xs-center">
            <v-container>
              <div class="headline font-weight-thin">Directions</div>
              <div v-html="directions"></div>
            </v-container>
          </v-card-title>
        </v-card>
        <v-card color="grey lighten-2">
          <v-card-title primary-title class="text-xs-center">
            <v-container class="black--text" pa-0>
              <v-flex xs12 align-self-center>
                <v-avatar color="red">
                  <span class="white--text headline">{{recipe.cookbooks[0].owner.name[0]}}</span>
                </v-avatar>
              </v-flex>
              {{recipe.cookbooks[0].owner.name}}
            </v-container>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-actions v-if="$user && $user.username == recipe.cookbooks[0].owner.username">
            <v-spacer></v-spacer>
            <v-btn
              icon
              :to="{ name: 'editUserRecipe', params: { username: recipe.cookbooks[0].owner.username, rid: recipe.id }}"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon>
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
      rid: this.$route.params.rid,
      recipe: { ingredients: [] }
    };
  },
  computed: {
    directions() {
      if (this.recipe.directions)
        return this.recipe.directions.replace(/\n/gi, "<br />");
      else return "";
    }
  },
  methods: {
    getRecipe() {
      let url = "/api/recipes/" + this.rid;

      this.$http
        .get(url, {
          validateStatus: function(status) {
            return status < 500;
          }
        })
        .then(response => {
          if (response.data.status == "success") {
            this.recipe = response.data.data;
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  mounted: function() {
    this.getRecipe();
  }
};
</script>
