<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap>
      <v-flex v-for="cookbook in this.dummy.cookbooks" :key="cookbook.id" xs12 sm6 md4 lg3>
        <v-card>
          <v-img
            class="white--text"
            height="200px"
            :src="`https://unsplash.it/600/300?image=${Math.floor(Math.random() * 100) + 1}`"
          ></v-img>
          <v-card-title primary-title>
            <h3 class="headline mb-0">
              <router-link
                :to="`/users/${username}/cookbooks/${cookbook.id}`"
              >{{cookbook.cookbook_name}}</router-link>
            </h3>
          </v-card-title>
          <v-card-text>
            <v-chip color="pink" text-color="white">
              <v-icon left>label</v-icon>
              {{cookbook.category}}
            </v-chip>
            <v-chip>
              <v-avatar>
                <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="trevor" />
              </v-avatar>
              {{cookbook.owner}}
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
<script>
export default {
  data() {
    return {
      username: this.$route.params.username,
      dummy: {
        cookbooks: [
          {
            id: 1,
            user_id: 1,
            owner: "Robby D",
            cookbook_name: "Spend with Pennies",
            category: "Salads",
            numOfRecipes: 1
          },
          {
            id: 2,
            user_id: 1,
            owner: "Robby D",
            cookbook_name: "Cooking Classy",
            category: "Drinks",
            numOfRecipes: 25
          },
          {
            id: 3,
            user_id: 1,
            owner: "Robby D",
            cookbook_name: "Deserted Dessert",
            category: "Dessert",
            numOfRecipes: 10
          },
          {
            id: 4,
            user_id: 1,
            owner: "Robby D",
            cookbook_name: "My Cookbook",
            category: "Cookbook",
            numOfRecipes: 3
          }
        ]
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
