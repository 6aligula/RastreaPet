import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import {
    productListReducers,
    productDetailsReducers,
} from './productReducers';
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

const productListPersistConfig = {
    key: 'productList',
    storage: AsyncStorage,
    whitelist: ['products', 'pages', 'page']
};

const productDetailsPersistConfig = {
    key: 'productDetails',
    storage: AsyncStorage,
    blacklist: ['loading', 'error']  //excluyendo estados de carga y errores
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
    productList: persistReducer(productListPersistConfig, productListReducers),
    productDetails: persistReducer(productDetailsPersistConfig, productDetailsReducers),
    userLogin: persistReducer(userPersistConfig, userLoginReducer),
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
});

export default rootReducer;