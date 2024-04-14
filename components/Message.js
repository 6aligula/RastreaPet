import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/MessageStyle';

const Message = ({ variant, children }) => {
    let backgroundColor;

    switch (variant) {
        case 'danger':
            backgroundColor = 'red';
            break;
        case 'info':
            backgroundColor = 'orange';
            break;
        case 'success-light':
            backgroundColor = '#90EE90';
            break;
        default:
            backgroundColor = 'green';
    }
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
};
export default Message;
