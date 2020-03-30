import React, { Component } from "react";
import { weatherKey } from "../services/weatherKey";
import * as calls from "../services/backendCalls.js";
import "../css/prediction.css";
class Prediction extends Component {
  state = {
    parameters: [],
    result: "",
    actual: "Thunderstorm",
    nnData: null,
    running: "No"
  };
  componentDidMount() {
    if (this.props.location.state) {
      const _state = this.props.location.state;
      this.setState({
        parameters: _state.parameters,
        result: _state.result,
        nnData: _state.nnData
      });
    } else {
      window.location = "/";
    }
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { nnData, actual } = this.state;
    this.setState({ running: "Yes" });
    await calls.trainNeural(nnData, actual);
    this.setState({ running: "Done" });
  }
  handleChange({ currentTarget: select }) {
    this.setState({ actual: select.value });
  }
  render() {
    const { parameters, result, actual, running } = this.state;
    if (running === "Done") {
      return (
        <div className="predictionContainer">
          Success! Thank you for giving data!
        </div>
      );
    }
    if (running === "Yes") {
      return (
        <div className="predictionContainer">
          Currently training. This will take a few minutes.
        </div>
      );
    }
    return (
      <div className="predictionContainer">
        Your predicted weather condition given:
        <br />
        Clouds(#) = {parameters["Clouds(#)"]}
        <br />
        Temp(F) = {parameters["Temp(F)"]}℉
        <br />
        Humidity = {parameters["Humidity"]}
        <br />
        <br />
        Is <u> {result}.</u>
        <br />
        <br />
        If you feel this is inaccurate or simply want to train the neural
        network that made this decision, please input the actual value here and
        submit:
        <br />
        <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <select value={actual} onChange={this.handleChange.bind(this)}>
            {weatherKey.map(function(option) {
              return (
                <option val={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
          <br />
          <button style={{ marginTop: "1vw" }} className="btn btn-light btn-lg">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Prediction;
