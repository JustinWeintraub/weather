import requests
import json
import os
token = os.environ.get("MACHINE_API")
response = requests.get(
    "http://api.openweathermap.org/data/2.5/forecast?id=4845585&APPID=" +token)
with open('../json/data.json', 'w') as f:
    json.dump(response.json(), f)

#stores the weather data of a random location on the map