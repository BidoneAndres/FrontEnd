import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductoView from '@/views/ProductoView.vue'
import LoginView from '@/views/LoginView.vue'
import ClienteView from '@/views/ClienteView.vue'
import ChoferView from '@/views/ChoferView.vue'
import CamionView from '@/views/CamionView.vue'
import ConciliacionView from '@/views/ConciliacionView.vue'
import OrdenMonitorView from '@/views/OrdenMonitorView.vue'
import ConciliacionDetailComponent from '@/components/ConciliacionDetailComponent.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/productos',
      name: 'Producto',
      component: ProductoView,
    },
    {
      path: '/clientes',
      name: 'Cliente',
      component: ClienteView,
    },
    {
      path: '/choferes',
      name: 'Chofer',
      component: ChoferView,
    },
    {
      path: '/camiones',
      name: 'Camion',
      component: CamionView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/conciliaciones',
      name: 'Conciliacion',
      component: ConciliacionView,
    },
    {
      path: '/conciliaciones/:id',
      name: 'conciliacion-detail',
      component: ConciliacionDetailComponent,
      props: true, 
    },
    {
      path: '/monitor/:id',
      name: 'monitor',
      component: OrdenMonitorView,
      props: true
    },

  ],
})

export default router
