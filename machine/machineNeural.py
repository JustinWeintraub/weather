from getDataNN import getDataType
import numpy as np
import copy
import random
import math
from scipy import optimize
import pickle


def randInitializeWeights(L_in, L_out):
  W = np.random.rand(L_out, 1+L_in)
  return(W)

#NOTE: Add sigmoid and randInitializeWeights
def sigmoid(z):
    return(1/(1+np.power(math.e, -z)))
def sigmoidGradient(z):
  g = np.zeros(np.size(z))
  return np.multiply(sigmoid(z),(1-sigmoid(z)))
def nnCost(nn_params,*args):#input_layer_size, hidden_layer_size, num_labels, X, y, lam):

  input_layer_size, hidden_layer_size, num_labels, X, y, lam, m = args
  Theta1 = nn_params[0:(hidden_layer_size*(input_layer_size+1))].reshape(hidden_layer_size,(input_layer_size+1))
  Theta2 = nn_params[(hidden_layer_size*(input_layer_size+1)):].reshape(num_labels,(hidden_layer_size+1))     
  J = 0
  Theta1_grad = np.zeros(shape=(np.size(Theta1)))
  Theta2_grad = np.zeros(shape=(np.size(Theta2)))
  a1=np.hstack((np.ones(shape=(m, 1)), X))
  z2=a1*Theta1.transpose()
  a2=sigmoid(z2)
  z3=np.hstack((np.ones(shape=(m, 1)), a2))*Theta2.transpose()
  a3=sigmoid(z3)
  I = np.eye(num_labels)
  Y = np.zeros(shape=(m, num_labels))
  for i in range(m):
    Y[i, :]= I[y[i], :]
  #Y = np.eye(num_labels)#[y, :] #NOTE: Prob problem later
  J=1/np.float32(m)*np.sum(np.sum(np.multiply(-Y,np.log(a3))-np.multiply(1-Y,np.log(1-a3))))
  theta1_0=Theta1[:, 1:] 
  theta2_0=Theta2[:, 1:np.size(Theta2,1)]

  regularizedJ=lam/(2*m)*np.sum(np.sum(np.square(theta1_0)))
  regularizedJ=regularizedJ+lam/(2*m)*np.sum(np.sum(np.square(theta2_0)))
  J=J+regularizedJ
  print(J)
  return (J)

def nnGradient(nn_params,*args):
  input_layer_size, hidden_layer_size, num_labels, X, y, lam, m = args
  Theta1 = nn_params[0:(hidden_layer_size*(input_layer_size+1))].reshape(hidden_layer_size,(input_layer_size+1))
  Theta2 = nn_params[(hidden_layer_size*(input_layer_size+1)):].reshape(num_labels,(hidden_layer_size+1))   
  theta1_0=Theta1[:, 1:] #2:end
  theta2_0=Theta2[:, 1:np.size(Theta2,1)]
  I = np.eye(num_labels)  
  Y = np.zeros(shape=(m, num_labels))
  for i in range(m):
    Y[i, :]= I[y[i], :]
  triangle1=0
  triangle2=0
  for t in range(m):
    #a1=[ones(m, 1) X(t)];
    a1 = np.vstack((1, X[t, :].transpose()))
    z2=Theta1*a1
    a2=np.vstack((1,sigmoid(z2)))
    z3=Theta2*a2
    a3=sigmoid(z3)
    d3=a3-(Y[t,:].transpose().reshape(np.size(Y[t,:].transpose()),1))
    d2=np.multiply((theta2_0.transpose() * d3), sigmoidGradient(z2))
    triangle1 += d2*a1.transpose()
    triangle2 += d3*a2.transpose()

  Theta1_grad=triangle1 *1/m #NOTE: May have problems with float32
  Theta2_grad=triangle2 *1/m
  Theta1_grad+=np.hstack((np.zeros(shape=(np.size(theta1_0, 0), 1)), theta1_0))*lam/m
  Theta2_grad+=np.hstack((np.zeros(shape=(np.size(theta2_0, 0), 1)), theta2_0))*lam/m
  Theta1_grad=np.array(Theta1_grad)
  Theta2_grad=np.array(Theta2_grad)
  return(np.concatenate((np.array(Theta1_grad.flatten()), np.array(Theta2_grad.flatten()))).transpose()) #unroll a matrix column based

def getPredictedNeural(nn_params,X, input_layer_size, hidden_layer_size, num_labels):
  Theta1 = nn_params[0:(hidden_layer_size*(input_layer_size+1))].reshape(hidden_layer_size,(input_layer_size+1))
  Theta2 = nn_params[(hidden_layer_size*(input_layer_size+1)):].reshape(num_labels,(hidden_layer_size+1))   
  #p = np.zeros(np.size(X, 1), 1)
  h1 = sigmoid(np.hstack((np.ones(shape=(np.size(X, 0), 1)), X))*Theta1.transpose())
  h2 = sigmoid(np.hstack((np.ones(shape=(np.size(h1, 0), 1)), h1))*Theta2.transpose())
  return h2
def comparePredicted(h2, y):
  count=0
  for i in range(0, len(h2)):
    if(i<100):
      print(np.argmax(h2[i]))
      print(y[i])
    if (np.argmax(h2[i])== y[i]):count+=1
    if(np.argmax(h2[i])!=14 and np.argmax(h2[i])!=15):
      print(np.argmax(h2[i]), y[i],  np.argmax(h2[i])== y[i])
  return(count/len(h2)*100)


def machineNeural(X, y, unscaledX, iterations, *args, **kwargs):
  input_layer_size=np.shape(X)[1]
  hidden_layer_size=10
  num_labels = 25
  lam=1
  m = np.size(X, 0)
  initTheta = kwargs.get('theta', None)
  try: 
    if(initTheta == None):
      initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size)
      initial_Theta2 = randInitializeWeights(hidden_layer_size, num_labels)
      initial_nn_params = np.matrix(np.concatenate((np.array(initial_Theta1.flatten()), np.array(initial_Theta2.flatten())))).transpose() #unroll a matrix column based
  except:
    initial_nn_params = initTheta
  args=(input_layer_size, hidden_layer_size, num_labels, X, y, lam, m)
  theta = optimize.fmin_cg(nnCost, initial_nn_params,fprime=nnGradient, args=args, maxiter=iterations)
  #print(comparePredicted(getPredictedNeural(theta, X, input_layer_size, hidden_layer_size, num_labels), y),"%")

  pickl = {'theta': theta, 'testX': unscaledX, 'y': y}
  pickle.dump( pickl, open( '../pickle/modelNN' + ".p", "wb" ) )

if __name__ == "__main__":
  X,y, unscaledX =getDataType()
  machineNeural(X, y, unscaledX, 40)
