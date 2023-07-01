import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
