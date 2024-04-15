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
    //console.log("ip: ", Config.API_BASE_URL);
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const url = `${Config.API_BASE_URL}/api/products/?${keyword ? `keyword=${keyword}` : ''}&page=${page}`;
        //console.log("URL de la solicitud:", url);

        const { data } = await axios.get(url);
        //console.log("Datos recibidos:", data);

        // Corrección en la transformación de imágenes: Asumiendo que cada producto tiene un array de imágenes
        const productsWithFullImageURL = data.products.map(product => ({
            ...product,
            images: product.images.map(image => ({
                ...image,
                image: `${Config.API_BASE_URL}${image.image}`
            }))
        }));

        //console.log("Productos con URLs de imágenes completas:", productsWithFullImageURL); // Log del nuevo array de productos

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: {
                ...data,
                products: productsWithFullImageURL
            }
        })
    } catch (error) {
        //console.error("Error en listProducts:", error); // Log de cualquier error que ocurra durante la solicitud o transformación de datos
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
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`${Config.API_BASE_URL}/api/products/${id}/`);

        // Asumimos que cada producto tiene un array de imágenes y agregamos la URL completa
        const productWithFullImageURL = {
            ...data,
            images: data.images.map(image => ({
                ...image,
                image: `${Config.API_BASE_URL}${image.image.startsWith('/') ? '' : '/'}${image.image}`
            }))
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
