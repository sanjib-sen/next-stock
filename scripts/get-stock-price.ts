import cheerio from 'cheerio';
import axios from 'axios';

export default async function get_stock() {
    const company = process.env.TRADING_CODE
    let url = process.env.URL
    url = url + company!
    const price = await axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const data = $('td[width=25%]').html()
            return data
        })
    return price
}
