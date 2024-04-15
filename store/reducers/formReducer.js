// reducers/formReducer.js
import {
    PET_INFO_FORM_REQUEST,
    PET_INFO_FORM_SUCCESS,
    PET_INFO_FORM_FAIL,
} from "../constants/formConstants";

export const petInfoFormReducer = (state = {}, action) => {
    switch (action.type) {
        case PET_INFO_FORM_REQUEST:
            return { loading: true };
        case PET_INFO_FORM_SUCCESS:
            return { loading: false, success: true, petInfo: action.payload };
        case PET_INFO_FORM_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
