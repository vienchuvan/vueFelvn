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
    path: '/bai-viet/:slug',
    name: 'BaiVietChiTiet',
    component: ChiTietBaiViet
  },
  //  {path: '/gioi-thieu', name: 'GioiThieu', component: () => import('@/views/Home/GioiThieu.vue')},
  {path: '/dich-vu', name: 'ServicesOverview', component: () => import('@/views/Home/DichVu2.vue')},
    {path: '/tin-tuc', name: 'NewsOverview', component: () => import('@/views/Home/TinTuc.vue')},
      {path: '/lien-he', name: 'ContactSection', component: () => import('@/views/Home/LienHe.vue')},
      {path: '/test', name: 'HomePage', component: () => import('@/views/Home/test.vue')},
  {
    path: '/:slug',
    name: 'BaiVietChiTietTheoMenu',
    component: ChiTietBaiViet
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router