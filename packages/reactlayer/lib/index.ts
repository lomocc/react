import pDefer, { DeferredPromise } from "p-defer";
import { Component, ReactElement, ReactNode, ReactPortal } from "react";
import ReactDOM from "react-dom";

export interface Props {
  deferred?: DeferredPromise<unknown>;
  [key: string]: any;
  root?: Node;
}
export interface LayerComponentProps extends Props {}

interface State {
  children: ReactPortal[];
}
export default class Layer extends Component<LayerComponentProps, State> {
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

  render(): ReactNode;
  render<ValueType = unknown>(
    createElement: (deferred: DeferredPromise<ValueType>) => ReactElement,
    key?: string
  ): DeferredPromise<ValueType>;

  render<ValueType = unknown>(
    createElement?: (deferred: DeferredPromise<ValueType>) => ReactElement,
    key?: string
  ): ReactNode | DeferredPromise<ValueType> {
    if (createElement) {
      const deferred = pDefer<ValueType>();
      const portal = ReactDOM.createPortal(
        createElement(deferred),
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
    } else {
      const { children } = this.state;
      return children;
    }
  }
}
