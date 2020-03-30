import React, { Component } from "react";
import * as calls from "../services/backendCalls.js";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

class Predict extends Component {
  mounted = false;

  state = {
    parameters: {
      "Clouds(#)": "",
      "Temp(F)": "",
      Humidity: ""
    },
    result: null,
    nnData: null
  };
  schema = {
    //using Joi for form creation and errors (change?)
    "Clouds(#)": Joi.number().required(),
    "Temp(F)": Joi.number().required(),
    Humidity: Joi.number().required()
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.parameters, this.schema, options);
    if (!error) return false;
    //for (let item of error.details) errors[item.path[0]] = item.message;
    return true;
  };

  async componentDidMount() {
    this.mounted = true;
    //get default values for weather for today and store them in state
    let initDate = new Date();
    await calls.createDataForTemp(initDate);
    const parameters = await calls.getNNParameters();
    //returns parameters being clouds, temp and humidity
    if (this.mounted) this.setState({ parameters });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    //NOTE: turn this into a map
    const { parameters, result, nnData } = this.state;

    async function handleSubmit(e) {
      e.preventDefault();

      const { parameters } = this.state;
      const { prediction, nnData } = await calls.predictNeural(
        parameters["Clouds(#)"],
        parameters["Temp(F)"],
        parameters["Humidity"]
      );
      if (this.mounted) this.setState({ result: prediction, nnData: nnData });
    }
    handleSubmit = handleSubmit.bind(this);

    function handleChange({ currentTarget: input }) {
      const name = input.name;
      const value = input.value;
      const parameters = { ...this.state.parameters };
      parameters[name] = value;
      if (this.mounted) this.setState({ parameters });
    }
    handleChange = handleChange.bind(this);

    if (result)
      return (
        <Redirect
          to={{
            pathname: "/prediction",
            state: { result: result, parameters: parameters, nnData: nnData }
          }}
        />
      );
    else {
      return (
        <div style={{ fontSize: "4vh" }}>
          <form style={{ marginLeft: "1vw" }} onSubmit={handleSubmit}>
            Did you know? These 3 fields are some of the best at predicting
            various weather types.
            <br />
            Please submit their values to get a predicted weather condition.
            {Object.keys(parameters).map(function(name) {
              return (
                <div key={name} style={{ marginTop: "1vw" }}>
                  <br />
                  <label>
                    {name}:
                    <input
                      type="text"
                      name={name}
                      value={parameters[name]}
                      style={{ marginLeft: "1vw" }}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              );
            }, this)}
            <button
              style={{ marginTop: "1vw" }}
              className="btn btn-light btn-lg"
              disabled={this.validate()}
            >
              Submit
            </button>
          </form>
        </div>
      );
    }
  }
}
export default Predict;
