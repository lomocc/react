import { DeferredPromise } from "p-defer";
import { Component } from "react";

declare module "reactlayer" {
  export default class Layer extends Component {
    render(): ReactNode;
    render<ValueType = unknown>(
      createElement: (deferred: DeferredPromise<ValueType>) => ReactElement,
      key?: string
    ): DeferredPromise<ValueType>;
  }
}
