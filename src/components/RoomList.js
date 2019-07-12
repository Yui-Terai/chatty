import React from "react";

class RoomList extends React.Component {
  render() {
    console.log(this.props.rooms);
    return (
      <div className="room-list">
        <h1>your ROOMS</h1>
        <ul>
          {this.props.rooms.map(room => {
            return (
              <li key={room.id}>
                <a onClick={() => this.props.subscribeToRoom(room.id)} href="#">
                  {room.name}
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
