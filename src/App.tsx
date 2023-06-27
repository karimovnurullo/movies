import React, { Component } from "react";
import { Header, Home } from "./components";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
      </div>
    );
  }
}
