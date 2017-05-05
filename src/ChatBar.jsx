import React, { PropTypes, Component} from 'react';

class ChatBar extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    sendNotification:PropTypes.func.isRequired,
    handleUserName: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      content: ''
    }
  }
  
  onContent = (event) => {
    this.setState({
      content: event.target.value
    });
  }
  
  onUser = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handleKeyPress = (event) => {
    if (event.key == 'Enter'){
      this.props.sendMessage(this.state.content)
      this.setState({
        content: ''
      });
    }
  }
  
  handleSubmitNotification = (event) => {
    if (event.key == 'Enter'){
      this.props.sendNotification(this.state.username)
    }
  }
  
  render = () => {
    return (
      <footer className ='chatbar'>
        <input
          className='chatbar-username' 
          placeholder={this.props.currentUser.name} 
          onKeyPress={this.handleSubmitNotification}
          onChange={this.onUser}
          value={this.state.username}
          />
          <input
            className='chatbar-message'
            placeholder='Type a message and hit ENTER'
            onKeyPress={this.handleKeyPress}
            onChange={this.onContent}
            value={this.state.content}
            />
      </footer>
    );
  }
}

export default ChatBar
