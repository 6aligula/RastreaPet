import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/PasswordInputStyles';

const PasswordInput = ({ value, onChangeText, placeholder }) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    return (
        <View style={styles.inputWithIcon}>
            <TextInput
                style={[styles.inputField, styles.input]}
                placeholder={placeholder}
                placeholderTextColor="#888"
                secureTextEntry={!isPasswordVisible}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={() => setPasswordVisibility(!isPasswordVisible)}>
                <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#888" />
            </TouchableOpacity>
        </View>
    );
};
export default PasswordInput;