import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
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

const cartPersistConfig = {
    key: 'cart',
    storage: AsyncStorage,
    whitelist: ['cartItems']
};

const petListPersistConfig = {
    key: 'petList',
    storage: AsyncStorage,
    whitelist: ['products', 'pages', 'page']
};

const petDetailsPersistConfig = {
    key: 'pettDetails',
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
    cart: persistReducer(cartPersistConfig, cartReducer),
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