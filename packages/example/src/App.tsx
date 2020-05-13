import React, { Component, RefObject } from "react";
import PortalManager from "react-portal-manager";
import Layer from "reactlayer";
import logo from "./logo.svg";

export default class App extends Component {
  portalRef: RefObject<PortalManager> = React.createRef();
  layerRef: RefObject<Layer> = React.createRef();
  onClick = () => {
    this.portalRef.current?.addPortal(
      <div style={{ color: "red" }}>portal</div>
    );
  };
  onLayerClick = async () => {
    let deferred = this.layerRef.current?.render((deferred) => (
      <div style={{ color: "blue" }}>Layer</div>
    ));
    deferred?.resolve([1, 2]);
    let data = await deferred?.promise;
    console.log(deferred, data);
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
        <button onClick={this.onLayerClick}>layer</button>
        <PortalManager ref={this.portalRef} />
        <Layer ref={this.layerRef} />
      </div>
    );
  }
}
