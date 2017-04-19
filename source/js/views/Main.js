import React from "react";
import ActionsCounter from "../actions/ActionsCounter";
import CounterStore from "../stores/CounterStore";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: CounterStore.getCount()
    };
    this.incrementCount = this.incrementCount.bind(this);
    this.onStoreChange = this.onStoreChange.bind(this);
  }
  onStoreChange(){
    this.setState({count: CounterStore.getCount()});
  }
  componentDidMount(){
    CounterStore.addChangeListener(this.onStoreChange)
  }

  incrementCount() {
    ActionsCounter.setValue(this.state.count + 1);
  }

  render() {
    return (
      <div>
        My count: {this.state.count}

        <button className="btn" onClick={this.incrementCount}>Add</button>
      </div>
    )
  }
}

export default Main;