import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../images/logo.webp';
import styles from './styles/CustomHeaderStyle';

const CustomHeader = ({ locationHome, navigation }) => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {!locationHome && (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Image source={logo} style={styles.logo} alt="Logotipo de busqueda de mascotas" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.loginButton}>
                    <Icon name="person" size={24} color={userInfo ? "green" : "#fff"} />
                    {userInfo && <Text style={styles.usernameText}>{userInfo.name}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={styles.cartButton}>
                    <Icon name="cart" size={24} color="#fff" />
                    <View style={styles.cartItemCountContainer}>
                        <Text style={styles.cartItemCount}>{totalItems}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};
export default CustomHeader;