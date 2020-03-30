import json
import copy
import numpy as np

def scaleFeaturesLinear(values):
  scaled=copy.deepcopy(values)
  for key in values[0]:
    listVars = list(x[key] for x in values)
    maxVar=max(listVars)
    minVar=min(listVars)
    average=sum(listVars)/len(listVars)
    for index, val in enumerate(listVars):
      val=(val-average)/(maxVar-minVar)
      scaled[index][key]=val
  return scaled

def scaleList(values):
  scaled=copy.deepcopy(values)
  maxVar=max(values)
  minVar=min(values)
  average=sum(values)/len(values)
  for index, val in enumerate(values):
    val=(val-average)/(maxVar-minVar)
    scaled[index]=val
  return scaled
def map_feature(x1, x2,x3,x4):
  '''
  Maps the two input features to quadratic features.
  Returns a new feature array with more features, comprising of
  X1, X2, X1 ** 2, X2 ** 2, X1*X2, X1*X2 ** 2, etc...
  Inputs X1, X2 must be the same size
  '''
  x1.shape = (x1.size, 1)
  x2.shape = (x2.size, 1)
  x3.shape = (x3.size, 1)
  x4.shape = (x4.size, 1)
  degree = 4
  out = np.ones(shape=(x1[:, 0].size, 1))

  m, n = out.shape

  for i in range(1, degree + 1):
      for j in range(i + 1):
          r = np.multiply(np.power(x1, (i - j)), np.power(x2, j))
          for k in range(0, degree):
            for l in range(k+1):
              r=np.multiply(r, np.multiply(np.power(x3, (k-l)), np.power(x4, l)))
              out = np.append(out, r, axis=1)

  return out
def getDataLinear():
  X = []
  with open('../json/data.json') as json_file:
    data = json.load(json_file)
    for index, val in enumerate(data['list']):
      X.append({'initTime':val['dt'],'temp':(val['main']['temp']-273.15)*9/5+32})
      #also add time interval for predicting next time in future

  moreX=[]
  y=[]
  for index in range(0, len(X)):
    for i in list(range(0, index)) + list(range(index+1, len(X) if index+10>len(X) else index+10)):
      temp=X[index].copy()
      temp['diffTime']=temp['initTime']-X[i]['initTime']
      temp['initTime']=(temp['initTime']%(60*60*24)) /60/60
      temp['endTime']=(X[i]['initTime']%(60*60*24)) /60/60
      moreX.append(copy.deepcopy(temp))
      y.append(X[i]['temp'])
      #NOTE: In the end, I'm going to limit the user to choose in a 7 day range
      #NOTE: so time difference will be done over 2. Add more features besides this.
    #del X[i]['temp']


  XScaled=scaleFeaturesLinear(copy.deepcopy(moreX))

  YScaled=scaleList(copy.deepcopy(y))

  
  it= map_feature(
    np.asmatrix(list(x['endTime'] for x in XScaled)).transpose(), 
    np.asmatrix(list(x['temp'] for x in XScaled)).transpose(),
    np.asmatrix(list(x['diffTime'] for x in XScaled)).transpose(),
    np.asmatrix(list(x['initTime'] for x in XScaled)).transpose())
  return it, np.asmatrix(y).transpose(), moreX #return testing later

#x, y= getDataLinear()