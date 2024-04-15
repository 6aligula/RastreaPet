//ProductStyle.js
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
        width: screenWidth -10,  // Usamos el ancho completo de la pantalla
    },

    imageContainer: {
        width: screenWidth -10,  // Usamos el ancho completo de la pantalla
        height: screenHeight / 3,  // Establecemos una altura proporcional, como 1/3 de la altura de la pantalla
        overflow: 'hidden',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',  // Podrías cambiar a 'contain' si no deseas que la imagen se recorte
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        width: '100%',  // Asegúrate de que el título también ocupe todo el ancho
    },

    price: {
        fontSize: 18,
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