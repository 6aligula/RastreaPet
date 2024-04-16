import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { combineReducers } from 'redux';
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
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
} from './orderReducer';
import { persistReducer} from 'redux-persist';

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

// AsyncStorage.getAllKeys((err, keys) => {
//     AsyncStorage.multiGet(keys, (error, stores) => {
//         stores.map((result, i, store) => {
//             console.log({ [store[i][0]]: store[i][1] });
//             return true;
//         });
//     });
// });

const rootReducer = combineReducers({
    petList: persistReducer(petListPersistConfig, petListReducers),
    petDetails: persistReducer(petDetailsPersistConfig, petDetailsReducers),
    petCreate: petCreateReducer,
    userLogin: persistReducer(userPersistConfig, userLoginReducer),
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
});

export default rootReducer;