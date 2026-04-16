import axios from 'axios'
import keycloak from './keycloak'

const api = axios.create({
  baseURL: 'https://cernikiw3.chickenkiller.com/api/v1',
})

api.interceptors.request.use(
  async (config) => {
    try {
      await keycloak.updateToken(30)
      //Entonces de aca agarra el token de keycloack aparte tambien lo trae si se vence esta piola....
      if (keycloak.token) {
        localStorage.setItem('token', keycloak.token)
        config.headers.Authorization = `Bearer ${keycloak.token}`
        return config
      } else {
        localStorage.removeItem('token')
        keycloak.logout({
          redirectUri: window.location.origin,
        })
      }
    } catch (error) {
      console.error('La sesión expiró', error)
      //keycloak.login()
      keycloak.logout({
        redirectUri: window.location.origin,
      })
      return Promise.reject(error)
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
