import axios from "axios";
import { FOUR_SQUARE_API_URL } from "./constants";
import { RestaurantPayload } from "./interface";



export const getRestaurants = (payload: RestaurantPayload) => {

    const headers = {
        Authorization: `Bearer ${process.env.FOUR_SQUARE_KEY}`,
        Accept: 'application/json',
        'X-Places-Api-Version': '2025-06-17',
    };
    const searchResults = axios.get(FOUR_SQUARE_API_URL, {
        headers,
        params: payload,
    });

    return searchResults;

}