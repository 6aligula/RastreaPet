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
    PET_CREATE_RESET,

} from '../constants/petConstants'

export const petListReducers = (state = { pets: [] }, action) => {
    switch (action.type) {
        case PET_LIST_REQUEST:
            return { loading: true, pets: [] }

        case PET_LIST_SUCCESS:
            return {
                loading: false,
                pets: action.payload.pets,
                page: action.payload.page,
                pages: action.payload.pages,
            }

        case PET_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const petDetailsReducers = (state = { pet: { reviews: [] } }, action) => {
    switch (action.type) {
        case PET_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PET_DETAILS_SUCCESS:
            return { loading: false, pet: action.payload }

        case PET_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const petCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PET_CREATE_REQUEST:
            return { loading: true }

        case PET_CREATE_SUCCESS:
            return { loading: false, success: true, pet: action.payload }

        case PET_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PET_CREATE_RESET:
            return {}

        default:
            return state;
    }
}