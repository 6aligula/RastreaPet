//FormScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles//FormStyles';
import arbol from '../data/arbol.json'
import { useDispatch, useSelector } from 'react-redux';
import { createPet } from '../store/actions/petActions';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { validateEmail } from '../functions/functions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker';

const provincesAndCities = arbol.reduce((result, region) => {
    region.provinces.forEach(province => {
        result[province.label] = province.towns.map(town => town.label);
    });
    return result;
}, {});


function FormScreen({ navigation }) {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const formattedDate = date.toLocaleDateString('es-ES');  // Formato de fecha local 'dd/mm/yyyy'

    const [images, setImages] = useState([]);

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
                setImages([...images, ...newImages]);
            }
        });
    };    

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setFormData(prev => ({ ...prev, missingDate: currentDate.toISOString().split('T')[0] })); // Guarda la fecha en formato YYYY-MM-DD
    };

    const showDatepicker = () => {
        setShow(true);
    };

    useEffect(() => {
        if (!userInfo) {
            navigation.navigate('LoginScreen', { from: 'FormScreen' });
        }

    }, [dispatch, userInfo, navigation]);

    useAndroidBackButton(navigation);

    const dispatch = useDispatch();

    const initialProvince = Object.keys(provincesAndCities)[30];
    const initialCity = provincesAndCities[initialProvince][95];

    const [emailValid, setEmailValid] = useState(true);
    const [fieldErrors, setFieldErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        breed: '',
        age: '',
        reward: '',
        missingDate: '',
        description: '',
        province: initialProvince,
        city: initialCity,
        postalCode: '',
        address: '',
        email: '',
        mobil: '',
    });

    const validateFields = () => {
        const errors = {};
        const fieldsToValidate = {
            name: 'El nombre de la mascota es obligatorio.',
            category: 'El tipo de mascota es obligatorio.',
            breed: 'La raza de mascota es obligatoria.',
            age: 'La edad de la mascota es obligatoria.',
            missingDate: 'La fecha cuando se perdio la mascota es obligatoria.',

            province: 'La provincia es obligatoria.',
            city: 'La ciudad es obligatoria.',
            postalCode: 'El código postal es obligatorio.',
            address: 'La dirección es obligatoria.',
        };

        for (const [field, errorMessage] of Object.entries(fieldsToValidate)) {
            if (!formData[field]) {
                errors[field] = errorMessage;
            }
        }

        setFieldErrors(errors);
        return !Object.keys(errors).length;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            console.log("data", formData)
            dispatch(createPet(formData, images));
            //navigation.navigate('PlaceOrderScreen');
            return;
        }
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
            <ScrollView style={styles.formContainer}>
                <Text style={styles.title}>Datos de la mascota</Text>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Nombre de la mascota:</Text>
                    <TextInput
                        value={formData.name}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, name: value }))}
                        style={styles.input}
                    />
                    {fieldErrors.name && <Text style={{ color: 'red' }}>{fieldErrors.name}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Tipo de mascota, Ejemplo Gato:</Text>
                    <TextInput
                        value={formData.category}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        style={styles.input}
                    />
                    {fieldErrors.category && <Text style={{ color: 'red' }}>{fieldErrors.category}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Raza de mascota, Ejemplo Siamés:</Text>
                    <TextInput
                        value={formData.breed}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, breed: value }))}
                        style={styles.input}
                    />
                    {fieldErrors.breed && <Text style={{ color: 'red' }}>{fieldErrors.breed}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Edad de mascota:</Text>
                    <TextInput
                        value={formData.age}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, age: value }))}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                    {fieldErrors.age && <Text style={{ color: 'red' }}>{fieldErrors.age}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Recompensa opcional:</Text>
                    <TextInput
                        value={formData.reward}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, reward: value }))}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Fecha de perdida de mascota:</Text>

                    <View style={styles.buttonContainer}>
                        <View style={styles.roundedButton}>
                            <Button onPress={showDatepicker} title="Selecciona la fecha" />
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>
                    <Text style={styles.dateDisplay}>{formattedDate}</Text>
                    {fieldErrors.missingDate && <Text style={{ color: 'red' }}>{fieldErrors.missingDate}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Provincia:</Text>
                    <Picker
                        selectedValue={formData.province}
                        style={styles.quantityPicker}
                        onValueChange={(itemValue) => {
                            setFormData(prev => ({
                                ...prev,
                                province: itemValue,
                                city: provincesAndCities[itemValue][0]
                            }));

                        }}>
                        {Object.keys(provincesAndCities).map(provinceName => (
                            <Picker.Item key={provinceName} label={provinceName} value={provinceName} />
                        ))}
                    </Picker>
                    {fieldErrors.province && <Text style={{ color: 'red' }}>{fieldErrors.province}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Ciudad:</Text>
                    <Picker
                        selectedValue={formData.city}
                        style={styles.quantityPicker}
                        onValueChange={(itemValue) => {
                            setFormData(prev => ({
                                ...prev,
                                city: itemValue
                            }));
                        }}>
                        {formData.province ? provincesAndCities[formData.province].map(cityName => (
                            <Picker.Item key={cityName} label={cityName} value={cityName} />
                        )) : null}
                    </Picker>
                    {fieldErrors.city && <Text style={{ color: 'red' }}>{fieldErrors.city}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Código Postal:</Text>
                    <TextInput
                        value={formData.postalCode}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, postalCode: value }))}
                        style={styles.input}
                        keyboardType='numeric'
                    />
                    {fieldErrors.postalCode && <Text style={{ color: 'red' }}>{fieldErrors.postalCode}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Dirección donde se perdio:</Text>
                    <TextInput
                        value={formData.address}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, address: value }))}
                        style={styles.input}
                    />
                    {fieldErrors.address && <Text style={{ color: 'red' }}>{fieldErrors.address}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Button title="Añadir imágenes" onPress={handleSelectImages} />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {images.map((image, index) => (
                            <View key={index} style={styles.imagePreviewContainer}>
                                <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                            </View>
                        ))}
                    </ScrollView>
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

                <View style={styles.inputField}>
                    <Text style={styles.label}>Descripción opcional:</Text>
                    <TextInput
                        value={formData.description}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, description: value }))}
                        style={styles.input}
                        multiline
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

export default FormScreen;