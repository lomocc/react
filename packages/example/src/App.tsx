import React, { Component, RefObject } from "react";
import PortalManager from "react-portal-manager";
import logo from "./logo.svg";

export default class App extends Component {
  portalRef: RefObject<PortalManager> = React.createRef();
  onClick = () => {
    this.portalRef.current?.addPortal(
      <div style={{ color: "red" }}>portal</div>
    );
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <button onClick={this.onClick}>portal</button>
        <PortalManager ref={this.portalRef} />
      </div>
    );
  }
}
