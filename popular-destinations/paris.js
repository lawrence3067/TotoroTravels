async function getCityInfo()
{
    console.log("bitch");
    // let desiredCity = document.getElementById("loc").value;
    // let desiredCom = document.getElementById("kw").value;
    // var url_string = window.location.href;
    // var url = new URL(url_string);
    var desiredCity = "Paris";


    var hotels;
    var restaurants;

    hotels = await getCommodity(desiredCity, 'hotels');
    hotels["businesses"].sort((a,b) => b.rating - a.rating);
    hotels["businesses"].map((business) => {
        document.getElementById("thing2").innerHTML += `<p>${business["name"]} ${business["price"]} ${business["image_url"]} ${business["url"]} ${business["rating"]}</p>`
    });

    restaurants = await getCommodity(desiredCity, 'restaurants');
    restaurants["businesses"].sort((a,b) => b.rating - a.rating);
    restaurants["businesses"].map((business) => {
        document.getElementById("thing2").innerHTML += `<p>${business["name"]} ${business["price"]} ${business["image_url"]} ${business["url"]} ${business["rating"]}</p>`
    });

    attractions = await getCommodity(desiredCity, 'tourist_attractions');
    attractions["businesses"].sort((a,b) => b.rating - a.rating);
    attractions["businesses"].map((business) => {
        document.getElementById("thing2").innerHTML += `<p>${business["name"]} ${business["price"]} ${business["image_url"]} ${business["url"]} ${business["rating"]}</p>`
    });

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