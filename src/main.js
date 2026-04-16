import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'

import keycloak from './services/keycloak'

keycloak
  .init({
    //onLoad: 'login-required',
    onLoad: 'check-sso',
  })
  .then((authenticated) => {
    if (!authenticated) {
      //  window.location.reload()
      const app = createApp(App)

      app.use(createPinia())
      app.use(router)

      app.config.globalProperties.$keycloak = keycloak

      app.mount('#app')
    } else {
      localStorage.setItem('token', keycloak.token)
      console.log('¡Usuario autenticado con éxito!')

      const app = createApp(App)

      app.use(createPinia())
      app.use(router)

      app.config.globalProperties.$keycloak = keycloak

      app.mount('#app')
    }
  })
  .catch((error) => {
    console.error('Error al conectar con Keycloak:', error)
  })
