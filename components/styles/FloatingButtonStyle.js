import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        left: '10%',
        right: '10%',
        bottom: 60,
        backgroundColor: '#FF4081',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
export default styles;