import SockJS from 'sockjs-client/dist/sockjs.min.js'
import { Client } from '@stomp/stompjs'

let stompClient = null

export function connectSocket(numeroOrden, token, callback) {

  const socket = new SockJS('https://cernikiw3.chickenkiller.com/temperaturas')

  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`
    },
    onConnect: () => {
      console.log("WS conectado para orden:", numeroOrden)

      // Suscribirse a varios topics para compatibilidad con backend
      const topics = [
        `/topic/monitor/${numeroOrden}`,
        `/topic/carga/${numeroOrden}`,
        `/topic/carga${numeroOrden}`
      ]

      topics.forEach((topic) => {
        try {
          stompClient.subscribe(topic, (message) => {
            const data = JSON.parse(message.body)
            console.log(`WebSocket recibido en ${topic} - Data:`, JSON.stringify(data, null, 2))
            // logs resumidos
            console.log('   - numeroOrden:', data.numeroOrden)
            console.log('   - estado:', data.estado)
            console.log('   - inicioCarga:', data.inicioCarga)
            console.log('   - finCarga:', data.finCarga)
            console.log('   - temperatura:', data.temperatura)
            console.log('   - caudal:', data.caudal)
            console.log('   - densidad:', data.densidad)
            console.log('   - pesoInicial:', data.pesoInicial)
            callback(data)
          })
          console.log('Suscrito a', topic)
        } catch (e) {
          console.warn('No se pudo suscribir a', topic, e)
        }
      })
    },
    onStompError: (frame) => {
      console.error(" STOMP error:", frame)
    }
  })

  stompClient.activate()
}

export function disconnectSocket() {
  if (stompClient) {
    stompClient.deactivate()
    stompClient = null
  }
}
