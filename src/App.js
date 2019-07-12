import React from "react";
// import { default as Chatkit } from '@pusher/chatkit-server';
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
// import NewRoomForm from './components/NewRoomForm';
import { tokenUrl, instanceLocator } from "./config";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: "yui",
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log("error on Connecting: ", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error on JoinableRooms: ", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          console.log("recieved message: ", message.parts[0].payload.content);
          this.setState({
            messages: [...this.state.messages, message]
          });
        }
      }
    })
    .then(room => {
      this.setState({roomId: room.id})
      this.getRooms()
    })
    .catch(err => console.log("error on subscribe to room: ", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  render() {
    console.log("this.state.messages:", this.state.messages);
    return (
      <div className="App">
        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
