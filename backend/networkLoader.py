import pickle
import numpy as np
def loadNetwork(name):
    file_name = "../pickle/model"+name+".p"
    with open(file_name, 'rb') as pickled:
      data = pickle.load(pickled)
      model, testX = np.array(data['theta']), np.array(data['testX'])
      if(name == "NN"):
        y = np.array(data['y'])
        return model, testX, y
    return model, testX
