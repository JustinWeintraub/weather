import json
import copy
import matplotlib.pyplot as plt
X = []
with open('../json/data.json') as json_file:
  data = json.load(json_file)
  for index, val in enumerate(data['list']):
    X.append({'temp':(val['main']['temp']- 273.15)* 9/5 + 32, 'initTime':val['dt']})
    #also add time interval for predicting next time in future

moreX=[]
y=[]
for index in range(0, len(X)):
  for i in list(range(0 if index-5<0 else index -5, index)) + list(range(index+1, len(X) if index+6>len(X) else index+6)):
    temp=X[index].copy()
    temp['timeDiff']=temp['initTime']-X[i]['initTime']
    moreX.append(copy.deepcopy(temp))
    y.append({'temp':X[i]['temp']})


fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(list(x['timeDiff'] for x in moreX),list(x['temp'] for x in moreX),list(Y['temp'] for Y in y)) 
ax.set_xlabel('Time difference')
ax.set_ylabel('Temperature Initial')
ax.set_zlabel('Temperature Final')
plt.show()