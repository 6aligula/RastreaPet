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

const userPersistConfig = {
    key: 'user',
    storage: EncryptedStorage,
    whitelist: ['userInfo', 'userDetails']
};

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartReducer),
    productList: productListReducers,
    productDetails: productDetailsReducers,
    userLogin : persistReducer(userPersistConfig, userLoginReducer),
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
});

export default rootReducer;