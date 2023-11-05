async function getCityInfo()
{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var desiredCity = url.searchParams.get("city");
    var desiredCom = url.searchParams.get("specific");
    counter = 0;

    if (desiredCom != '')
    {
        specificSearch = await getCommodity(desiredCity, desiredCom);
        specificSearch["businesses"].sort((a,b) => b.rating - a.rating);

        specificSearch["businesses"].map((business) => {
            document.getElementById("thing").innerHTML += '<div class="card m-3" style="width: 18rem;">' + 
            `<img src=${business["image_url"]} class="card-img-top"/>` + 
            `<div class="card-body">` +
            `<a href=${business["url"]}> <p class="store_name">${business["name"]}</p> </a>` + 
            `<p class="store_rating">Rating: ${business["rating"]} stars</p>` + 
            `</div>` +
           `</div>`;

        });
    }

    else
    {
        var hotels;
        var restaurants;

        hotels = await getCommodity(desiredCity, 'hotels');
        hotels["businesses"].sort((a,b) => b.rating - a.rating);
        hotels["businesses"].map((business) => {
            document.getElementById("thing").innerHTML += `<p>${business["name"]} ${business["price"]} ${business["image_url"]} ${business["url"]} ${business["rating"]}</p>`
        });

        restaurants = await getCommodity(desiredCity, 'restaurants');
        restaurants["businesses"].sort((a,b) => b.rating - a.rating);
        restaurants["businesses"].map((business) => {
            document.getElementById("thing").innerHTML += `<p>${business["name"]} ${business["price"]} ${business["image_url"]} ${business["url"]} ${business["rating"]}</p>`
        });

        attractions = await getCommodity(desiredCity, 'tourist_attractions');
        attractions["businesses"].sort((a,b) => b.rating - a.rating);
        attractions["businesses"].map((business) => {
            document.getElementById("thing").innerHTML += `<p>${business["name"]} ${business["price"]} ${business["image_url"]} ${business["url"]} ${business["rating"]}</p>`
        });
    }

}

async function getCommodity(city, com) {
    cityCommodity = await fetch(`http://127.0.0.1:5500/get_yelp_data?loc=${city}&term=${com}`)
        .then(response => response.json())
        .catch(err => console.error(err));
        console.log(JSON.parse(cityCommodity));

    return JSON.parse(cityCommodity);
}

function getHotels(city)
{
    return getCommodity(city, 'hotels');
}

function getRestaurants(city)
{

    return getCommodity(city, 'restaurants');
}

getCityInfo();