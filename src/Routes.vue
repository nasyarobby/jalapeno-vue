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
    path: "/users/:username/cookbooks/:cid",
    name: "userCookbook",
    component: Cookbook
  },
  {
    path: "/create-new-cookbook",
    name: "createNewCookbook",
    component: CookbookCreate
  },
  {
    path: "/users/:username/recipe/:rid",
    name: "userRecipe",
    component: Recipe
  },
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
