import pDefer from 'p-defer';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
}

var PortalManager = /** @class */ (function (_super) {
    __extends(PortalManager, _super);
    function PortalManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.container = document.createElement("div");
        _this.state = {
            children: [],
        };
        _this.addPortal = function (element, key) {
            var deferred = pDefer();
            var portal = ReactDOM.createPortal(React.cloneElement(element, {
                resolve: deferred.resolve,
                reject: deferred.reject,
            }), _this.container, key);
            _this.setState(function (_a) {
                var children = _a.children;
                return ({
                    children: __spreadArrays(children, [portal]),
                });
            });
            var onFinally = function () {
                _this.setState(function (_a) {
                    var children = _a.children;
                    return ({
                        children: children.filter(function (element) { return element !== portal; }),
                    });
                });
            };
            deferred.promise.then(onFinally, onFinally);
            return deferred;
        };
        return _this;
    }
    PortalManager.prototype.componentDidMount = function () {
        var root = this.props.root;
        root === null || root === void 0 ? void 0 : root.appendChild(this.container);
    };
    PortalManager.prototype.componentWillUnmount = function () {
        var root = this.props.root;
        root === null || root === void 0 ? void 0 : root.removeChild(this.container);
    };
    PortalManager.prototype.render = function () {
        var children = this.state.children;
        return children;
    };
    PortalManager.defaultProps = {
        root: document.body,
    };
    return PortalManager;
}(Component));

export default PortalManager;
//# sourceMappingURL=react-portal-manager.es.js.map
