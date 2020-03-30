import requests
import json
import os
token = os.environ.get("MACHINE_API")
response = requests.get(
    "http://bulk.openweathermap.org/snapshot/weather_14.json?APPID="+token)
with open('../json/dataMulti.json', 'w') as f:
    json.dump(response.json(), f)

#stores the data of a list that countries weather data of a large amount of locations