const express = require('express')
const SocketServer = require('ws').Server
const PORT = 3001
const server = express()

.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const _ = require ('lodash')
const uuidV1 = require('uuid/v1')

function broadcast(data) {
  for(let ws of wss.clients) {
    ws.send(JSON.stringify(data));
  }
}

function handleMessage(data) {
  let clientMessage = JSON.parse(data);
  switch(clientMessage.type) {
    case 'postMessage': {
      delete clientMessage.type;
      let serverMessage = _.merge({ type: 'incomingMessage' }, { id: uuidV1()},clientMessage);
      broadcast(serverMessage);
      break;
    }
    case 'postNotification':
      delete clientMessage.type;
      let serverNotification = _.merge({ type: 'incomingNotification' },{id:uuidV1()} ,clientMessage);
      broadcast(serverNotification);
      break;
    default: {
      throw new Error('Unknown event type ' + data.type);
    }
  }
}

wss.on('connection', (ws) => {
  let onlineUsers = {type: 'onlineusers', number: wss.clients.size};
  
  broadcast(onlineUsers);
  
  ws.on('message', handleMessage);
  
  ws.on('close', () => {
    let onlineUsers = {type: 'onlineusers', number: wss.clients.size};
    broadcast(onlineUsers);
  })
});


