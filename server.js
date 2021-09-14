const { Atem } = require('atem-connection');
const net = require('net');
const { handleInput } = require('./util/atem_helpers');
const {
  getAddress,
  handleError,
  getMixEffect,
} = require('./util/server_helpers');

const myAtem = new Atem();
myAtem.on('info', console.log);
myAtem.on('error', console.error);

const switcherAddress = getAddress(process.argv);
const mixEffect = getMixEffect(process.argv) || 0;

switcherAddress
  ? myAtem.connect(switcherAddress)
  : handleError('Please pass ip address (xx.xx.xx.xx) as argument');

const server = net.createServer((socket) => {
  socket.setKeepAlive(true, 5);
  myAtem.on('connected', () => {
    socket.write('Connected to switcher\n');
  });

  myAtem.on('stateChanged', (state, pathToChange) => {
    handleInput(pathToChange, mixEffect, state, socket);
  });

  socket.on('error', () => {});

  socket.on('end', () => {
    console.log('Client Disconnected');
  });
});

server.listen(59090, () => {
  console.log('Server running at: localhost:59090');
});
