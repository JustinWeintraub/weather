from getData import getDataLinear
import numpy as np

# from scipy.optimize import fmin_bfgs
import random
import pickle

# theta = fmin_bfgs(decoratedCost, initial_theta, maxiter=400)
def gradientDescent(X, y, m, theta, alpha, lam, iterations):
    global cost
    for iteration in range(1, iterations):
        # theta = np.reshape(theta, (len(theta), 1))
        computeCost(X, y, theta, m)
        hyp = X * theta
        thetaR = theta[1:, 0]
        errors = X.transpose() * (hyp - y)  # +(1 / (2.0 * m)) * (thetaR.T.dot(thetaR))
        theta = theta * (1 - alpha * lam / m) - (alpha / m) * errors
    return theta


def computeCost(X, y, theta, m):
    hyp = X * theta
    errors = np.square((hyp - y))
    J = (1.0 / (2 * m)) * errors.sum()
    print(J)
    return float(J)  # float(J.sum())


def getPredictedLinear(theta, X):
    m, n = X.shape
    h = X * theta
    p = np.zeros(shape=(m, 1))
    for x in range(0, h.shape[0]):
        p[x, 0] = h[x].sum()
    return p


def machineLinear(X, y, unscaledX):
    z = list(zip(np.array(X), np.array(y)))
    random.shuffle(z)
    X, y = zip(*z)
    X = np.matrix(X)
    y = np.matrix(y)
    trainX = X  # [:350]
    testX = X[350:]
    trainY = y  # [:350]
    testY = y[350:]
    # print(y)
    initial_theta = np.zeros(shape=(np.size(trainX, 1), 1))
    lam = 1
    m = trainY.size  # number of training examples
    theta = gradientDescent(
        trainX,
        trainY,
        np.float128(m),
        initial_theta,
        np.float128(1), #alpha
        np.float128(0.01), #lambda
        10000, #iterations
    )
    predictions = getPredictedLinear(np.array(theta), testX)
    listPre = 0
    for index, predict in enumerate(predictions):
        listPre += abs(100 * (predict - testY[index]) / testY[index])
        if abs(100 * (predict - testY[index]) / predict) > 20:
            print(100 * (predict - testY[index]) / predict, predict, testY[index])
    listPre = listPre / len(predictions)
    print(listPre)
    # NOTE: Add test set in the future
    # NOTE: Look up how to randomize two arrays the same way

    pickl = {"theta": theta, "testX": unscaledX}
    pickle.dump(pickl, open("../pickle/modelLinear" + ".p", "wb"))


if __name__ == "__main__":
  X, y, unscaledX = getDataLinear()
  machineLinear(X, y, unscaledX)
