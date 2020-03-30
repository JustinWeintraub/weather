import sys
sys.path.append('../machine')
from getData import scaleFeaturesLinear, map_feature
from getDataNN import scaleFeaturesNeural
sys.path.append('../backend') #NOTE: Change later

import requests
import json
import numpy as np
import copy 
import os

token = os.environ.get("MACHINE_API")

def getDataLinear():
  try:
    with open('../json/data.json') as json_file:
      data = json.load(json_file)
      return data
  except:
    return None
def writeDataLinear():
  dataReq = requests.get(
    "http://api.openweathermap.org/data/2.5/forecast?id=4845585&APPID="+token)
  data=dataReq.json()
  with open('../json/data.json', 'w') as f:
    json.dump(data, f)
  return(data)

def convertXLinear(initTime, endTime, testX):
  with open('../json/data.json') as json_file:
    data = json.load(json_file)
    X=[]
    val = data['list'][0]
    X.append({'temp':(val['main']['temp']-273.15)*9/5+32, 'initTime': initTime%(60*60*24) /60/60, 'endTime': endTime%(60*60*24) /60/60,'diffTime':(endTime-initTime)})
    XScaled=scaleFeaturesLinear(np.append(X[0], testX))[0]
    it= map_feature(
    np.asmatrix(XScaled['endTime']).transpose(), 
    np.asmatrix(XScaled['temp']).transpose(),
    np.asmatrix(XScaled['diffTime']).transpose(),
    np.asmatrix(XScaled['initTime']).transpose())
    return(it)

def convertXNeural(clouds, temp, humidity, testX):
  X=[]
  X.append([humidity, temp, clouds])
  X.extend(testX)
  XScaled=scaleFeaturesNeural(copy.deepcopy(X))
  return(np.asmatrix(XScaled), X)
def getTodayNN():
  res={}
  with open('../json/data.json') as json_file:
    data = json.load(json_file)
    val = data['list'][0]
    res={'Clouds(#)':(val['clouds']['all']), 'Temp(F)':round((val['main']['temp']-273.15)*9/5+32,2), 'Humidity':(val['main']['humidity'])}
  return(res)

  