import React from "react";
import Emoji from "react-emoji-render";

class RoomList extends React.Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.id - b.id);
    return (
      <div className="room-list">
        <h3>
          <Emoji text=":mushroom:" />
          Chat Rooms
          <Emoji text=":mushroom:" />
        </h3>
        <ul>
          {orderedRooms.map(room => {
            const active = this.props.roomId === room.id ? "active" : "";
            return (
              <li key={room.id} className={"room " + active}>
                <a onClick={() => this.props.subscribeToRoom(room.id)} href="#">
                <Emoji text="🌈" />{room.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default RoomList;
