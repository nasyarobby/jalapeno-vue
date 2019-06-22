<template>
  <v-app>
    <v-navigation-drawer app floating temporary v-model="drawer"></v-navigation-drawer>
    <v-toolbar app color="primary" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Jalapeno</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/login" v-if="!isSignedIn">Sign in</v-btn>
        <v-btn flat to="/logout" v-if="isSignedIn">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import VueRouter from "vue-router";
import Registration from "./components/Registration.vue";
import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import WelcomePage from "./components/WelcomePage.vue";
import NotFoundComponent from "./components/NotFoundComponent.vue";
import EmailVerificationVue from "./components/EmailVerification.vue";

const routes = [
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
    path: "/",
    name: "WelcomePage",
    component: WelcomePage
  },
  {
    path: "*",
    component: NotFoundComponent
  }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jtoken") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("jtoken") == null) {
      next();
    } else {
      next({ name: "userProfile" });
    }
  } else {
    next();
  }
});

export default {
  name: "App",
  router: router,
  components: {},
  data() {
    return {
      isSignedIn: false,
      drawer: false
    };
  },
  watch: {
    $route(to, from) {
      this.isSignedIn = localStorage.getItem("jtoken") != null;
    }
  },
  mounted() {
    this.isSignedIn = localStorage.getItem("jtoken") != null;
  }
};
</script>
