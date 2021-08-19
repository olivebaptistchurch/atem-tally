const { Atem } = require('atem-connection')
const net = require('net');

class AtemExtender extends Atem {
  constructor() {
    super();
    
  }
}


const myAtem = new Atem()
myAtem.on('info', console.log)
myAtem.on('error', console.error)

myAtem.connect('10.15.0.104')

const server = net.createServer((socket) => {
  myAtem.on('connected', () => {
    socket.write(`${myAtem
        .state
        .video
        .mixEffects[0]
        .programInput}`)
  })

  myAtem.on('stateChanged', (state, pathToChange) => {
    if (pathToChange.includes("video.mixEffects.0.programInput")) {
      socket.write(`${myAtem
        .state
        .video
        .mixEffects[0]
        .programInput}`)
    }
  })
})

server.listen(59090);