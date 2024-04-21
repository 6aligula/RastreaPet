import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height; 

const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        margin: 5,
        width: screenWidth -10,
        alignItems: 'center',
    },

    imageContainer: {
        width: screenWidth -10,
        height: screenHeight / 3,
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
        fontSize: 18,
        fontWeight: 'bold',
        
    },

    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#27ae60',
    },
    detailsButton: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginTop: 10,
      },
      detailsButtonText: {
        color: 'white',
        textAlign: 'center',
      },
});

export default styles;