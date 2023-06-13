import * as cheerio from "cheerio";
import fetch from 'node-fetch';

async function getFormulOneDrivers() {
    try {
        const response  = await fetch('https://www.formula1.com/en/drivers.html');
        const body = await response.text();
        const $ = cheerio.load(body);


        const items = []
        $('.listing-items-wrapper > .row > .col-12').map((index, element) => {
            const rank = $(element).find('.rank').text()
            const points = $(element).find('.points > .f1-wide--s').text()
            const name = $(element).find('.listing-item--driver > .listing-item--content > .listing-item--name').text()
            const photo = $(element).find('.listing-item--photo img').attr('data-src')

            items.push({
                rank,
                points,
                name,
                photo
            })

        })

        console.log(items);

    } catch (error) {
        console.log(error);
    }
}

getFormulOneDrivers();