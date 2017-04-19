import Dispatcher from "../dispatcher/Dispatcher";

const ActionsCounter = {
  setValue: function (value) {
    Dispatcher.handleViewAction({
      actionType: "setValue",
      data: value
    })
  }
};

export default ActionsCounter;