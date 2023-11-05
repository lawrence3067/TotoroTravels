async function getCityInfo()
{
    // let desiredCity = document.getElementById("loc").value;
    // let desiredCom = document.getElementById("kw").value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var desiredCity = url.searchParams.get("city");
    console.log(desiredCity);
    var desiredCom = url.searchParams.get("specific");
    console.log(desiredCom);
    counter = 0;

    if (desiredCom != '')
    {
        specificSearch = await getCommodity(desiredCity, desiredCom);
        document.getElementById("thing").innerHTML += '<p><br>';
        // Object.entries(specificSearch["businesses"]).forEach(([key, value]) => 
        // {
        //     console.log(key);
        //     console.log(value);
        //     if (key == "name" || key == "image_url" || key == "url" || key == "rating" || key == "price" || key == "location")
        //     {
        //         document.getElementById("info").innerHTML += `${value}<br>`;
        //     }
        //     //console.log(results[counter]);
        // });

       //specificSearch["businesses"].map(business)
        specificSearch["businesses"].map((business) => {
            document.getElementById("thing").innerHTML += `<p>${business["name"]} ${business["price"]} ${business["image_url"]} ${business["url"]} ${business["rating"]}</p>`
        });
        document.getElementById("info").innerHTML += `</p>`;
        //console.log(results[counter]);
    }
    else
    {
        var hotels;
        var restaurants;

        hotels = getHotels(desiredCity);
        restaurants = getRestaurants(desiredCity);
    }

}

async function getCommodity(city, com) {
    cityCommodity = await fetch(`http://127.0.0.1:8000/get_yelp_data?loc=${city}&term=${com}`)
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