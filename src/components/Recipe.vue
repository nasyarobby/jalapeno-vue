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
              <div class="display-1 font-weight-thin">{{dummy.recipe.recipe_name}}</div>
              <div>{{dummy.recipe.description}}</div>
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
                <template v-for="ing in dummy.recipe.ingredients">
                  <v-flex
                    class="xs6 text-xs-right pr-1"
                    :key="ing.id"
                  >{{ing.quantity_text}} {{ing.unit}}</v-flex>
                  <v-flex
                    class="xs6 text-xs-left font-weight-bold pl-1"
                    :key="ing.id"
                  >{{ing.data.ingredient_name}}</v-flex>
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
                  <span class="white--text headline">R</span>
                </v-avatar>
              </v-flex>Robby D.
            </v-container>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
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
      dummy: {
        recipe: {
          id: 1,
          recipe_name: "Fresh Tomato Salad",
          description:
            "Fresh garden tomatoes topped with herbs and \
                a simple olive oil and vinegar mixture.",
          directions:
            "1. Place tomatoes, red onion, and bocconcini \
                (if using) in shallow bowl. \n2. Drizzle with olive oil and \
                red wine vinegar. Toss to combine. \n3. Season with salt, \
                pepper, and fresh herbs to taste.",
          preparationTime: "10 min",
          cookTime: "0 min",
          portions: 4,
          notes: "Great to put in the fridge!",
          ingredients: [
            {
              id: 1,
              recipe_id: 1,
              ingredient_id: 1,
              quantity: 2,
              quantity_text: "2",
              unit: "pints",
              data: {
                id: 1,
                ingredient_name: "Grape Tomatoes",
                location: "Stop N Shop",
                price: 1.99
              }
            },
            {
              id: 2,
              recipe_id: 1,
              ingredient_id: 2,
              quantity: 0.25,
              quantity_text: "1/4",
              unit: "cups",
              data: {
                id: 2,
                ingredient_name: "Red Onion",
                location: "Market Basket",
                price: 1.99
              }
            },
            {
              id: 3,
              recipe_id: 1,
              ingredient_id: 3,
              quantity: 1,
              quantity_text: "1",
              unit: "tablespoons",
              data: {
                id: 3,
                ingredient_name: "Fresh Herbs",
                location: "Stop N Shop",
                price: 1.99
              }
            },
            {
              id: 4,
              recipe_id: 1,
              ingredient_id: 4,
              quantity: 3,
              quantity_text: "3",
              unit: "tablespoons",
              data: {
                id: 4,
                ingredient_name: "Olive Oil",
                location: "Market Basket",
                price: 7.99
              }
            },
            {
              id: 5,
              recipe_id: 1,
              ingredient_id: 5,
              quantity: 1,
              quantity_text: "1",
              unit: "tablespoons",
              data: {
                id: 5,
                ingredient_name: "Red Wine Vinegar",
                location: "Stop N Shop",
                price: 6.99
              }
            },
            {
              id: 6,
              recipe_id: 1,
              ingredient_id: 6,
              quantity: 1,
              quantity_text: "",
              unit: "to taste",
              data: {
                id: 6,
                ingredient_name: "Salt",
                location: "Stop N Shop",
                price: 4.99
              }
            },
            {
              id: 7,
              recipe_id: 1,
              ingredient_id: 7,
              quantity: 1,
              quantity_text: "",
              unit: "to taste",
              data: {
                id: 7,
                ingredient_name: "Pepper",
                location: "Stop N Shop",
                price: 4.99
              }
            },
            {
              id: 8,
              recipe_id: 1,
              ingredient_id: 8,
              quantity: 0.5,
              quantity_text: "1/2",
              unit: "cup",
              data: {
                id: 8,
                ingredient_name: "Bocconcini",
                location: "Trader Joes",
                price: 2.99
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    directions() {
      return this.dummy.recipe.directions.replace(/\n/gi, "<br />");
    }
  }
};
</script>
