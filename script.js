// let desiredCom = document.getElementById("kw").value;
// desiredCom.addEventListener('keyup', function(event)
// {
//     if (event.keyCode == 13)
//     {
//         kw_button.click();
//         getCityInfo();
//     }
// });

function getCityInfo()
{
    //console.log("called");
    let desiredCity = document.getElementById("loc").value;
    let desiredCom = document.getElementById("kw").value;
    counter = 0;

    if (desiredCom != '')
    {
        console.log("bitch");
        specificSearch = getCommodity(desiredCity, desiredCom);
        Object.entries(specificSearch).forEach(([key, value]) => 
        {
            console.log("Yo");
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
        console.log("shit");
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
