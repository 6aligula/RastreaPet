import axios from 'axios';
import Config from 'react-native-config';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

}

export const addToCart = (id, qty) => async (dispatch) => {
  const { data } = await axios.get(`${Config.API_BASE_URL}/api/products/${id}/`);

  dispatch({
      type: CART_ADD_ITEM,
      payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty
      }
  })
}

export const removeFromCart = (id, qty) => (dispatch) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {
            id,
            qty
        }
    })
}
