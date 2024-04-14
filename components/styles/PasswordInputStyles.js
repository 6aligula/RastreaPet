import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        fontWeight: 'bold',
        color: '#27ae60',
        borderColor: 'grey',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10
    },
    inputField: {
        marginBottom: 10,
        width: '100%',
    },
});
export default styles;