const { Atem } = require('atem-connection')
const net = require('net');
const { checkProgram, checkPreview } = require('./util/atem_helpers');
const { getAddress, handleError, getMixEffect } = require('./util/helpers');

const myAtem = new Atem()
myAtem.on('info', console.log)
myAtem.on('error', console.error)

const switcherAddress = getAddress(process.argv);
const mixEffect = getMixEffect(process.argv) || 0;

switcherAddress
  ? myAtem.connect(switcherAddress)
  : handleError("Please pass ip address (xx.xx.xx.xx) as argument");

const server = net.createServer((socket) => {
  myAtem.on('connected', () => {
    socket.write("Connected to switcher");
  })

  myAtem.on('stateChanged', (state, pathToChange) => {
    checkProgram(pathToChange, mixEffect, state, socket) ||
    checkPreview(pathToChange, mixEffect, state, socket)
  })
})

server.listen(59090);