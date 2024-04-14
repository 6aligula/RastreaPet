import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles/ShippingStyles';
import arbol from '../data/arbol.json'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/actions/cartActions';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { validateEmail } from '../functions/functions';

const provincesAndCities = arbol.reduce((result, region) => {
    region.provinces.forEach(province => {
        result[province.label] = province.towns.map(town => town.label);
    });
    return result;
}, {});


function ShippingForm({ navigation }) {
    useAndroidBackButton(navigation);
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();

    const initialProvince = Object.keys(provincesAndCities)[0];
    const initialCity = provincesAndCities[initialProvince][0];

    const [emailValid, setEmailValid] = useState(true);
    const [fieldErrors, setFieldErrors] = useState({});

    const [formData, setFormData] = useState({
        recipientName: '',
        province: initialProvince,
        city: initialCity,
        postalCode: '',
        address: '',
        email: '',
        mobil: '',
        comment: '',
    });

    useEffect(() => {
        if (shippingAddress) {
            setFormData({
                recipientName: shippingAddress.recipientName || '',
                province: shippingAddress.province || initialProvince,
                city: shippingAddress.city || initialCity,
                postalCode: shippingAddress.postalCode || '',
                address: shippingAddress.address || '',
                comment: shippingAddress.comment || '',
                email: shippingAddress.email || '',
                mobil: shippingAddress.mobil || ''
            });
        }
    }, [shippingAddress, initialProvince, initialCity]);

    const validateFields = () => {
        const errors = {};
        const fieldsToValidate = {
            recipientName: 'El nombre del destinatario es obligatorio.',
            province: 'La provincia es obligatoria.',
            city: 'La ciudad es obligatoria.',
            postalCode: 'El código postal es obligatorio.',
            address: 'La dirección es obligatoria.',
            email: 'El email es obligatorio.',
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
            dispatch(saveShippingAddress({ ...formData }));
            navigation.navigate('PlaceOrderScreen');
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
                <Text style={styles.title}>Dirección de envio</Text>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Nombre del Destinatario:</Text>
                    <TextInput
                        value={formData.recipientName}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, recipientName: value }))}
                        style={styles.input}
                    />
                    {fieldErrors.recipientName && <Text style={{ color: 'red' }}>{fieldErrors.recipientName}</Text>}
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
                    <Text style={styles.label}>Dirección:</Text>
                    <TextInput
                        value={formData.address}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, address: value }))}
                        style={styles.input}
                    />
                    {fieldErrors.address && <Text style={{ color: 'red' }}>{fieldErrors.address}</Text>}
                </View>

                <View style={styles.inputField}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        value={formData.email}
                        onChangeText={handleEmailChange}
                        style={emailValid ? styles.input : { ...styles.input, borderColor: 'red' }}
                    />
                    {!emailValid && <Text style={{ color: 'red' }}>Por favor, ingresa un correo electrónico válido. Solo se acepta letras minúsculas</Text>}
                    {fieldErrors.email && <Text style={{ color: 'red' }}>{fieldErrors.email}</Text>}
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
                    <Text style={styles.label}>Comentario opcional:</Text>
                    <TextInput
                        value={formData.comment}
                        onChangeText={(value) => setFormData(prev => ({ ...prev, comment: value }))}
                        style={styles.input}
                        multiline
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.roundedButton}>
                        <Button
                            title='Siguiente'
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default ShippingForm;