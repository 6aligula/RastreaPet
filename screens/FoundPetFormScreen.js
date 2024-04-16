// FoundPetFormScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, SafeAreaView } from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from 'react-native-gesture-handler';
import useCameraPermissions  from '../myHooks/useCameraPermissions';
import Message from '../components/Message';
import styles from './styles/FoundPetFormScreenStyle';

function FoundPetFormScreen() {
    const [emailValid, setEmailValid] = useState(true);
    const [errorCameraPermission, setErrorCameraPermission] = useState(false);
    const { requestCameraPermission } = useCameraPermissions();

    // Función para abrir la cámara con permisos
    const openCameraWithPermission = async () => {
        const hasPermission = await requestCameraPermission();
        if (hasPermission) {
            try {
                openCamera(); // Manejar sus propios errores como ya estás haciendo
            } catch (error) {
                console.error("Error al abrir la cámara:", error);
                setErrorCameraPermission(true);
            }
        } else {
            setErrorCameraPermission(true);
            console.log('No se otorgaron los permisos para la cámara');
        }
    };   

    const [formData, setFormData] = useState({
        description: '',
        address: '',
        email: '',
        mobil: '',
    });

    const handleSubmit = () => {
        if (validateFields()) {
            console.log("data", formData)
            dispatch(createPet(formData, images));
            //navigation.navigate('PlaceOrderScreen');
            return;
        }
    };


    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setAddress(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
            },
            (error) => {
                console.error('Error obteniendo la localización: ', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const openCamera = () => {
        const options = {
            saveToPhotos: true,
            mediaType: 'photo',
        };

        launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('El usuario canceló la toma de foto');
              } else if (response.error) {
                console.log('Error de ImagePicker: ', response.error);
              } else {
                console.log('Foto tomada:', response.uri);
                //getLocation(); // Obtener la ubicación al tomar la foto
            }
        });
    };

    const handleEmailChange = (emailValue) => {
        setFormData(prev => ({ ...prev, email: emailValue }))
        if (!validateEmail(emailValue)) {
            setEmailValid(false);
        } else {
            setEmailValid(true);
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {/* {!errorCameraPermission && <Message variant="danger">Sin permiso a la camara.</Message>} */}
            <ScrollView style={styles.formContainer}>
                <Text style={styles.title}>Reportar Mascota Encontrada</Text>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Descripción opcional:</Text>
                    <TextInput
                        value={formData.description}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, description: value }))}
                        style={styles.input}
                        multiline
                    />
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Dirección donde lo encontraste:</Text>
                    <TextInput
                        value={formData.address}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, address: value }))}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Email: opcional</Text>
                    <TextInput
                        value={formData.email}
                        onChangeText={handleEmailChange}
                        style={emailValid ? styles.input : { ...styles.input, borderColor: 'red' }}
                    />
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Telefono móvil opcional:</Text>
                    <TextInput
                        value={formData.mobil}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, mobil: value }))}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                </View>

                <Button
                    title="Abrir Cámara"
                    onPress={openCameraWithPermission}
                />
                {errorCameraPermission && (
                    <Message variant="danger"> Permiso denegado</Message>
                )}
            </ScrollView>
        </SafeAreaView>

    );
}

export default FoundPetFormScreen;
