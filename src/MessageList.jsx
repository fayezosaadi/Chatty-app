import React, { PropTypes, Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  }

  render() {
    const messages = this.props.messages.map(message => (
      <Message
        key={ message.id }
        username={ message.username }
        content={ message.content } />
      )
    );
    return (
      <main className="messages">
        { messages }
      </main>
    );
  }
}

export default MessageList;