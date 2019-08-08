<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <h1 class="headline">Edit Recipe</h1>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 lg8 offset-lg2>
        <v-form ref="form">
          <v-text-field v-model="recipe.name" :rules="rules.name" label="Recipe Name" required></v-text-field>
          <v-textarea
            v-model="recipe.description"
            :rules="rules.description"
            label="Description"
            required
            auto-grow
            rows="1"
          ></v-textarea>
          <v-textarea
            v-model="recipe.directions"
            :rules="rules.directions"
            label="Directions"
            required
            auto-grow
            rows="3"
          ></v-textarea>
          <v-textarea v-model="recipe.notes" label="Notes" auto-grow rows="1"></v-textarea>
          <v-layout wrap>
            <v-flex xs6 sm4 md3 lg2 pr-3>
              <v-text-field
                v-model="recipe.preparationTime"
                :rules="rules.prepTime"
                label="Preparation Time"
                mask="####"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md3 lg2>
              <v-select v-model="recipe.preparationTimeUnit" :items="units"></v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs6 sm4 md3 lg2 pr-3>
              <v-text-field
                v-model="recipe.cookTime"
                :rules="rules.cookTime"
                label="Cook Time"
                mask="####"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md3 lg2>
              <v-select v-model="recipe.cookTimeUnit" :items="units"></v-select>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs6 sm4 md3 lg2 pr-3>
              <v-text-field
                v-model="recipe.portions"
                :rules="rules.portions"
                label="Portions"
                mask="####"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <h5 class="subheading">Ingredients</h5>
          <v-layout wrap v-for="(ing, index) in recipe.ingredients" v-bind:key="index ">
            <v-flex xs6 sm4 md3 lg2 pr-3>
              <v-text-field v-model="ing.name" :rules="rules.required" label="Ingredients Name"></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md3 lg2 pr-3>
              <v-text-field v-model="ing.quantity" :rules="rules.required" label="Quantity"></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md3 lg2 pr-3>
              <v-text-field
                v-model="ing.quantity_text"
                :rules="rules.required"
                label="Quantity Display"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 sm4 md3 lg2 pr-3>
              <v-text-field v-model="ing.unit" :rules="rules.required" label="Unit"></v-text-field>
            </v-flex>
            <v-flex align-self-center>
              <v-btn color="success" small fab flat @click="addIngredient(index)">
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn
                color="error"
                small
                fab
                flat
                @click="removeIngredient(index)"
                v-if="ingredientsIsMoreThanOneLeft()"
              >
                <v-icon>remove</v-icon>
              </v-btn>
            </v-flex>
            <v-flex align-self-center>{{ing.quantity_text}} {{ing.unit}} {{ing.name}}</v-flex>
          </v-layout>
          <v-btn color="success" @click="submit">Create</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      rid: this.$route.params.rid,
      units: ["minute", "hour"],
      recipe: {
        name: "",
        description: "",
        directions: "",
        preparationTime: 0,
        preparationTimeUnit: "hour",
        cookTime: 0,
        cookTimeUnit: "minute",
        portions: 1,
        notes: "",
        ingredients: [],
        cookbookId: [{ id: this.$route.params.cid }],
        categories: [2]
      },
      rules: {
        name: [v => !!v.trim() || "Name is required"],
        category: [v => !!v.trim() || "category is required"],
        description: [v => !!v.trim() || "Description is required."],
        directions: [
          v =>
            !!v.trim() || "What cooking recipes do not have any directions??!!"
        ],
        cookTime: [
          v => {
            return !!String(v).trim() || "Cooking time is required.";
          }
        ],
        prepTime: [
          v => {
            return !!String(v).trim() || "Preparation time is required.";
          }
        ],
        portions: [
          v => {
            return !!String(v).trim() || "Portions is required.";
          }
        ],
        required: [v => !!String(v).trim() || "Required"]
      }
    };
  },
  mounted() {
    this.recipe.ingredients.push(this.emptyIngredient());
    this.getRecipe();
  },
  computed: {},
  methods: {
    checkUnit(str) {
      if (str == "min") return "minute";
      else if (str == "hour") return "hour";
      else return str;
    },
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
            let sCookTime = response.data.data.cookTime.split(" ");
            let sPrepTime = response.data.data.preparationTime.split(" ");
            response.data.data.cookbookId = response.data.data.cookbooks.map(
              e => {
                return { id: e.id };
              }
            );
            response.data.data.cookTimeUnit = this.checkUnit(sCookTime[1]);
            response.data.data.cookTime = sCookTime[0];

            response.data.data.preparationTimeUnit = this.checkUnit(
              sPrepTime[1]
            );
            response.data.data.preparationTime = sPrepTime[0];
            response.data.data.categories = response.data.data.categories.map(
              e => e.id
            );
            delete response.data.data.cookbooks;
            response.data.data.ingredients = response.data.data.ingredients.map(
              e => {
                delete e.id;
                return e;
              }
            );
            this.recipe = response.data.data;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    ingredientsIsMoreThanOneLeft() {
      return this.recipe.ingredients.length > 1;
    },
    addIngredient(index) {
      this.recipe.ingredients.splice(index + 1, 0, this.emptyIngredient());
    },
    removeIngredient(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    emptyIngredient() {
      return { name: "", quantity: "", quantity_text: "", unit: "" };
    },
    submit() {
      if (this.$refs.form.validate()) {
        let url = "/api/recipes/" + this.rid;
        this.$http
          .put(url, this.recipe, {
            validateStatus: function(status) {
              return status < 500;
            }
          })
          .then(response => {
            if (response.data.status == "success") {
              this.$router.push({
                name: "userRecipe",
                params: { username: "nasyarobby", rid: response.data.data.id }
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
