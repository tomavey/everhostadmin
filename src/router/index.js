import Vue from 'vue'
import VueRouter from 'vue-router'
import Properties from '../views/Properties.vue'
import GuestData from '../views/GuestData.vue'
import MyAccount from '../views/MyAccount.vue'


import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Properties',
    component: Properties,
    meta: {
      requiresAuth: false
    },
  },  

  // {
  //   path: "/welcome",
  //   name: "Welcome",
  //   component: Welcome,
  //   meta: {
  //     requiresAuth: false
  //   },
  // },
  {
    path: "/guestdata",
    component: GuestData,
  },
  {
    path: "/myaccount",
    component: MyAccount,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
  
export default router
