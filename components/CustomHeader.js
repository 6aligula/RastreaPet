import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../images/logo.webp';
import styles from './styles/CustomHeaderStyle';

const CustomHeader = ({ locationHome, navigation, currentScreen }) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const DEFAULT_COLOR = '#FFFFFF';
    const ACTIVE_COLOR = '#FF00FF';

    // Función auxiliar para obtener el color basado en la pantalla
    const getIconColor = (screenName) => currentScreen === screenName ? ACTIVE_COLOR : DEFAULT_COLOR;

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
                    <Icon name="search" size={24} color={getIconColor('HomeScreen')}  />
                    <Text>Perdidos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('FoundPetScreen')} style={styles.cartButton}>
                    <Icon name="paw" size={24} color={getIconColor('FoundPetScreen')} />
                    <Text>Encontrados</Text>
                </TouchableOpacity>


            </View>
        </SafeAreaView>
    );
};
export default CustomHeader;