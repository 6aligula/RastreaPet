import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        left: '10%', // Centrado con un 10% de margen a cada lado
        right: '10%',
        bottom: 60, // A una distancia de 20 del borde inferior
        backgroundColor: '#FF4081', // El color de fondo que desees
        borderRadius: 25, // Esto dará los bordes redondeados
        paddingVertical: 10, // Un poco de padding vertical para dar altura
        paddingHorizontal: 0, // El padding horizontal
        justifyContent: 'center', // Centrar el contenido (texto o icono) horizontalmente
        alignItems: 'center', // Centrar el contenido (texto o icono) verticalmente
        elevation: 4, // Sombra para Android
        shadowOpacity: 0.3, // Sombra para iOS
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
    },
    buttonText: {
        color: 'white',
        // Puedes ajustar la fuente como prefieras
        fontSize: 16,
        textAlign: 'center', // Asegura que el texto esté centrado
    },
});
export default styles;