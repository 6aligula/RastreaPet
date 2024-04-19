import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { combineReducers } from 'redux';
import { persistReducer} from 'redux-persist';
import {
    petListReducers,
    petDetailsReducers,
    petCreateReducer
} from './petReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from './userReducers';

const petListPersistConfig = {
    key: 'petList',
    storage: AsyncStorage,
    whitelist: ['pets', 'pages', 'page']
};

const petDetailsPersistConfig = {
    key: 'petDetails',
    storage: AsyncStorage,
    blacklist: ['loading', 'error']
};

const userPersistConfig = {
    key: 'user',
    storage: EncryptedStorage,
    whitelist: ['userInfo', 'userDetails']
};

const rootReducer = combineReducers({
    petList: persistReducer(petListPersistConfig, petListReducers),
    petDetails: persistReducer(petDetailsPersistConfig, petDetailsReducers),
    petCreate: petCreateReducer,
    userLogin: persistReducer(userPersistConfig, userLoginReducer),
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
});

export default rootReducer;