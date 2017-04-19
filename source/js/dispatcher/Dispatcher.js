import {Dispatcher} from "flux";

Dispatcher.prototype.handleViewAction = function (action) {
  this.dispatch({
    source: "VIEW_ACTION",
    action: action
  });
};

export default new Dispatcher();