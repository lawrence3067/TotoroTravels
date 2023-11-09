export async function writeToHTML(desiredCity, good)
{
    var fetchedGoods;
    fetchedGoods = await getCommodity(desiredCity, good);
    fetchedGoods["businesses"].sort((a,b) => b.rating - a.rating);
    fetchedGoods["businesses"].map((business) => {
        document.getElementById(`${desiredCity}-${good}`).innerHTML += '<div class="card m-3" style="width: 15rem;">' + 
        `<img src=${business["image_url"]} class="card-img-top"/>` + 
        `<div class="card-body">` +
        `<a href=${business["url"]}> <p class="store_name">${business["name"]}</p> </a>` + 
        `<p class="store_rating">Rating: ${business["rating"]} stars</p>` + 
        `</div>` +
       `</div>`;
    });
}

export async function getCommodity(city, com) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = `https://api.yelp.com/v3/businesses/search?location=${city}&term=${com}&sort_by=best_match&limit=5`
    //location=${city}&term=${com}&sort_by=best_match&
    const queryUrl = proxyUrl + targetUrl;

    cityCommodity = await $.ajax({
        url: queryUrl,
        method: "GET",
        dataType: "json",
        headers: {
          "accept": "application/json",
          "x-requested-with": "xmlhttprequest",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer eh4N9M5tz4-1ss0daqIgspdjsHaUVaIc0gQc2zD1axSjU4i8aExBIs6umEODX5E5dCjo3y3yNFeM_9yKtblbN7fW94GxtOeoysF8uzStsEKHUKc38lnnKfQaAh1IZXYx`
        }
      })

    temp = JSON.stringify(cityCommodity);
      
    // cityCommodity = await fetch(proxyUrl + targetUrl, options)
    //     .then(response => response.json())
    //     .catch(err => console.error(err));

    return JSON.parse(temp);
}