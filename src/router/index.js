import { createRouter, createWebHistory } from "vue-router";
import NewUserView from "../views/NewUserView.vue";
import SplashScreenView from "../views/SplashScreenView.vue"
const routes = [
  {
    path: "/",
    name: "default",
    component: SplashScreenView,
    meta: { showNavBar: false },
  },
  {
    path: "/new-user",
    name: "new-user",
    component: NewUserView,
    meta: { showNavBar: false },
  },
  {
    path: "/new-wallet",
    name: "new-wallet",
    component: () => import("../views/NewWalletView.vue"),
    meta: { showNavBar: false },
  },
  {
    path: "/import-wallet",
    name: "import-wallet",
    component: () => import("../views/ImportWalletView.vue"),
    meta: { showNavBar: false },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/SignupView.vue"),
    meta: { showNavBar: false },
  },
  {
    path: "/pay",
    name: "pay",
    component: () => import("../views/PaymentView.vue"),
  },
  {
    path: "/bank",
    name: "bank",
    component: () => import("../views/BankView.vue"),
  },
  {
    path: "/wallet",
    name: "wallet",
    component: () => import("../views/WalletView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/new-pfp",
    name: "new-pfp",
    meta: { showNavBar: false },
    component: () => import("../views/NewPfpView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { showNavBar: false },
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
