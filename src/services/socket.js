import SockJS from 'sockjs-client/dist/sockjs.min.js'
import { Client } from '@stomp/stompjs'

let stompClient = null

export function connectSocket(numeroOrden, token, callback) {

  const socket = new SockJS('http://localhost:8080/temperaturas')

  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`
    },
    onConnect: () => {
      console.log(" WS conectado y funcionando")

      stompClient.subscribe(
        `/topic/monitor/${numeroOrden}`,
        (message) => {
          console.log("Mensaje Recibido:", message.body)
          callback(JSON.parse(message.body))
        }
      )
    },
    onStompError: (frame) => {
      console.error("STOMP error:", frame)
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