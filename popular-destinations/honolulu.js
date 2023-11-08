import { writeToHTML } from '../dataFetch.js';

async function getCityInfo()
{
    var desiredCity = "honolulu";

    writeToHTML(desiredCity, 'hotels');
    writeToHTML(desiredCity, 'restaurants');
    writeToHTML(desiredCity, 'attractions');
}

getCityInfo();