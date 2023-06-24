import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: () => import('../views/EditProduct.vue')
  },
  {
    path: '/users/',
    name: 'UsersTable',
    component: () => import('../views/UsersTable.vue')
  },
  {
    path: '/orders/',
    name: 'orders',
    component: () => import('../views/OrdersView.vue')
  },
  {
    path: '/information/about/',
    name: 'about',
    component: () => import('../views/info/AboutEditView.vue')
  },
  {
    path: '/information/contacts/',
    name: 'contacts',
    component: () => import('../views/info/ContactsEditView.vue')
  },
  {
    path: '/information/news/',
    name: 'news',
    component: () => import('../views/info/NewsEditView.vue')
  },
  {
    path: '/information/waranty/',
    name: 'waranty',
    component: () => import('../views/info/WarantyEditView.vue')
  },
  {
    path: '/information/social-link/',
    name: 'social',
    component: () => import('../views/info/SocialEditView.vue')
  },
  {
    path: '/order/:id',
    name: 'orderView',
    component: () => import('../views/OrderView.vue')
  },
  {
    path: '/categories-manager/',
    name: 'categoryManager',
    component: () => import('../views/CategoryManager.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
