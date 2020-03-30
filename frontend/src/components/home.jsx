import React, { Component } from "react";
import * as calls from "../services/backendCalls.js";
import "../css/home.css";
class Home extends Component {
  mounted = false;
  state = {
    conditions: []
  };
  async componentDidMount() {
    this.mounted = true;
    let result = [];
    let initDate = new Date();
    initDate = await calls.createDataForTemp(initDate);
    let date = new Date(initDate.getTime());
    let temps = [];
    let times = [];
    let days = [];
    for (let i = 1; i < 41; i++) {
      let time = "";
      const minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      if (date.getHours() <= 12) time = date.getHours() + ":" + minutes + "AM";
      else time = date.getHours() - 12 + ":" + minutes + "PM";
      let day =
        date.getMonth() +
        1 +
        "/" +
        date.getDate() +
        "/" +
        (date.getYear() + 1900);
      times.push(time);
      days.push(day);
      temps.push({
        initTime: Math.round(initDate.getTime() / 1000),
        endTime: Math.round(date.getTime() / 1000)
      });
      //const temp = await calls.predictLinear(initDate, date); //do all at once instead
      date.setHours(date.getHours() + 3);
    }
    temps = await calls.predictLinear(temps);
    for (let i = 0; i < times.length; i++) {
      result.push({
        temp: String(parseFloat(temps[i]).toFixed(2)) + "℉",
        time: times[i],
        day: days[i]
      });
    }

    if (this.mounted) this.setState({ conditions: result });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const conditions = this.state.conditions;
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>
          Predicted temperatures for Westport, CT
        </h1>
        <div className="contain">
          {conditions &&
            conditions.map(function(condition, index) {
              return (
                <div key={index} className="unit">
                  <p>{condition.temp}</p>
                  <p>{condition.time}</p>
                  <p>{condition.day}</p>
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}
export default Home;
