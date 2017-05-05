import React, {Component} from 'react';

class Message extends Component {
  render() {
    let messageClass = 'message';
    if (this.props.username === null){
      messageClass += ' system';
    }
    return (
      <div className={messageClass}>
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    )
  }
}

export default Message;