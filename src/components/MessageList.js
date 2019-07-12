import React from "react";

// const dummy = [
//   {
//     senderId: "yui",
//     text: "hey, whats up"
//   },
//   {
//     senderId: "miguel",
//     text: "yo yo"
//   },
//   {
//     senderId: "mario",
//     text: "muy bien"
//   }
// ];
class MessageList extends React.Component {
  render() {
    return (
      <div className="message-list">
        {/* {dummy.map((message, index) => {
          return (
            <div>
              <div> {message.senderId}</div>
              <div>{message.text}</div>
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default MessageList;
