import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/signin",
    name: "Sign in",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/Signin.vue"),
  },
  {
    path: "/signup",
    name: "Sign up",

    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Signup.vue"),
  },
  {
    path: "/user",
    name: "User",

    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/statistic",
    name: "Statistic",

    component: () =>
      import(/* webpackChunkName: "statistic" */ "../views/Statistic.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/costentry",
    name: "Costentry",

    component: () =>
      import(/* webpackChunkName: "statistic" */ "../views/Costentry.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/signin");
  } else {
    next();
  }
});

export default router;
