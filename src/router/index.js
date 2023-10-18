import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import TasksPlansView from '../views/elementView/TasksPlansView.vue'
import ImportantView from '../views/elementView/ImportantView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/TasksPlans',
    name: 'TasksPlans',
    component: TasksPlansView
  },

  {
    path: '/Important',
    name: 'Important',
    component: ImportantView
  },

  {
    path: '/',
    redirect: '/TasksPlans'
  }
]

const router = new VueRouter({
  routes
})

export default router
