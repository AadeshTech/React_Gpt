import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-primary">
          <span
            className="navbar-brand mb-0 h1 nav-head"
            style={{
              marginLeft: "43%",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "600",
              fontFamily: "fangsong",
            }}
          >
            AadeshTech-Gpt
          </span>
        </nav>
      </>
    );
  }
}
