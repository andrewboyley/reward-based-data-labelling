import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Sign_up from "../views/Sign_up.vue";
import HomePage from "../views/HomePage.vue";
import ViewJob from "../views/ViewJob.vue";
import Landing from "../views/Landing.vue";
import CreateJob from "../components/CreateJob/CreateJob.vue";
import ViewJobs from "../views/ViewJobs.vue";
import store from "@/store";
import UserModule from "@/store/modules/user";
import { getModule } from "vuex-module-decorators";

const userMod = getModule(UserModule, store);

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Sign_up",
    name: "Sign_up",
    component: Sign_up,
  },
  {
    path: "/homePage",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/viewJob",
    name: "ViewJob",
    component: ViewJob,
    props: true,
  },
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/CreateJob",
    name: "CreateJob",
    component: CreateJob,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/view_jobs",
    name: "ViewJobs",
    component: ViewJobs,
  },
  // otherwise redirect to home
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (userMod.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;