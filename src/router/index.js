import { createRouter, createWebHashHistory } from 'vue-router'
import Account from '../views/AccountView.vue'
const routes = [
  {
    path: '/',
    name: 'account',
    component: Account,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
  },
  // {
  //   path: '/allData',
  //   name: 'allData',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AllDataView.vue')
  // },
  {
    path: '/report',
    name: 'report',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ReportView.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router
