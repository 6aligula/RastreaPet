import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#2c3e50',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        margin: 5,
    },
    rowCell: {
        backgroundColor: '#E0E0E0',  
        borderRadius: 5, 
        borderWidth: 1, 
        borderColor: '#757575',
    },
    cell: {

        textAlign: 'center',
        color: '#34495e',
    },
    headerCell: {

        textAlign: 'center',
        color: '#34495e',
        fontSize: 18,
    },
    cellID: {
        flex: 0.10,
    },
    cellFecha: {
        flex: 0.25,
    },
    cellTotal: {
        flex: 0.2,
    },
    cellPagado: {
        flex: 0.25,
    },
    cellEnviado: {
        flex: 0.2,
    },
});

export default styles;