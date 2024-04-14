import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles/OrderStyles';
import { getOrderDetails } from '../store/actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import useAndroidBackButton from '../myHooks/useAndroidBackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderScreen = ({ navigation, route }) => {

    const customBackAction = () => {
        navigation.navigate('MyOrdersScreen');
    };

    useAndroidBackButton(navigation, customBackAction);

    const { orderId } = route.params
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const isLoading = loadingPaymentData || loadingPay;

    useEffect(() => {
        if (!userInfo) {
            navigation.navigate('LoginScreen');
        }
        dispatch(getOrderDetails(orderId));

    }, [dispatch, orderId, userInfo, navigation]);

    return loading ? (
        <Loader />
    ) : error ? (
        <View>
            {error && <Message variant='danger'>{error}</Message>}
        </View>
    ) : (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Pedido: {order._id}</Text>
                    <View>
                        <View>
                            <Text style={styles.subTitle}>Dirección de Envio</Text>
                            <Text style={styles.description}>Destinatario: {order.shippingAddress.recipientName}</Text>
                            <Text style={styles.description}>Email: {order.user.email}</Text>
                            <Text style={styles.description}>Dirección: {order.shippingAddress.province}, {order.shippingAddress.city}, {order.shippingAddress.address}, {order.shippingAddress.postalCode}</Text>
                        </View>
                        <Text style={styles.description}>Estado del envio</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Message variant={order.isDelivered ? (order.deliveredAt ? 'success' : 'success-light') : 'info'}>
                                {order.isDelivered ? (order.deliveredAt ? 'Enviado: ' + order.deliveredAt.substring(0, 10) : 'Enviado sin fecha') : 'No enviado'}
                            </Message>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.subTitle}>Productos a enviar</Text>
                        {order.orderItems.length === 0 ? <Message variant='danger'>
                            Tu pedido esta vacio
                        </Message> : (
                            <View>
                                {order.orderItems.map((item, index) => (
                                    <View key={index}>
                                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 5 }} />
                                        <TouchableOpacity onPress={() => navigation.navigate('DetailProductScreen', { productId: item.product })}>
                                            <Text style={styles.productName}>{item.name}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.productName}>
                                            {item.qty}uds X  {item.price}€ = {(item.qty * item.price).toFixed(2)}€
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View>
                        <Text style={styles.subTitle}>Resumen del pedido</Text>
                        <Text style={styles.description}>Envio: {order.shippingPrice}€</Text>
                        <Text style={styles.description}>Total: {order.totalPrice}€</Text>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

    );
};

export default OrderScreen;