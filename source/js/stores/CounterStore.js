import Dispatcher from "../dispatcher/Dispatcher";
import {EventEmitter} from "events";

const CHANGE_EVENT = "changeCounter";

let _counter = 0;

const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCount: () => _counter,


  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
});

CounterStore.dispatcherIndex = Dispatcher.register((payload) => {
  console.log(payload);
  let action = payload.action;
  let value = action.data;

  switch (payload.source) {
    case "VIEW_ACTION":

      switch (action.actionType) {
        case "setValue":
          _counter = value;
          break;

        default: return true
      }
      break;
    default: return true;
  }

  CounterStore.emitChange();
  return true;
});

export default CounterStore;