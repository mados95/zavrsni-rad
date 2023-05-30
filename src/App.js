import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "Pero", "Đuro", "Ratko", "Ivan", "Steve", "Josip", "Marko", "Mario", "Dalibor", "Branimir", "Darko", "Dejan"
  ];    
    
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  return adjective;
}
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFF00).toString(16);
}

class Test extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("9iGlQL1k55G8iTfj", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="Test">
        <div className="Naziv">
          <h1>Razgovor</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default Test;

