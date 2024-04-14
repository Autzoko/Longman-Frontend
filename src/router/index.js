import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePage from "@/views/HomePage.vue";
import WarehouseManagers from "@/views/WarehouseManagers.vue";
import LoginView from "@/views/LoginView.vue";
import FileUploadView from "@/views/FileUploadView.vue";

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/warehouse-managers',
    name: 'WarehouseManagers',
    component: WarehouseManagers
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/upload-file',
    name: 'FileUploadView',
    component: FileUploadView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
