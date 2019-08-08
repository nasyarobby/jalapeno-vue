<script>
import Registration from "./components/Registration.vue";
import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import WelcomePage from "./components/WelcomePage.vue";
import NotFoundComponent from "./components/NotFoundComponent.vue";
import EmailVerificationVue from "./components/EmailVerification.vue";

/* COOKBOOKS AND RECIPES */
import Cookbooks from "./components/Cookbooks.vue";
import Cookbook from "./components/Cookbook.vue";
import Recipe from "./components/Recipe.vue";
import CookbookCreate from "./components/CookbookCreate.vue";
import RecipeCreateVue from "./components/RecipeCreate.vue";
import AllCookbooksVue from "./components/AllCookbooks.vue";
import CookbookEditVue from "./components/CookbookEdit.vue";
import RecipeEditVue from "./components/RecipeEdit.vue";
import VersionVue from "./components/Version.vue";

export default [
  {
    path: "/register",
    name: "register",
    component: Registration,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout
  },
  {
    path: "/verify-email/:email/:code",
    name: "VerifyEmail",
    component: EmailVerificationVue,
    meta: {
      guest: true
    }
  },
  {
    path: "/users/:username/cookbooks/",
    name: "userCookbooks",
    component: Cookbooks
  },
  {
    path: "/cookbooks",
    name: "allCookbooks",
    component: AllCookbooksVue
  },
  {
    path: "/users/:username/cookbooks/new",
    name: "createNewCookbook",
    component: CookbookCreate
  },
  {
    path: "/users/:username/cookbooks/:cid/edit",
    name: "editCookbook",
    component: CookbookEditVue
  },
  {
    path: "/users/:username/cookbooks/:cid",
    name: "userCookbook",
    component: Cookbook
  },
  {
    path: "/users/:username/cookbooks/:cid/create-new-recipe",
    name: "createNewRecipe",
    component: RecipeCreateVue
  },
  {
    path: "/users/:username/recipe/:rid/edit",
    name: "editUserRecipe",
    component: RecipeEditVue
  },
  {
    path: "/users/:username/recipe/:rid",
    name: "userRecipe",
    component: Recipe
  },
  { path: "/version", name: "Version", component: VersionVue },
  {
    path: "/",
    name: "WelcomePage",
    component: WelcomePage
  },
  {
    path: "*",
    component: NotFoundComponent
  }
];
</script>
