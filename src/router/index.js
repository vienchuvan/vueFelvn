import QuanTri from '@/views/QuanTri.vue'
import TrangChu from '@/views/Home/TrangChu.vue'
import ChiTietBaiViet from '@/views/Home/ChiTietBaiViet.vue'
import { createRouter, createWebHistory } from 'vue-router'



const routes = [
 
     {
    path: '/',
    name: 'QuanTri',
    component: TrangChu
  },
  {
    path: '/admin',
    name: 'AdminApp',
    component: QuanTri
  },
    {
    path: '/chitiet',
    name: 'chitiet',
    component: ChiTietBaiViet
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router