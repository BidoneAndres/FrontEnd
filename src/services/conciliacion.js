import api from './api'

export function getConciliaciones() {
  return api.get('/conciliacion')
}

export function getConciliacionesDetail(id) {
  return api.get(`/conciliacion/detail/${id}`)
}

