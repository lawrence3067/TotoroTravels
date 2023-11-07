import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get_yelp_data")
async def get_yelp_data(loc: str, term: str):
    # Your code to retrieve data from the Yelp API here
    url = f"https://api.yelp.com/v3/businesses/search?location={loc}&term={term}&sort_by=best_match&limit=10"
    
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eh4N9M5tz4-1ss0daqIgspdjsHaUVaIc0gQc2zD1axSjU4i8aExBIs6umEODX5E5dCjo3y3yNFeM_9yKtblbN7fW94GxtOeoysF8uzStsEKHUKc38lnnKfQaAh1IZXYx"
    }
    
    response = requests.get(url, headers=headers)
    return response.text