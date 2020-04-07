import pDefer from "p-defer";
import React, { Component, ReactElement, ReactPortal } from "react";
import ReactDOM from "react-dom";

interface Props {
  root?: Node;
}
interface State {
  children: ReactPortal[];
}
export default class PortalManager extends Component<Props, State> {
  static defaultProps = {
    root: document.body,
  };
  container: HTMLDivElement = document.createElement("div");
  state = {
    children: [],
  };
  componentDidMount() {
    const { root } = this.props;
    root?.appendChild(this.container);
  }

  componentWillUnmount() {
    const { root } = this.props;
    root?.removeChild(this.container);
  }

  addPortal = (element: ReactElement, key?: string) => {
    const deferred = pDefer();
    const portal = ReactDOM.createPortal(
      React.cloneElement(element, {
        resolve: deferred.resolve,
        reject: deferred.reject,
      }),
      this.container,
      key
    );
    this.setState(({ children }) => ({
      children: [...children, portal],
    }));
    const onFinally = () => {
      this.setState(({ children }) => ({
        children: children.filter((element) => element !== portal),
      }));
    };
    deferred.promise.then(onFinally, onFinally);
    return deferred;
  };
  render() {
    const { children } = this.state;
    return children;
  }
}
