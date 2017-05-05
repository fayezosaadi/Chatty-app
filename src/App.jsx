import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'anonymous'},
      messages: [],
      notification:'', 
      onlineUsers:''
    };
  }

  componentDidMount() {
    this.ws = new WebSocket('ws://localhost:3001')
    this.ws.onopen = () => {}
    this.ws.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      switch(msg.type) {
        case 'incomingMessage': {
          this.handleServerNewMessage(msg.content, msg.username)
          break;
        }
        case 'incomingNotification': {
          this.handleServerNotification(msg)
          break;
        }
        case 'onlineusers':
          this.handleOnlineUsers(msg.number)
          break;
        default: {
        throw new Error('Unknown event type ' + msg.type);
        }
      }
    }
  }

  sendMessageToServer = (content) => {
    const message = this.makeMessage(content);
    this.ws.send(JSON.stringify(message));
  }

  makeMessage(content, username = this.state.currentUser.name) {
    return { type: 'postMessage', username, content };
  }

  sendNotificationToServer = (content) => {
    if (content !== this.state.currentUser.name) {
      const notification = this.makeNotification(content);
      this.handleUserName(content);
      this.ws.send(JSON.stringify(notification));
    }
  }
  
  makeNotification(content) {
    return { type: 'postNotification', username: null, content: `${this.state.currentUser.name} has changed their name to ${content}`};
  }
  
  handleServerNewMessage = (content, username) => {
    const addMessage = this.makeMessage(content, username);
    const messages = this.state.messages.concat(addMessage)
    this.setState({ messages });
  }

  handleServerNotification = (notification) => {
    const messages = this.state.messages.concat(notification)
    this.setState({ messages });
  }
  
  handleOnlineUsers = (msg) => {
    this.setState({ onlineUsers: msg });
  }
  
  handleUserName = (username) => {
    this.setState({
      currentUser: {
        name: username
      }
    });
  }
  
  render() {
    const userText = (this.state.onlineUsers > 1 ? 'users' : 'user');
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <div className='connected'> {this.state.onlineUsers} {userText} online</div>
        </nav>
        <MessageList messages={this.state.messages} notification={this.state.notification}/>
        <ChatBar handleUserName={this.handleUserName} currentUser={this.state.currentUser} sendMessage={this.sendMessageToServer} sendNotification={this.sendNotificationToServer}/>
      </div>
    )
  }
}

export default App;
  



