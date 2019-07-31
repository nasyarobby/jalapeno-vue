<template>
  <v-app>
    <v-navigation-drawer app floating temporary v-model="drawer">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.href">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import VueRouter from "vue-router";
import routes from "./Routes.vue";

const router = new VueRouter({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
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
      drawer: false,
      menuItems: [
        { title: "Home", icon: "home", href: "/" },
        { title: "Cookbook", icon: "chrome_reader_mode", href: "/cookbooks/" },
        { title: "Meal Planning", icon: "event" },
        { title: "Groceries", icon: "shopping_basket" },
        { title: "Account", icon: "account_circle" }
      ]
    };
  },
  watch: {
    $route() {
      this.isSignedIn = localStorage.getItem("jtoken") != null;
    }
  },
  mounted() {
    this.isSignedIn = localStorage.getItem("jtoken") != null;
  }
};
</script>
