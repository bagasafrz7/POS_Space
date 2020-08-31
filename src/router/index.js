import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeSelect from '../views/HomeSelect.vue'
import History from '../views/History.vue'
import ManageProduct from '../views/ManageProduct.vue'
import ContentCategory from '../views/ManageCategory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home-select',
    name: 'HomeSelect',
    component: HomeSelect
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/manage-product',
    name: 'ManageProduct',
    component: ManageProduct
  },
  {
    path: '/manage-category',
    name: 'ContentCategory',
    component: ContentCategory
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
