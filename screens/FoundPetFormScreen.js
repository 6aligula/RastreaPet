// FoundPetFormScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { createPetFound } from '../store/actions/petActions';
import { launchCamera } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';
import { ScrollView } from 'react-native-gesture-handler';
import useCameraPermissions from '../myHooks/useCameraPermissions';
import useLocationPermissions from '../myHooks/useLocationPermissions';
import Message from '../components/Message';
import styles from './styles/FoundPetFormScreenStyle';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { validateEmail } from '../functions/functions';
import Loader from '../components/Loader';

function FoundPetFormScreen({ navigation }) {
    const [emailValid, setEmailValid] = useState(true);
    const [errorCameraPermission, setErrorCameraPermission] = useState(false);
    const { requestCameraPermission } = useCameraPermissions();
    const { requestLocationPermission } = useLocationPermissions();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('info'); // 'info' o 'danger'    
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

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

    // Función para obtener la ubicación automáticamente
    const getLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (hasPermission) {
            setLoading(true);
            Geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
    
                    try {
                        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
                        const response = await fetch(url, {
                            method: 'GET',
                            headers: {
                                'User-Agent': 'tu_nombre_app/tu_email_contacto'
                            }
                        });
                        const data = await response.json();
                        if (data && data.address) {
                            const address = `${data.address.road || ''} ${data.address.house_number || ''}, ${data.address.city || data.address.town || ''}, ${data.address.state || ''}, ${data.address.country || ''}, ${data.address.postcode || ''}`;
                            setFormData(prev => ({ ...prev, address: address }));
                            setMessage('Ubicación correcta, no olvides añadir el número de la calle.');
                            setMessageType('info');
                            console.log('Dirección obtenida:', address);
                        } else {
                            console.log('Geocodificación falló:', data.error);
                            setMessage('Error al realizar la geocodificación.');
                            setMessageType('danger');
                        }
                    } catch (error) {
                        console.error('Error al realizar la geocodificación:', error);
                        setMessage('Error al realizar la geocodificación 2.');
                        setMessageType('danger');
                    }finally {
                        setLoading(false); // Desactiva el loader independientemente del resultado
                    }
                },
                (error) => {
                    console.error('Error obteniendo la localización:', error);
                    setMessage('Error al obtener la ubicación.');
                    setMessageType('danger');
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } else {
            setMessage('Permiso de ubicación denegado.');
            setMessageType('danger');
            setLoading(false);
        }
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
        console.log("data", formData)
        dispatch(createPetFound(formData, images));
        navigation.navigate('HomeScreen');
        return;
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
                        multiline
                    />
                    <Button title="Obtener ubicación" onPress={getLocation} />
                </View>
                {loading && <Loader />}
                {message && (
                    <Message variant={messageType}>{message}</Message>
                )}

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
                <View style={styles.buttonContainer}>
                    <View style={styles.roundedButton}>
                        <Button
                            title='Enviar formulario'
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default FoundPetFormScreen;
