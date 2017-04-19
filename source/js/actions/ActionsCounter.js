import Dispatcher from "../dispatcher/Dispatcher";

let ActionsCounter = {
  setValue: function (value) {
    Dispatcher.handleViewAction({
      actionType: "setValue",
      data: value
    })
  }
};

export default ActionsCounter;