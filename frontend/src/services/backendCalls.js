import axios from "axios";
//import $ from 'jquery';

const apiEndpoint = process.env.REACT_APP_API_URL;

export async function createDataForTemp(date) {
  const initTime = Math.round(date.getTime() / 1000);
  const headers = {
    "Content-Type": "application/json"
  };
  const data = (
    await axios.get(
      apiEndpoint + "/createData",
      { params: { initTime: initTime } },
      headers
    )
  ).data;
  const roundedTime = data.response;
  date.setTime(parseInt(roundedTime) * 1000);
  return date;
}

export async function predictLinear(times) {
  const headers = {
    "Content-Type": "application/json"
  };
  const data = (
    await axios.get(
      apiEndpoint + "/predictLinear",
      { params: { times: times } },
      headers
    )
  ).data;
  const prediction = data.response;
  return prediction;
}

export async function getNNParameters() {
  /*const headers = { //delete in future?
    "Content-Type": "application/json",
  };*/
  const data = (await axios.get(apiEndpoint + "/getNNParameters")).data;
  const parameters = data.response;
  return parameters;
}

export async function predictNeural(clouds, temp, humidity) {
  const headers = {
    "Content-Type": "application/json"
  };
  const data = (
    await axios.get(
      apiEndpoint + "/predictNeural",
      { params: { clouds, temp, humidity } },
      headers
    )
  ).data;
  const prediction = data.response;
  const nnData = {
    x: data.x,
    y: data.y,
    unscaledX: data.unscaledX,
    theta: data.theta
  };
  return { prediction, nnData };
}

export async function trainNeural(nnData, actual) {
  const headers = {
    "Content-Type": "application/json"
  };
  await axios.post(
    apiEndpoint + "/trainNeural",
    { nnData: nnData, actual: actual },
    headers
  );
}
