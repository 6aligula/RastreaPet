import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../store/actions/orderActions';
import styles from './styles/MyOrdersStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Message from '../components/Message';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import Loader from '../components/Loader';

const MyOrdersScreen = ({navigation}) => {
    useAndroidBackButton(navigation, () => {
        navigation.navigate('ProfileScreen');
    });

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            navigation.navigate('LoginScreen');
            return;
        } 
        dispatch(listMyOrders());
    }, [dispatch, userInfo])


    const renderOrderItem = ({ item: order }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('OrderScreen', { orderId: order._id, fromProfile: true });
            }}
        >
            <View style={[styles.row, styles.rowCell]}>
                <Text style={[styles.cell, styles.cellID]}>{order._id}</Text>
                <Text style={[styles.cell, styles.cellFecha]}>{order.createAt.substring(0, 10)}</Text>
                <Text style={[styles.cell, styles.cellTotal]}>{order.totalPrice}</Text>
                <Text style={[styles.cell, styles.cellPagado]}>
                    {order.isPaid ? (order.paidAt ? order.paidAt.substring(0, 10) : 'Pagado sin fecha') : '❌'}
                </Text>
                <Text style={[styles.cell, styles.cellEnviado]}>
                    {order.isDelivered ? (order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'Enviado sin fecha') : '❌'}</Text>
            </View>

        </TouchableOpacity>
    );

    const renderOrderHeader = () => (
        <View>
            <Text style={styles.title}>Mis Pedidos</Text>
            <View style={styles.row}>
                <Text style={[styles.headerCell, styles.cellID]}>ID</Text>
                <Text style={[styles.headerCell, styles.cellFecha]}>Fecha</Text>
                <Text style={[styles.headerCell, styles.cellTotal]}>Total</Text>
                <Text style={[styles.headerCell, styles.cellPagado]}>Pagado</Text>
                <Text style={[styles.headerCell, styles.cellEnviado]}>Enviado</Text>
            </View>
        </View>
    );

    const CombinedHeader = () => (
        <View>
            {renderOrderHeader()}
        </View>
    );
    return (
        <SafeAreaView style={styles.safeArea}>

            {loadingOrders ? (
                <Loader />
            ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
            ) : orders.length === 0 ? (
                <Message variant='info'>No tienes pedidos realizados</Message>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item._id}
                    renderItem={renderOrderItem}
                    ListHeaderComponent={CombinedHeader}
                />
            )}

        </SafeAreaView>
    );
}

export default MyOrdersScreen