import json
import copy
import numpy as np
import os, json
import pandas as pd

from weatherCode import getWeatherType


def scaleFeaturesNeural(values):
  scaled=copy.deepcopy(values)
  #for i in range(0, len(values[0])):
  maxVar=np.max(values, 0)
  minVar=np.min(values, 0)
  average=np.sum(values,0)/len(values)
  for i in range(0, len(values)):
    for j in range(0, len(maxVar)):
      scaled[i][j]=(scaled[i][j]-average[j])/(maxVar[j]-minVar[j])
  return scaled


def getDataType():
  X, y = [],[]
  path_to_json = '../json'
  json_files = [pos_json for pos_json in os.listdir(path_to_json) if pos_json.endswith('.json')]
  for index, file in enumerate(json_files):
    for line in open('../json/' +json_files[index], 'r'):
      val = json.loads(line)
      if 'main' in val:
        X.append([val['main']['humidity'], val['main']['temp'], val['clouds']['all']]) 
        yVal=val['weather'][0]['main'] 
        y.append(getWeatherType(yVal))
  XScaled=scaleFeaturesNeural(copy.deepcopy(X))
  return np.asmatrix(XScaled), np.asmatrix(y).transpose(), X


