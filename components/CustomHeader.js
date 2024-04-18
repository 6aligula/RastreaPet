import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../images/logo.webp';
import styles from './styles/CustomHeaderStyle';

const CustomHeader = ({ locationHome, navigation, currentScreen }) => {

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    // Definir un color basado en la pantalla actual
    // const isHomeOrFound = currentScreen === 'HomeScreen' || currentScreen === 'FoundPetScreen';
    // console.log("Current Screen:", currentScreen, "Is Home or Found:", isHomeOrFound);
    // const iconColor = isHomeOrFound ? '#FF0000' : '#00FF00';
       // Colores específicos para cada ícono basados en la pantalla actual
       const searchIconColor = currentScreen === 'HomeScreen' ? '#FF00FF' : '#FFFFFF'; // Verde en HomeScreen, blanco en otros casos
       const pawIconColor = currentScreen === 'FoundPetScreen' ? '#FF00FF' : '#FFFFFF'; // Rojo en FoundPetScreen, blanco en otros casos
       
    

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

                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.cartButton}>
                    <Icon name="search" size={24} color={searchIconColor} />
                    <Text>Perdidos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('FoundPetScreen')} style={styles.cartButton}>
                    <Icon name="paw" size={24} color={pawIconColor} />
                    <Text>Encontrados</Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>
    );
};
export default CustomHeader;