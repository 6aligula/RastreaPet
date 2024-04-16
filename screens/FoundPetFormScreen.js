// FoundPetFormScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from 'react-native-gesture-handler';
import useCameraPermissions from '../myHooks/useCameraPermissions';
import useLocationPermissions from '../myHooks/useLocationPermissions';
import Message from '../components/Message';
import styles from './styles/FoundPetFormScreenStyle';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

function FoundPetFormScreen() {
    const [emailValid, setEmailValid] = useState(true);
    const [errorCameraPermission, setErrorCameraPermission] = useState(false);
    const { requestCameraPermission } = useCameraPermissions();
    const { requestLocationPermission } = useLocationPermissions();
    const [images, setImages] = useState([]);

    //Funcion para seleccionar imagenes
    const handleSelectImages = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            selectionLimit: 0,  // 0 para múltiples selecciones
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const newImages = response.assets.map(asset => ({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName
                }));
                setImages(prevImages => [...prevImages, ...newImages]);
            }
        });
    };

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
    // Funcion para abrir la ubicacion
    const handlePress = async () => {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
            console.log('Permiso de ubicación concedido');
            // Aquí podrías iniciar la geolocalización
        } else {
            console.log('Permiso de ubicación denegado');
            // Manejo del caso en que el permiso no es concedido
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
                const newImage = {
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName
                };
                setImages(prevImages => [...prevImages, newImage]);
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

    const handleRemoveImage = (indexToRemove) => {
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView style={styles.formContainer}>
                <Text style={styles.title}>Reportar Mascota Encontrada</Text>

                <View style={styles.inputField}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.roundedButton}>
                            <Button title="Seleccionar imágenes" onPress={handleSelectImages} />
                        </View>
                        <View style={styles.roundedButton}>
                            <Button title="Abrir Cámara" onPress={openCameraWithPermission} />
                        </View>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {images.map((image, index) => (
                            <View key={index} style={styles.imagePreviewContainer}>
                                <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => handleRemoveImage(index)}>
                                    <Icon name="close" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {errorCameraPermission && (
                    <Message variant="danger"> Permiso denegado</Message>
                )}

                <View style={styles.inputField}>
                    <Text style={styles.label}>Dirección donde lo encontraste:</Text>
                    <TextInput
                        value={formData.address}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, address: value }))}
                        style={styles.input}
                    />
                </View>

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
            </ScrollView>
        </SafeAreaView>

    );
}

export default FoundPetFormScreen;
