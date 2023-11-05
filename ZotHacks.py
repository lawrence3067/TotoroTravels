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
    url = f"https://api.yelp.com/v3/businesses/search?location={loc}&term={term}&sort_by=best_match&limit=5"
    
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer Za6PuIqA8M7B-gtVWBxBbqlepA1GIanYbukZJ5bSdGbm9EMS0Ew8rEV6x9Qj3IRPJ9IlShPVyBSFg-McpkilG3DliD4t0mEIpESuX6OBuIR4b4EEZ4jmOuyVCZxGZXYx"
    }
    
    response = requests.get(url, headers=headers)
    return response.text