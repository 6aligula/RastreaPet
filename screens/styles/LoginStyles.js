import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: 300,
        margin: 20,
        fontFamily: 'Arial',
    },
    
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    input: {
        fontWeight: 'bold',
        color: '#27ae60',
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
    },
    inputField: {
        marginBottom: 10,
        width: '100%',
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 30,
        width: '100%',
        justifyContent: 'center',
    },    
    registerLink: {
        color: 'blue',
        textDecorationLine: 'underline',

    },
    label: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#34495e',

    },
    roundedButton: {
        borderRadius: 25,
        overflow: 'hidden',
    },
});

export default styles;