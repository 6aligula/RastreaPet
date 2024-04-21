import React, { useState } from 'react';
import styles from '../screens/styles/HomeStyles';
import Message from './Message';
import { View, TextInput, Button } from 'react-native';
import { useColorSchemeContext } from '../ColorSchemeContext';

const SearchBox = ({ navigation }) => {
    const { stylesGlobal } = useColorSchemeContext();
    const [searchError, setSearchError] = useState("");
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = () => {
        const trimmedSearchKeyword = searchKeyword.trim();
        if (trimmedSearchKeyword === "") {
            setSearchError("Introduce el nombre de la mascota a buscar");
        } else {
            setSearchError("");
            navigation.navigate('SearchScreen', { searchKeyword: trimmedSearchKeyword });
        }
    }
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[styles.searchInput, stylesGlobal.text]}
                value={searchKeyword}
                onChangeText={setSearchKeyword}
                placeholder="Buscar mascota..."
                placeholderTextColor={stylesGlobal.placeholderTextColor.color}
                onSubmitEditing={handleSearch}
            />
            <Button title="Buscar" onPress={handleSearch} />
            {searchError && <Message variant="danger">{searchError}</Message>} 
        </View>
    );
};
export default SearchBox;