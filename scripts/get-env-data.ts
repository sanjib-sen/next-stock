import 'dotenv/config'

export default function get_env_data() {
    const data = {
        name: process.env.TRADING_CODE,
        stock : process.env.STOCKS,
        buy_price : process.env.BUY_PRICE_PER_STOCK,
        buy: process.env.TOTAL_BUY,
        vat: process.env.VAT,
        target: process.env.TARGET
    }    
    return data
}