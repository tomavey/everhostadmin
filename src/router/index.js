import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/admin/Welcome.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      requiresAuth: false
    },
  },  
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/auth/Signin.vue'),
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
    path: "/newproperty",
    name: "NewProperty",
    component: () => import(/* webpackChunkName: "newproperty" */ '../views/admin/NewProperty.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/propertieslist",
    name: "PropertiesList",
    component: () => import(/* webpackChunkName: "propertieslist" */ '../views/admin/PropertiesList.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/propertiesgallery/",
    name: "PropertiesGallery",
    component: () => import(/* webpackChunkName: "propertiesgallery" */ '../views/admin/PropertiesGallery.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/newpropertyinfodialog/:propertyId",
    name: "NewPropertyInfoDialog",
    component: () => import(/* webpackChunkName: "newpropertyinfodialog" */ '../views/admin/NewPropertyInfoDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/propertyinfodialog/:contentName",
    name: "PropertyInfoDialog",
    component: () => import(/* webpackChunkName: "propertyinfodialog" */ '../views/admin/PropertyInfoDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/newpropertycreatedialog",
    name: "NewPropertyCreateDialog",
    component: () => import(/* webpackChunkName: "newpropertycreatedialog" */ '../views/admin/NewPropertyCreateDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/newpropertycodedialog",
    name: "NewPropertyCodeDialog",
    component: () => import(/* webpackChunkName: "newpropertycodedialog" */ '../views/admin/NewPropertyCodeDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/instructionsdialog/:contentName",
    name: "InstructionsDialog",
    component: () => import(/* webpackChunkName: "instructionsdialog" */ '../views/admin/InstructionsDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/imagegallery",
    name: "ImageGallery",
    component: () => import(/* webpackChunkName: "imagegallery" */ '../views/admin/ImageGallery.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/imagegallerydialog",
    name: "ImageGalleryDialog",
    component: () => import(/* webpackChunkName: "imagegallerydialog" */ '../views/admin/ImageGalleryDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import(/* webpackChunkName: "users" */ '../views/admin/Users.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '*',
    name: 'wild',
    component: Welcome,
    meta: {
      requiresAuth: false
    },
  },  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  console.log("requiresAuth",requiresAuth)
  const currentUser = store.getters.user
  console.log('currentUser',currentUser)

  if (requiresAuth && !currentUser) next({ path: '/signin'})
  else if (!requiresAuth && currentUser) next()
  else if (!requiresAuth && !currentUser) next()
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
