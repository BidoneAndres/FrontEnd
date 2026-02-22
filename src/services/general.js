import api from './api'

export function getClientes() {
  return api.get('/general/cliente')
}

export function getProductos() {
  return api.get('/general/producto')
}

export function getChoferes() {
  return api.get('/general/chofer')
}
export function getCamiones() {
  return api.get('/general/camion')
}
