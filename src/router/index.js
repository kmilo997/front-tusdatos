import Vue from 'vue'
import VueRouter from 'vue-router'
import PageLogin from '../views/PageLogin.vue'
import PageRegister from '../views/PageRegister.vue'
import PageEvents from '../views/PageEvents.vue'
import PageResources from '../views/PageResources.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: PageLogin,
  },
  {
    path: '/login',
    name: 'login',
    component: PageLogin,
  },
  {
    path: '/register',
    name: 'register',
    component: PageRegister,
  },
  {
    path: '/events',
    name: 'events',
    component: PageEvents,
    meta: { requiresAuth: true },
  },
  {
    path: '/resources',
    name: 'resources',
    component: PageResources,
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
