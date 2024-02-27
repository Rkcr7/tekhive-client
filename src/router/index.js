import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/loginSignUpView.vue";
import friends from "../views/friendsView.vue";
import dashboard from "../views/dashboardView.vue";
import profile from "../views/profileView.vue";
import chat from "../views/chatView.vue";
// import notifications from "../views/Notifications.vue"
import Notifications from "../views/Notifications.vue";
import test from "../views/test.vue";
import chattest from "../views/chattest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: dashboard,
    },
    {
      path: "/notifications",
      name: "Notifications",
      component: Notifications,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/friends",
      name: "Friends",
      component: friends,
    },
    {
      path: "/profile",
      name: "Profile",
      component: profile,
    },
    {
      path: "/chat",
      name: "Chat",
      component: chat,
    },
    {
      path: "/test",
      name: "test",
      component: test,
    },
    {
      path: "/chatest",
      name: "chatttest",
      component: chattest,
    },
    {
      path: "/chat/:friendId",
      name: "chat",
      component: chat,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
