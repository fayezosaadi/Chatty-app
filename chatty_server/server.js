const express = require('express')
const SocketServer = require('ws').Server
const PORT = 3001
const server = express()

.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });
const uuidV1 = require('uuid/v1')

function broadcast(data) {
  for(let ws of wss.clients) {
    ws.send(JSON.stringify(data));
  }
}

function handleMessage(data) {
  let clientMessage = JSON.parse(data);
  clientMessage.id = uuidV1();
  clientMessage.type = clientMessage.type.replace('post', 'incoming');
  broadcast(clientMessage);
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


