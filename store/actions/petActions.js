// PetActions.js
import axios from 'axios';
import Config from 'react-native-config';

import {
    PET_LIST_REQUEST,
    PET_LIST_SUCCESS,
    PET_LIST_FAIL,

    PET_DETAILS_REQUEST,
    PET_DETAILS_SUCCESS,
    PET_DETAILS_FAIL,

    PET_CREATE_REQUEST,
    PET_CREATE_SUCCESS,
    PET_CREATE_FAIL,

} from '../constants/petConstants';

export const listPets = (keyword = '', page = 1) => async (dispatch) => {
    //console.log("ip: ", Config.API_BASE_URL);
    try {
        dispatch({ type: PET_LIST_REQUEST })
        const url = `${Config.API_BASE_URL}/api/pets/?${keyword ? `keyword=${keyword}` : ''}&page=${page}`;
        //console.log("URL de la solicitud:", url);

        const { data } = await axios.get(url);
        //console.log("Datos recibidos:", data);

        // Corrección en la transformación de imágenes: Asumiendo que cada producto tiene un array de imágenes
        const petsWithFullImageURL = data.pets.map(pet => ({
            ...pet,
            images: pet.images.map(image => ({
                ...image,
                image: `${Config.API_BASE_URL}${image.image}`
            }))
        }));

        //console.log("Productos con URLs de imágenes completas:", productsWithFullImageURL); // Log del nuevo array de productos

        dispatch({
            type: PET_LIST_SUCCESS,
            payload: {
                ...data,
                pets: petsWithFullImageURL
            }
        })
    } catch (error) {
        //console.error("Error en listProducts:", error); // Log de cualquier error que ocurra durante la solicitud o transformación de datos
        dispatch({
            type: PET_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listPetDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PET_DETAILS_REQUEST });

        const { data } = await axios.get(`${Config.API_BASE_URL}/api/pets/${id}/`);

        // Asumimos que cada producto tiene un array de imágenes y agregamos la URL completa
        const petWithFullImageURL = {
            ...data,
            images: data.images.map(image => ({
                ...image,
                image: `${Config.API_BASE_URL}${image.image.startsWith('/') ? '' : '/'}${image.image}`
            }))
        };

        dispatch({
            type: PET_DETAILS_SUCCESS,
            payload: petWithFullImageURL
        });

    } catch (error) {
        dispatch({
            type: PET_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createPet = (formData, images) => async (dispatch, getState) => {
    try {
        dispatch({ type: PET_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        // Configuración de cabeceras para datos de formulario
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        // Crear instancia de FormData y añadir datos del formulario
        const petFormData = new FormData();
        Object.keys(formData).forEach(key => {
            petFormData.append(key, formData[key]);
        });

        // Añadir imágenes al FormData
        images.forEach((image, index) => {
            petFormData.append('images', {
                uri: image.uri,
                type: image.type,
                name: `image${index}.jpg`  // Asegúrate de que el nombre sea único y adecuado
            });
        });

        //console.log("Enviando solicitud de creación de mascota con los siguientes datos:", formData);
        //console.log("Con las siguientes imágenes:", images);
        //console.log("Headers de configuración:", config.headers);

        const { data } = await axios.post(
            `${Config.API_BASE_URL}/api/pets/create/`,
            petFormData,
            config
        );

        dispatch({
            type: PET_CREATE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        console.error("Error al crear la mascota:", error);
        dispatch({
            type: PET_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

