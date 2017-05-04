import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  // constructor(props) {
  //   super(props);


  //   this.state = {
  //     currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
  //     messages: [
  //       this.makeMessage('Has anyone seen my marbles?', 'Bob'),
  //       this.makeMessage('No, I think you lost them. You lost your marbles Bob. You lost them for good.', 'Anonymous')
  //     ]
  //   };
  // }
  
  constructor(props) {
    super(props);
      
    this.id = 1;
    
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }
  
  componentDidMount() {
    // console.log('componentDidMount <App />');
    // setTimeout(() => {
    //   console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);

    //In order to communicate using the WebSocket protocol, you need to create a WebSocket object
    this.ws = new WebSocket('ws://localhost:3001')
    console.log('Connected to server')

    //Establishthe connection and send the message 
    this.ws.onopen = (evt) => {
      console.log('Established connection!', evt);
      this.setupApp();
    }
    // reciving the messgae from server
    this.ws.onmessage = (evt) => {
      console.log('On message called! ', evt);
      var msg = JSON.parse(event.data);
      this.handleServerNewMessage(msg.content, msg.username)
    }
  }
  
  //Sending the last message ()
  setupApp() {
    const newMessage = this.makeMessage();
    console.log('sending up data: ' + newMessage);
    this.ws.send(JSON.stringify(newMessage));
    console.log('-----');
  }
  
  makeMessage(content, username = this.state.currentUser.name) {
    return { username, content };
  }

  handleServerNewMessage = (content, username) => {
    const addMessage = this.makeMessage(content, username);
    const messages = this.state.messages.concat(addMessage)
    this.setState({ messages });
  }
  
  sendMessageToServer = (content) => {
    const message = this.makeMessage(content);
    this.ws.send(JSON.stringify(message));
  }
  
  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser.name} sendMessage={this.sendMessageToServer}/>
      </div>
      )
  }
}

export default App;
