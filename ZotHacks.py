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
        "Authorization": "Bearer iwoYV1utzQ7Jkbp33JO8BdUpUos1ig80Hprx-umVMRR0Y67uGYKdAUCmNjxDzI8gKZgB4dUfwotfjbO9zedBTLmY7zblwYjSR4YyCuFsXcq3DCbJ8E9l4YlNMR1HZXYx"
    }
    
    response = requests.get(url, headers=headers)
    return response.text