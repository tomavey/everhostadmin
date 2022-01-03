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

router.beforeEach( (to, from, next) => {
  const currentUser = store.getters.user
  console.log('currentUser',currentUser)
  console.log('currentUser', !currentUser )
  console.log(to.name)
  if (!currentUser) next({ path: '/signin'})
  else next()
})


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
