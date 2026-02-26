import SockJS from 'sockjs-client/dist/sockjs.min.js'
import { Client } from '@stomp/stompjs'

let stompClient = null

export function connectSocket(numeroOrden, token, callbackDatos,callbackAlarma) {

  const socket = new SockJS('https://cernikiw3.chickenkiller.com/temperaturas')

  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`
    },
    onConnect: () => {
      console.log("WS conectado para orden:", numeroOrden)

      const topics = [
        `/topic/monitor/${numeroOrden}`,
        '/topic/orden',
        `/topic/carga/${numeroOrden}`,

        //`/topic/carga${numeroOrden}`
      ]

      topics.forEach((topic) => {
        try {
          stompClient.subscribe(topic, (message) => {
            const data = JSON.parse(message.body)
            console.log(`WebSocket recibido en ${topic} - Data:`, JSON.stringify(data, null, 2))
            console.log('   - numeroOrden:', data.numeroOrden)
            console.log('   - estado:', data.estado)
            console.log('   - inicioCarga:', data.inicioCarga)
            console.log('   - finCarga:', data.finCarga)
            console.log('   - temperatura:', data.temperatura)
            console.log('   - caudal:', data.caudal)
            console.log('   - densidad:', data.densidad)
            console.log('   - pesoInicial:', data.pesoInicial)
            // Ejecutamos el callback original
          if (callbackDatos) callbackDatos(data)
          })
          console.log('Suscrito a', topic)
        } catch (e) {
          console.warn('No se pudo suscribir a', topic, e)
        }
      })

      const topicAlarmas = `/topic/alarmas/Orden/${numeroOrden}`;
      try {
        stompClient.subscribe(topicAlarmas, (message) => {
          const dataAlarma = JSON.parse(message.body)
          console.log(`🚨 ALARMA recibida en ${topicAlarmas}:`, dataAlarma)

          // Ejecutamos el nuevo callback específico para alarmas
          if (callbackAlarma) callbackAlarma(dataAlarma)
        })
        console.log('Suscrito a', topicAlarmas)
      } catch (e) {
        console.warn('No se pudo suscribir a', topicAlarmas, e)
      }

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
