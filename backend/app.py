import flask
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

import sys
sys.path.append('../machine')
from machineLinear import getPredictedLinear
from machineNeural import getPredictedNeural, machineNeural
from weatherCode import getWeatherCode, getWeatherType
sys.path.append('../backend')

from dataHandler import getDataLinear, writeDataLinear, convertXLinear, convertXNeural, getTodayNN
from networkLoader import loadNetwork
from numpyEncoder import NumpyArrayEncoder
import requests
import json
import numpy as np
app = Flask(__name__, static_folder="build/static", template_folder="build/",)
#cors = CORS(app, resources={r"/*": {"origins": "*"}})

#NOTE: Move to other files
@app.route('/createData', methods=['GET'])
def createData():
  time = int(request.args.get('initTime'))
  data=getDataLinear()
  if(data == None or abs(data['list'][0]['dt']- time) >= 60 * 60 *3): #if less than 3 hours, round current time
    writeDataLinear()
  else: #else create new data that's current
    time=data['list'][0]['dt']
  response = json.dumps({'response':str(time)})
  return response, 200

@app.route('/predictLinear', methods=['GET'])
def predictLinear():
  times = request.args.getlist('times[]')
  predictions = []
  theta, testX = loadNetwork("Linear")
  for time in times:
    time = eval(time)
    initTime, endTime = int(time['initTime']), int(time['endTime'])
    x=convertXLinear(initTime, endTime, testX)
    prediction = getPredictedLinear(theta, x)[0]#model.predict([[x]])[0]
    predictions.append(prediction.tolist())
  response = json.dumps({'response': predictions})
  return response, 200

@app.route('/getNNParameters', methods=['GET'])
def getNNParameters():
  parameters = getTodayNN()
  response = json.dumps({'response': parameters})
  return response,200

@app.route('/predictNeural', methods=['GET'])
def predictNeural():
  clouds, temp, humidity = float(request.args.get('clouds')), float(request.args.get('temp')), float(request.args.get('humidity'))
  theta, testX, y = loadNetwork("NN")  
  x, unscaledX = convertXNeural(clouds, temp, humidity, testX)
  
  input_layer_size=np.shape(x)[1]
  hidden_layer_size=10
  num_labels = 25

  prediction = getWeatherCode(
    np.argmax(
      getPredictedNeural(theta, x, input_layer_size, hidden_layer_size, num_labels)[0]))

  #need prediction, X, y, unscaledX, theta
  #print(type(unscaledX.tolist()))
  data = {'response': str(prediction), 'x': x, 'y':y, 'unscaledX':unscaledX, 'theta':theta }
  response = json.dumps(data, cls=NumpyArrayEncoder)
  return response, 200

@app.route('/trainNeural', methods=['POST'])
def trainNeural():
  data = request.get_json(silent=True)
  nnData = data.get('nnData')

  actual = data.get('actual')
  x, y, unscaledX, theta = nnData['x'], nnData['y'], nnData['unscaledX'], nnData['theta']
  y.insert(0, getWeatherType(actual))
  x, y, unscaledX, theta = np.matrix(x), np.asarray(y), np.matrix(unscaledX), np.matrix(theta)
  machineNeural(x, y, unscaledX, 1, theta=theta)
  response = json.dumps({'response': "Finished!"})
  return response,200

@app.route('/')
def serveFronted():
  return render_template('index.html')

if __name__ == '__main__':
  application.run(debug=True)

