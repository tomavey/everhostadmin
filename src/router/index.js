import Vue from 'vue'
import VueRouter from 'vue-router'
import Properties from '../views/Properties.vue'
import GuestData from '../views/GuestData.vue'
import Feedbacks from '../views/Feedbacks.vue'
import MyAccount from '../views/MyAccount.vue'
import Users from '../views/admin/Users.vue'
import EmailToSend from '../views/admin/EmailToSend.vue'
import Organizations from '../views/admin/Organizations.vue'
import UpdatesLog from '../views/admin/UpdatesLog.vue'
import Firebase from 'firebase'


import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Properties',
    component: Properties,
    meta: {
      requiresAuth: true
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
    name: "GuestData",
    component: GuestData,
    meta: {
      requiresAuth: false
    },
  },
  {
    path: "/feedbacks",
    name: "Feedbacks",
    component: Feedbacks,
    meta: {
      requiresAuth: false
    },
  },
  {
    path: "/myaccount",
    component: MyAccount,
  },
  {
    path: "/users",
    component: Users,
  },
  {
    path: "/organizations",
    component: Organizations,
  },
  {
    path: "/emailtosend",
    component: EmailToSend,
  },
  {
    path: "/updateslog",
    component: UpdatesLog,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach( (to, from, next) => {
//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   console.log("requiresAuth",requiresAuth)
//   const currentUser = store.getters.user
//   console.log('currentUser',currentUser)

//   if (requiresAuth && !currentUser) next({ path: '/signin'})
//   else if (!requiresAuth && currentUser) next()
//   else if (!requiresAuth && !currentUser) next()
//   else next()
// })

// router.beforeEach( (to, from, next) => {
//   const currentUser = store.getters.user
//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   console.log('currentUser',currentUser)
//   console.log('currentUser', !currentUser )
//   console.log(to.name)
//   if (!currentUser && requiresAuth) next({ path: '/signin'})
//   else next()
// })


//Tried all these authguards - some did not register authentication soon enough
// router.beforeEach( (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const isAuthenticated = firebase.auth().currentUser
//   console.log("RouteName", to.name)
//   console.log("requiresAuth",requiresAuth)
//   console.log("isAuthenticated",isAuthenticated)
//   if (requiresAuth && !isAuthenticated){
//     console.log("Authorized",store.getters.user.loggedIn)
//     router.push({ name: 'Signin' }).catch( () => {} )
//   } else {
//     next();
//   }
// })

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   console.log("requiresAuth",requiresAuth)
//   if (requiresAuth && !await store.getters.user.loggedIn){
//     console.log("Authorized",store.getters.user.loggedIn)
//     router.push({ name: 'Signin' }).catch( () => {} )
//   } else {
//     next();
//   }
// })

// router.beforeEach((to, from, next) => {
//   let isAuthenticated = store.getters.user.loggedIn
//   if (to.name !== 'Signin' && !isAuthenticated) next({ name:    'Signin' })
//   else next()
// })

// router.beforeEach((to, from, next) => {
//   let isAuthenticated = store.getters.user.loggedIn
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       console.log("is not authenticated")
//       next({name: "Signin"})
//     } else {
//       console.log("is authenticated")
//       next()
//     }
//   } else {
//     console.log("does not require authentication")
//     next()
//   }
// })
  
export default router
