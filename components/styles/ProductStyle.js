import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        margin: 5,
        width: (screenWidth / 2) - 10,
    },

    imageContainer: {
        width: (screenWidth / 2) - 10,
        height: 200,
        overflow: 'hidden',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '100%',
    },

    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#27ae60',
    },
});

export default styles;