import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import VueRouter from 'vue-router'
import axios from 'axios';
import VueCookies from 'vue-cookies';
import Vuex from 'vuex';

Vue.use(VueRouter)
Vue.use(axios)
Vue.use(Vuex)
Vue.use(VueCookies);

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    user:{},
    accesstoken:"" },
    getters:
        {
          USER: state => {
            return state.user;
          },
          ACCESSTOKEN: state => {
            return state.accesstoken;
          }
        },
    mutations:
        {
      SET_USER(state, content)
      {
        state.user = content;
      },
      SET_ACCESSTOKEN(state, content)
      {
        state.accesstoken = content;
      }
    }
  }
)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");