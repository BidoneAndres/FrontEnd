import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductoView from '@/views/ProductoView.vue'
import LoginView from '@/views/LoginView.vue'
import ClienteView from '@/views/ClienteView.vue'
import ChoferView from '@/views/ChoferView.vue'
import CamionView from '@/views/CamionView.vue'
import ConciliacionView from '@/views/ConciliacionView.vue'
import OrdenMonitorView from '@/views/OrdenMonitorView.vue'
import ListaDeOrdenes from '@/views/ListaDeOrdenes.vue'
import ConciliacionDetailView from '@/views/ConciliacionDetailView.vue'
import SinPermisos from '@/views/SinPermisos.vue';


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
      component: ConciliacionDetailView,
      props: true,
    },
    {
      path: '/monitor/:id',
      name: 'monitor',
      component: OrdenMonitorView,
      props: true
    },
    {
      path: '/home',
      name: 'ordenes',
      component: ListaDeOrdenes
    },
    {
    path: '/sin-permisos',
    name: 'SinPermisos',
    component: SinPermisos,
    }

  ],
})

export default router
