# Weather Predictor

![Weather e94a9375](https://user-images.githubusercontent.com/44651405/89049815-cf161800-d31f-11ea-85d2-b2dd33e9e956.png)

A cumulative machine learning and web design project based around weather using a Flask/Python backend and a React/Javascript frontend. Pickle was used to transfer data between the various parts.

Data scraping elements:
* Open Weather Map's API was used for data.
* Used data from my home town and data from all across the world.


Machine learning elements: 
* All custom made, using knowledge gained from Andrew Ng's Coursera series that I completed in full. I had to convert that knowledge from Octave to Python with the use of numpy. 
* A linear regression algorithm with data mapping and scaling to predict temperature. 
* A neural network is used to predict weather condition, having the ability to be trained with frontend user given info. 
* Used custom cost functions to determine what parameters given by the API would be best able to predict results.

Frontend elements:
* A page listing many predicted temperatures based on various times in my home town.
* A way to determine the weather type (cloudy, sunny) based on user given info.
* Sending info about weather type to the backend for the data to learn for the future.
