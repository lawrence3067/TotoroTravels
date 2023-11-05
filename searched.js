async function getCityInfo()
{
    // let desiredCity = document.getElementById("loc").value;
    // let desiredCom = document.getElementById("kw").value;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var desiredCity = url.searchParams.get("city");
    var desiredCom = url.searchParams.get("specific");
    counter = 0;

    if (desiredCom != '')
    {
        specificSearch = await getCommodity(desiredCity, desiredCom);
        specificSearch["businesses"].sort((a,b) => b.rating - a.rating);
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
            document.getElementById("thing").innerHTML += '<div style="display: inline-block; width: 50%; text-wrap: wrap">' + `<p>${business["name"]}</p> <p>${business["price"]}</p> <p>${business["image_url"]}</p> <p style="word-break: break-all">${business["url"]}</p> <p>${business["rating"]}</p>` + `</div>`;

            // document.getElementById("thing").innerHTML += `<p>${business["name"]}</p> <p>${business["price"]}</p> <p>${business["image_url"]}</p> <p>${business["url"]}</p> <p>${business["rating"]}</p>`;
            // document.getElementById("thing").innerHTML += `</div>`;

        });
        //console.log(results[counter]);
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
    cityCommodity = await fetch(`http://127.0.0.1:8000/get_yelp_data?loc=${city}&term=${com}`)
        .then(response => response.json())
        .catch(err => console.error(err));
        //console.log(JSON.parse(cityCommodity));

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