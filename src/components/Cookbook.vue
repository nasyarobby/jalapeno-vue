<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="500px"
            :src="`https://unsplash.it/600/300?image=${Math.floor(Math.random() * 100) + 1}`"
          ></v-img>
          <v-card-title primary-title>
            <h3 class="headline mb-0">Hello</h3>
          </v-card-title>
          <v-card-text>
            <v-chip color="pink" text-color="white">
              <v-icon left>label</v-icon>Category
            </v-chip>
            <v-chip>
              <v-avatar>
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="trevor" />
              </v-avatar>Owner
            </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="recipe in this.dummy.cookbook.recipes" :key="recipe.id" xs12 sm6 md4 lg3>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            :src="`https://unsplash.it/600/300?image=${Math.floor(Math.random() * 100) + 1}`"
          ></v-img>
          <v-card-title primary-title>
            <h3 class="headline mb-0">
              <router-link :to="`/users/${username}/recipe/${recipe.id}`">{{recipe.recipe_name}}</router-link>
            </h3>
            <div>{{ recipe.description }}</div>
            <div
              class="headline text-xs-center mt-2 font-weight-thin font-italic"
            >"{{ recipe.notes }}"</div>
          </v-card-title>
          <v-card-text>
            <v-chip color="pink" text-color="white">
              <v-icon left>label</v-icon>Category
            </v-chip>
            <v-chip>
              <v-avatar>
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="trevor" />
              </v-avatar>Owner
            </v-chip>
          </v-card-text>
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
      dummy: {
        cookbook: {
          id: 1,
          user_id: 1,
          owner: "Robby D",
          cookbook_name: "Spend with Pennies",
          category: "Salads",
          numOfRecipes: 1,
          recipes: [
            {
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
              notes: "Great to put in the fridge!"
            },
            {
              id: 2,
              recipe_name: "Lemonade",
              description:
                "There's nothing more refreshing to quench your \
                thirst on a hot summer day than a tall ice cold glass of this \
                lemonade!It's incredibly easy to make and a million times \
                better than any store-bought mix.",
              directions:
                "1.In a small saucepan combine sugar and 2 cups \
                water. Bring to a boil, while stirring frequently to dissolve \
                sugar. All to cool to room temperature, about 30 minutes. \n\
                2.In a large pitcher stir together sugar syrup mixture, 7 \
                cups cold water and lemon juice. Add ice and serve cold. \
                Store in refrigerator.",
              preparationTime: "10 min",
              cookTime: "5 min",
              portions: 10,
              notes: "Best during a hot summer day!"
            },
            {
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
              notes: "Great to put in the fridge!"
            },
            {
              id: 2,
              recipe_name: "Lemonade",
              description:
                "There's nothing more refreshing to quench your \
                thirst on a hot summer day than a tall ice cold glass of this \
                lemonade!It's incredibly easy to make and a million times \
                better than any store-bought mix.",
              directions:
                "1.In a small saucepan combine sugar and 2 cups \
                water. Bring to a boil, while stirring frequently to dissolve \
                sugar. All to cool to room temperature, about 30 minutes. \n\
                2.In a large pitcher stir together sugar syrup mixture, 7 \
                cups cold water and lemon juice. Add ice and serve cold. \
                Store in refrigerator.",
              preparationTime: "10 min",
              cookTime: "5 min",
              portions: 10,
              notes: "Best during a hot summer day!"
            },
            {
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
              notes: "Great to put in the fridge!"
            },
            {
              id: 2,
              recipe_name: "Lemonade",
              description:
                "There's nothing more refreshing to quench your \
                thirst on a hot summer day than a tall ice cold glass of this \
                lemonade!It's incredibly easy to make and a million times \
                better than any store-bought mix.",
              directions:
                "1.In a small saucepan combine sugar and 2 cups \
                water. Bring to a boil, while stirring frequently to dissolve \
                sugar. All to cool to room temperature, about 30 minutes. \n\
                2.In a large pitcher stir together sugar syrup mixture, 7 \
                cups cold water and lemon juice. Add ice and serve cold. \
                Store in refrigerator.",
              preparationTime: "10 min",
              cookTime: "5 min",
              portions: 10,
              notes: "Best during a hot summer day!"
            },
            {
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
              notes: "Great to put in the fridge!"
            },
            {
              id: 2,
              recipe_name: "Lemonade",
              description:
                "There's nothing more refreshing to quench your \
                thirst on a hot summer day than a tall ice cold glass of this \
                lemonade!It's incredibly easy to make and a million times \
                better than any store-bought mix.",
              directions:
                "1.In a small saucepan combine sugar and 2 cups \
                water. Bring to a boil, while stirring frequently to dissolve \
                sugar. All to cool to room temperature, about 30 minutes. \n\
                2.In a large pitcher stir together sugar syrup mixture, 7 \
                cups cold water and lemon juice. Add ice and serve cold. \
                Store in refrigerator.",
              preparationTime: "10 min",
              cookTime: "5 min",
              portions: 10,
              notes: "Best during a hot summer day!"
            },
            {
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
              notes: "Great to put in the fridge!"
            },
            {
              id: 2,
              recipe_name: "Lemonade",
              description:
                "There's nothing more refreshing to quench your \
                thirst on a hot summer day than a tall ice cold glass of this \
                lemonade!It's incredibly easy to make and a million times \
                better than any store-bought mix.",
              directions:
                "1.In a small saucepan combine sugar and 2 cups \
                water. Bring to a boil, while stirring frequently to dissolve \
                sugar. All to cool to room temperature, about 30 minutes. \n\
                2.In a large pitcher stir together sugar syrup mixture, 7 \
                cups cold water and lemon juice. Add ice and serve cold. \
                Store in refrigerator.",
              preparationTime: "10 min",
              cookTime: "5 min",
              portions: 10,
              notes: "Best during a hot summer day!"
            }
          ]
        }
      }
    };
  },
  methods: {
    dummyClick() {
      alert("Ets");
    },
    love() {
      alert("Love");
    }
  }
};
</script>
