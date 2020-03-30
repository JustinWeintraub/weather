import json
import copy
import matplotlib.pyplot as plt
X = []
with open('../json/data.json') as json_file:
  data = json.load(json_file)
  for index, val in enumerate(data['list']):
    X.append({'temp':(val['main']['temp']- 273.15)* 9/5 + 32, 'initTime':val['dt']})
    #also add time interval for predicting next time in future



fig = plt.figure()
plt.scatter(list(x['initTime'] for x in X),list(x['temp'] for x in X)) 
plt.xlabel('Time')
plt.ylabel('Temperature')
plt.show()