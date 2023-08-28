import axios from "axios";
import {Environment} from "../utils";

const fetchProduct = async (keyword) => {
    const baseURL = 'https://api.bestbuy.com/v1/products'
    const apiKey = `${import.meta.env[Environment.PRODUCTS_API_KEY]}`
    const responseFormat = 'json'
    const request = `${baseURL}${keyword}?apiKey=${apiKey}&format=${responseFormat}`
    try {
        return await axios.get(request)
    } catch (e) {
        console.log(e)
    }
}

const createProductService = () => {
    return {
        async getProduct(name) {
            //if(!name) return {data: {products: null}}
            const keyword = name.split(' ')
                .map(i => "search=" + i + "&")
                .join('')
                .slice(0, -1)
            return fetchProduct(`((${keyword}))`)
        },

        async getProductUpdate(id) {
            const keyword = `sku=${id}`
            return fetchProduct(`(${keyword})`)
        }
    }
}

export const productService = createProductService()