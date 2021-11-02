import fb from "firebase"

// import store from '../store'

// export default (to, from, next) => {
//   if (store.getters.user) {
//     next()
//   } else {
//     next('/signin')
//   }
// }

export default (to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth.currentUser

  if (requiresAuth && !currentUser) next({ path: '/signin', query: { redirect: to.fullPath } })
  else if (!requiresAuth && currentUser) next({name: "Admin"})
  else if (!requiresAuth && !currentUser) next()
  else next()
}
