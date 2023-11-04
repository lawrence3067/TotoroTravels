async function getCityInfo()
{
    let desiredCity = document.getElementById("loc").value;
    let desiredCom = document.getElementById("kw").value;
    desiredCom.addEventListener('keyup', function(event) {
        if (event.keyCode == 13)
        {
            desiredCity.click();
        }
    });

    if (desiredCom != '')
    {
        specificSearch = getCommodity(desiredCity, desiredCom);
    }
    else
    {
        var hotels;
        var restaurants;

        hotels = getHotels(desiredCity);
        restaurants = getRestaurants(desiredCity);
    }

}

function printPictures(city)
{
    Object.entries(cityData).forEach(([key, value]) =>
    {
        console.log(`${key}: ${value}`);
        document.getElementById("main").innerHTML += `
            <div class="result" id="something">
                <img src="${value.url}" />
            </div>`
    });
}

async function getCommodity(city, com) {
    cityCommodity = await fetch(`http://127.0.0.1:8000/get_yelp_data?loc=${city}&term=${com}`)
        .then(response => response.json())
        .catch(err => console.error(err));
        console.log(cityCommodity)
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
