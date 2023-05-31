import React, { Component } from "react";

class Input extends Component {
  state = {
    text: "",
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    
    if (this.state.text.trim() === "") {
      alert("Upišite poruku.");
      return;
    }
    
    this.props.onSendMessage(this.state.text);
    this.setState({ text: "" });
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Upiši tekst i pošalji"
            autoFocus={true}
          />
          <button type="submit">Pošalji</button>
        </form>
      </div>
    );
  }
}

export default Input;