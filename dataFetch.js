async function getCommodity(city, com) {
    cityCommodity = await fetch(`http://127.0.0.1:8000/get_yelp_data?loc=${city}&term=${com}`)
        .then(response => response.json())
        .catch(err => console.error(err));
        //console.log(JSON.parse(cityCommodity));

    return JSON.parse(cityCommodity);
}

async function writeToHTML(desiredCity, good)
{
    fetchedGoods = await getCommodity(desiredCity, good);
    fetchedGoods["businesses"].sort((a,b) => b.rating - a.rating);
    console.log(`${desiredCity}-${good}`);
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