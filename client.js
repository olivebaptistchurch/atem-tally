const net = require('net');
const req = require('request');
const config = require('./config.json');
const { Path } = require('./util/client_helpers');

const client = new net.Socket();
const ProgramTallyPrevious = 1;
const PreviewTallyPrevious = 1;
const relayIP = '10.15.0.51';

Object.values(config.relaySettings).map((relay) => {
  if (relay.cameraInput === 5) {
    console.log(`http://${relayIP}${Path[`Relay${relay.relayOutput}On`]}`);
    req.get(`http://${relayIP}${Path[`Relay3Off`]}`);
    req.get(`http://${relayIP}${Path[`Relay${relay.relayOutput}On`]}`);
  }
});

// client.connect({ port: 59090, host: 'localhost' });
// client.on('data', (data) => {
//   const ProgramTally = parseInt(
//     data.toString('utf-8').slice(0, data.indexOf(';'))
//   );
//   const PreviewTally = parseInt(
//     data.toString('utf-8').slice(data.indexOf(';') + 1, -1)
//   );

//   if (ProgramTally != ProgramTallyPrevious) {
//     Object.values(config.relaySettings).map((relay) => {
//       if (relay.cameraInput == ProgramTally) {
//         console.log(Path[`${relayIP}Relay${relay.relayOutput}Off`]);
//       }
//     });
//   }

//   ProgramTallyPrevious = ProgramTally;
//   PreviewTallyPrevious = PreviewTally;
// });
