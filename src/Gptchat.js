import React, { Component } from "react";
import axios from "axios";
import ChatBox, { ChatFrame } from "react-chat-plugin";
import loadingGif from './shared/XlO9.gif';

export default class Gptchat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: "",
      answer: "",
      messages: [],
      loader:false
    };
  }

  handleInputChange = (event) => {
    this.setState({ prompt: event.target.value });
  };

  handleOnSendMessage = (message) => {
    this.setState({loader: true});
    if (this.state) {
      // var message = this.state.prompt;
      this.setState({
        messages: this.state.messages.concat({
          author: {
            username: "You",
            id: 1,
            avatarUrl:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
          },
          text: message,
          timestamp: +new Date(),
          type: "text",
        }),
      });

      var prompt = this.state.prompt;
      axios
        .post("http://localhost:8080/chat", { message })
        .then((response) => {
          this.setState({loader:false});
          this.setState({ answer: response.data });
          this.setState({
            messages: this.state.messages.concat({
              author: {
                username: "ReactGpt",
                id: 2,
                avatarUrl:
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
              },
              text: response.data,
              timestamp: +new Date(),
              type: "text",
            }),
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <>
        {/* <div className="input-group mb-3 chatBox">
          <input
            type="text"
            className="form-control"
            placeholder="Ask your question here..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handleInputChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              style={{ backgroundColor: "#0d6efd", color: "white" }}
              onClick={this.handleButtonClick}
            >
              Submit
            </button>
          </div>
        </div>

        <h5 style={{textAlign: "initial",
                    margin: "0% 0% -1.5% 2%"}}>your Answer here..</h5>
        <div className="answerBox">
          <p style={{textAlign: "initial"}}>{this.state ? this.state.answer : "Loading..."}</p>
        </div> */}
       {this.state.loader ? (
       <img className="loading-gif" src={loadingGif} alt="loading..." />
       ):('')}
        <ChatBox
          messages={this.state.messages}
          userId={1}
          onSendMessage={this.handleOnSendMessage}
          height={"37rem"}
          width={"95%"}
        />
        ;
      </>
    );
  }
}
