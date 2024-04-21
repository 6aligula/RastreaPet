import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles/FloatingButtonStyle';

const FloatingButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.floatingButton}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
