import axios from 'axios';
import Config from 'react-native-config';

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

} from '../constants/productConstants';

export const listProducts = (keyword = '', page = 1) => async (dispatch) => {
    console.log("ip: ", Config.API_BASE_URL);
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const url = `${Config.API_BASE_URL}/api/products/?${keyword ? `keyword=${keyword}` : ''}&page=${page}`;
        const { data } = await axios.get(url);

        // Agregar la URL completa a cada imagen de producto
        const productsWithFullImageURL = data.products.map(product => ({
            ...product,
            image: `${Config.API_BASE_URL}${product.image}`
        }));

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: {
                ...data,
                products: productsWithFullImageURL
            }
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${Config.API_BASE_URL}/api/products/${id}/`)

        // Agregar la URL completa a la imagen del producto
        const productWithFullImageURL = {
            ...data,
            image: `${Config.API_BASE_URL}${data.image.startsWith('/') ? '' : '/'}${data.image}`
        };

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: productWithFullImageURL
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}