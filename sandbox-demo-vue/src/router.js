import Vue from "vue";
import VueRouter from "vue-router";

import User from "./components/users/index.vue";
import Test from "./components/test/index.vue";
import LineComponent from './components/line/index.vue';
import wordCloud from './components/wordcloud/index.vue';
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/user",
      component: User
    },
    {
      path: "/test/:id",
      component: Test
    },
    {
      path: '/line',
      component: LineComponent
    },
    {
      path: '/wordcloud',
      component:wordCloud
    }
  ]
});
export default router;
