import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/admin/Index.vue'
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: false
    },
  },  
  {
    path: '/signin',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/auth/Signin.vue')
  },
  {
    path: "welcome",
    name: "Welcome",
    component: () => import(/* webpackChunkName: "welcome" */ '../views/admin/Welcome.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/newproperty",
    name: "NewProperty",
    component: () => import(/* webpackChunkName: "newproperty" */ '../views/admin/NewProperty.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "propertieslist",
    name: "PropertiesList",
    component: () => import(/* webpackChunkName: "propertieslist" */ '../views/admin/PropertiesList.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "newpropertyinfodialog/:contentName",
    name: "NewPropertyInfoDialog",
    component: () => import(/* webpackChunkName: "newpropertyinfodialog" */ '../views/admin/NewPropertyInfoDialog.vue'),
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
    path: "newpropertycodedialog",
    name: "NewPropertyCodeDialog",
    component: () => import(/* webpackChunkName: "newpropertycodedialog" */ '../views/admin/NewPropertyCodeDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "instructionsdialog/:contentName",
    name: "InstructionsDialog",
    component: () => import(/* webpackChunkName: "instructionsdialog" */ '../views/admin/InstructionsDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "imagegallery",
    name: "ImageGallery",
    component: () => import(/* webpackChunkName: "imagegallery" */ '../views/admin/ImageGallery.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "imagegallerydialog",
    name: "ImageGalleryDialog",
    component: () => import(/* webpackChunkName: "imagegallerydialog" */ '../views/admin/ImageGalleryDialog.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "users",
    name: "Users",
    component: () => import(/* webpackChunkName: "users" */ '../views/admin/Users.vue'),
    meta: {
      requiresAuth: true
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   console.log(to)
//   if (requiresAuth && !await store.getters.user.loggedIn){
//     next({name:'Admin'});
//   } else {
//     next();
//   }})

router.beforeEach((to, from, next) => {
  let isAuthenticated = store.getters.user.loggedIn
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next()
      return
    }
    next('/admin')
  }
  next()
})
  
export default router
