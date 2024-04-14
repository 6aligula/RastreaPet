import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile, logout } from '../store/actions/userActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { USER_UPDATE_PROFILE_RESET } from '../store/constants/userConstants';
import styles from './styles/ProfileStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Message from '../components/Message';
import PasswordInput from '../components/PasswordInput';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({ navigation }) => {

    const customBackAction = () => {
        navigation.navigate('HomeScreen');
    };

    useAndroidBackButton(navigation, customBackAction);

    const [fieldErrors, setFieldErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        confirmPassword: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }

    const validateFields = () => {
        const errors = {};
        const fieldsToValidate = {
            name: 'Porfavor introduce un nombre',
            email: 'Porfavor introduce un correo',
            password: 'Porfavor introduce una contraseña',
            confirmPassword: 'Porfavor introduce un contraseña de confirmacion',
        };

        for (const [field, errorMessage] of Object.entries(fieldsToValidate)) {
            if (!formData[field]) {
                errors[field] = errorMessage;
            }
        }

        const trimmedPassword = formData.password && formData.password.trim();
        const trimmedConfirmPassword = formData.confirmPassword && formData.confirmPassword.trim();

        if (trimmedPassword !== trimmedConfirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }
        setSuccessMessage('')
        setFieldErrors(errors);
        return !Object.keys(errors).length;
    };

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success, errorProfile } = userUpdateProfile;


    const logoutHandler = () => {
        dispatch(logout());
        navigation.reset({
            index: 1,
            routes: [
                { name: 'HomeScreen' },
                { name: 'LoginScreen' },
            ],
        });
    };

    const navigateToMyOrders = () => {
        navigation.navigate('MyOrdersScreen');
    }

    useEffect(() => {
        if (!userInfo) {
            navigation.navigate('LoginScreen');
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
                setSuccessMessage('Perfil actualizado correctamente');
            } else {
                setFormData({
                    name: user.name,
                    email: user.email
                });
            }
        }
        return () => {
        }
    }, [dispatch, userInfo, user, success])

    const submitHandler = () => {
        if (validateFields()) {
            dispatch(updateUserProfile({
                ...formData,
                'id': user._id,
            }));
            return;
        }
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <View>
            {error && <Message variant='danger'>{error}</Message>}
        </View>
    ) : (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.logoutButton} onPress={logoutHandler}>
                            <FontAwesome name="lock" size={20} color="white" />
                            <Text style={styles.logoutText}>Salir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.myOrdersButton} onPress={navigateToMyOrders}>
                            <FontAwesome name="list-ul" size={20} color="white" />
                            <Text style={styles.logoutText}>Mis Pedidos</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.title}>Perfil de Usuario</Text>
                    {errorProfile && <Message variant='danger'>{errorProfile}</Message>}
                    {successMessage && <Message variant='success'>{successMessage}</Message>}
                    {loading && <Text>Cargando...</Text>}

                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder="Introduce nombre"
                        value={formData.name}
                        onChangeText={(value) => handleInputChange('name', value)}
                    />
                    {fieldErrors.name && <Message variant='danger'>{fieldErrors.name}</Message>}
                    <TextInput
                        style={[styles.inputField, styles.input]}
                        placeholder="Introduce email"
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                    />
                    {fieldErrors.email && <Message variant='danger'>{fieldErrors.email}</Message>}
                    <PasswordInput
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        placeholder="Introduce contraseña"
                    />
                    {fieldErrors.password && <Message variant='danger'>{fieldErrors.password}</Message>}
                    <PasswordInput
                        placeholder="Confirmar contraseña"
                        value={formData.confirmPassword}
                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                    />
                    {fieldErrors.confirmPassword && <Message variant='danger'>{fieldErrors.confirmPassword}</Message>}
                    <Button title="Actualizar" onPress={submitHandler} />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default ProfileScreen;