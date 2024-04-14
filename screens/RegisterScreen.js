import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { register } from '../store/actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import styles from './styles/RegisterStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import PasswordInput from '../components/PasswordInput';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo, success } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigation.navigate('LoginScreen');
        }
    }, [navigation, userInfo]);

    const submitHandler = () => {
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();
        if (trimmedPassword !== trimmedConfirmPassword) {
            setMessage('Las contraseñas no coinciden');
        } 
        else {
            setMessage('')
            dispatch(register(name, email, password));
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Registro</Text>

                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>¡Registro exitoso!</Message>}
                    {loading && <Loader />}

                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder='Introduzca nombre'
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder='Introduzca email'
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <PasswordInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Introduce contraseña'
                    />
                    <PasswordInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder='Confirmar contraseña'
                    />
                    <View style={styles.buttonContainer}>
                        <Button title='Registrarse' onPress={submitHandler} />
                    </View>

                    <View style={styles.registerContainer}>
                        <Text style={styles.label}>¿Ya tienes cuenta?</Text>
                        <Text style={styles.registerLink} onPress={() => navigation.navigate('LoginScreen')}> Iniciar Sesión</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
};
export default RegisterScreen;