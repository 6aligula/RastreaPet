import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../store/actions/userActions'
import styles from './styles/LoginStyles';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import PasswordInput from '../components/PasswordInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { validateEmail } from '../functions/functions';

const LoginScreen = ({ navigation }) => {
   
    useAndroidBackButton(navigation, () => {
        navigation.navigate('HomeScreen');
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
            navigation.reset({
                index: 1,
                routes: [
                    { name: 'HomeScreen' },
                    { name: 'ProfileScreen' },
                ],
            });
        }
        
    }, [navigation, userInfo]);

    const submitHandler = () => {
        dispatch(login(email, password));
    }

    const handleEmailChange = (email) => {
        setEmail(email);
        if (!validateEmail(email)) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Iniciar Sesión</Text>

                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}

                    <View style={styles.inputField}>
                        <TextInput
                            style={emailValid ? styles.input : { ...styles.input, borderColor: 'red' }}
                            placeholder='Introduzca email'
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={handleEmailChange}
                        />
                        {!emailValid && <Text style={{ color: 'red' }}>Por favor, ingresa un correo electrónico válido. Solo se acepta letras minúsculas</Text>}
                    </View>

                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Introduce contraseña"
                    />

                    <View style={styles.roundedButton}>
                        <Button title='Iniciar Sesión' onPress={submitHandler} />

                    </View>

                    <View style={styles.registerContainer}>
                        <Text style={styles.label}>Cliente nuevo? </Text>
                        <Text style={styles.registerLink} onPress={() => navigation.navigate('RegisterScreen')}>
                            Registrarse
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
export default LoginScreen;