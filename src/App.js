import React from "react";
// import { default as Chatkit } from '@pusher/chatkit-server';
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
// import RoomList from './components/RoomList';
// import NewRoomForm from './components/NewRoomForm';
import { tokenUrl, instanceLocator } from "./config";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: "yui",
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      currentUser.subscribeToRoomMultipart({
        roomId: "19424381",
        hooks: {
          onMessage: message => {
            console.log("recieved message: ", message.parts[0].payload.content);
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: "19424381"
    });
  }

  render() {
    console.log("this.state.messages:", this.state.messages);
    return (
      <div className="App">
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
