import pDefer from "p-defer";
import { Component, ReactElement } from "react";

declare module "react-portal-manager" {
  export interface PortalComponentProps<T = any> {
    resolve?: (value?: T | PromiseLike<T>) => void;
    reject?: (reason?: unknown) => void;
  }
  export default class PortalManager extends Component {
    addPortal = (element: ReactElement<PortalComponentProps>, key?: string) =>
      pDefer;
  }
}
