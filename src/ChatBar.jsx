import React, { PropTypes, Component} from 'react';

class ChatBar extends Component {
  static propTypes = {
    currentUser: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      userName: props.currentUser,
      content: ''
    }
  }
  
  onContent = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.sendMessage(this.state.content)
      this.state.content = '';
    }
  }

  render() {
    return (
        <footer className ='chatbar'>
          <input className='chatbar-username' placeholder={this.state.userName} />
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
