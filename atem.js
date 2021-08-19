const { Atem } = require('atem-connection')
const net = require('net');
const { getAddress, handleError } = require('./util/helpers');

const myAtem = new Atem()
myAtem.on('info', console.log)
myAtem.on('error', console.error)

const switcherAddress = getAddress(process.argv);
const mixEffect = 0;

const programInput = () => (
  myAtem.state
    .video
    .mixEffects[mixEffect]
    .programInput
);

const previewInput = () => (
  myAtem.state
    .video
    .mixEffects[mixEffect]
    .previewInput
);

switcherAddress
  ? myAtem.connect(switcherAddress)
  : handleError("Please pass ip address (xx.xx.xx.xx) as argument");

const server = net.createServer((socket) => {
  myAtem.on('connected', () => {
    socket.write("Connected to switcher");
  })

  myAtem.on('stateChanged', (state, pathToChange) => {
    if (pathToChange.includes(`video.mixEffects.${mixEffect}.programInput`)) {
      socket.write(`${programInput()}\n`);
    }
  })
})

server.listen(59090);