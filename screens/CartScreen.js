import React, { useEffect, useState } from 'react';
import { Button, Image, View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions/cartActions';
import styles from './styles/CartStyles';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';

function CartScreen({ navigation }) {
  useAndroidBackButton(navigation);

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const [selectedQtys, setSelectedQtys] = useState({});

  useEffect(() => {
    
    setSelectedQtys(
      cartItems.reduce((acc, item) => ({ ...acc, [item.product]: item.qty }), {})
      
    );
  }, [cartItems]);

  const removeFromCartHandler = (id) => {
    const qtyToRemove = selectedQtys[id] || 1;
    dispatch(removeFromCart(id, qtyToRemove));
  };

  const checkoutHandler = () => {
    navigation.navigate('ShippingForm');
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <Text style={[styles.title]}>Cesta</Text>
        {cartItems.length === 0 ? (
          <Text style={[styles.subtitle]}>Tu carrito está vacío</Text>
        ) : (
          <>
            {cartItems.map(item => (
              <View style={styles.container} key={item.product}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>€{item.price}</Text>
                <View style={styles.quantityContainer}>
  
                  <View style={styles.buttonContainer}>
                    <View style={styles.roundedButton}>
                      <Button
                        title='Eliminar'
                        onPress={() => removeFromCartHandler(item.product)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))}
            <View style={styles.container}>
              <Text style={styles.subtitle}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) artículos
                € {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </Text>
              <View style={styles.buttonContainer}>
                <View style={styles.roundedButton}>
                  <Button
                    title='Siguiente'
                    disabled={cartItems.length === 0}
                    onPress={checkoutHandler}
                  />
                </View>
              </View>
              
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )

}

export default CartScreen;