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

export const listPets = (keyword = '', page = 1, missing= false) => async (dispatch) => {
    try {
        dispatch({ type: PET_LIST_REQUEST })
        const url = `${Config.API_BASE_URL}/api/pets/?${keyword ? `keyword=${keyword}&` : ''}page=${page}&missing=${missing}`;

        const { data } = await axios.get(url);

        const petsWithFullImageURL = data.pets.map(pet => ({
            ...pet,
            images: pet.images.map(image => ({
                ...image,
                image: `${Config.API_BASE_URL}${image.image}`
            }))
        }));

        dispatch({
            type: PET_LIST_SUCCESS,
            payload: {
                ...data,
                pets: petsWithFullImageURL
            }
        })
    } catch (error) {
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

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        const petFormData = new FormData();
        Object.keys(formData).forEach(key => {
            petFormData.append(key, formData[key]);
        });

        images.forEach((image, index) => {
            petFormData.append('images', {
                uri: image.uri,
                type: image.type,
                name: `image${index}.jpg`
            });
        });

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
        dispatch({
            type: PET_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const createPetFound = (formData, images) => async (dispatch) => {
    try {
        dispatch({ type: PET_CREATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        const petFormData = new FormData();
        Object.keys(formData).forEach(key => {
            petFormData.append(key, formData[key]);
        });

        images.forEach((image, index) => {
            petFormData.append('images', {
                uri: image.uri,
                type: image.type,
                name: `image${index}.jpg`
            });
        });

        const { data } = await axios.post(
            `${Config.API_BASE_URL}/api/pets/create/found/`,
            petFormData,
            config
        );

        dispatch({
            type: PET_CREATE_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PET_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

