import axios from 'axios'
import keycloak from './keycloak'
import router from '@/router';


console.log('API INSTANCE CARGADA');

const api = axios.create({
  baseURL: 'https://cernikiw3.chickenkiller.com/api/v1',
  responseType: 'text',
  transformResponse: [(data) => data]
});


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

api.interceptors.response.use(
  (response) => response,
  (error) => {

    console.log('ERROR COMPLETO:', error);


    const status = error.response?.status;

    if (status === 403) {
      console.log('403 DETECTADO (normal)');
      router.push('/sin-permisos');
    }

    if (status === 401) {
      keycloak.login();
    }


    if (!error.response) {
      console.log('ERROR SIN RESPONSE');

      if (error.message?.includes('403')) {
        console.log('403 DETECTADO (fallback)');
        router.push('/sin-permisos');
      }
    }

    return Promise.reject(error);
  }
);
export default api;
