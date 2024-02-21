import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

//Pages
import StudentView from "../views/StudentPage/LandingView.vue";
import CategoryView from "../views/CategoryPage/LandingView.vue";
import MatchingView from "../views/MatchPage/LandingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/Category",
      name: "Category",
      component: CategoryView,
    },
    {
      path: "/Student",
      name: "Student",
      component: StudentView,
    },
    {
      path: "/Matching",
      name: "Matching",
      component: MatchingView,
    },
  ],
});

export default router;
