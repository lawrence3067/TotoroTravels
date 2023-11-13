function getCityInfo()
{
    let desiredCity = document.getElementById("loc").value;
    let desiredCom = document.getElementById("kw").value;
    counter = 0;

    if (desiredCom != '')
    {
        specificSearch = getCommodity(desiredCity, desiredCom);
        Object.entries(specificSearch).forEach(([key, value]) => 
        {
            document.getElementById("info").innerHTML += `<p><br>`;
            Object.entries(value).forEach(([key, value]) =>
            {
                if (key == "name" || key == "image_url" || key == "url" || key == "rating" || key == "price" || key == "location")
                {
                    document.getElementById("info").innerHTML += `${value}<br>`;
                }
            });
            document.getElementById("info").innerHTML += `</p>`;
            //console.log(results[counter]);
            counter += 1;
        });
        console.log(results[counter]);
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
        //console.log(cityCommodity)
    return cityCommodity;
}

function getHotels(city)
{
    return getCommodity(city, 'hotels');
}

function getRestaurants(city)
{

    return getCommodity(city, 'restaurants');
}

function popUpWindow()
{
    window.open("https://cors-anywhere.herokuapp.com/", "_blank");
}