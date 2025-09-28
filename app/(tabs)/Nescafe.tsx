// import React, { useState, useRef, useEffect } from 'react';
// import {AuthProvider} from "@/app/AuthContext";
// import {    }
// import {
//     View, Text, TouchableOpacity, StyleSheet, FlatList,
//     Modal, Animated, PanResponder, Dimensions
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
//
// const MENU_ITEMS = [
//     { id: '1', name: 'Burger', price: 100 },
//     { id: '2', name: 'Pizza', price: 250 },
//     { id: '3', name: 'Pasta', price: 150 },
// ];
// const screenHeight = Dimensions.get("window").height;
//
// const MenuItem = ({ item, quantity, onAdd, onRemove }) => (
//     <View style={styles.menuItem}>
//         <Text style={styles.menuItemName}>{item.name}</Text>
//         <Text style={styles.menuItemPrice}>₹{item.price}</Text>
//         <View style={styles.quantityContainer}>
//             <TouchableOpacity onPress={onRemove} style={styles.qtyButton}>
//                 <Text style={styles.qtyButtonText}>-</Text>
//             </TouchableOpacity>
//             <Text style={styles.quantityText}>{quantity}</Text>
//             <TouchableOpacity onPress={onAdd} style={styles.qtyButton}>
//                 <Text style={styles.qtyButtonText}>+</Text>
//             </TouchableOpacity>
//         </View>
//     </View>
// );
//
// function PaymentSuccess({ amount = "25.00", payee = "Campus Eats", onViewDetails, onReturnHome }) {
//     const scaleAnim = useRef(new Animated.Value(0)).current;
//
//     useEffect(() => {
//         Animated.spring(scaleAnim, {
//             toValue: 1,
//             friction: 6,
//             useNativeDriver: true,
//         }).start();
//     }, []);
//
//     return (
//         <View style={styles.successContainer}>
//             <Animated.View style={[styles.tickWrapper, { transform: [{ scale: scaleAnim }] }]}>
//                 <MaterialCommunityIcons name="check-circle" size={110} color="#269c51" />
//             </Animated.View>
//             <Text style={styles.successTitle}>Payment Successful</Text>
//             <Text style={styles.successDesc}>
//                 Your payment of <Text style={styles.bold}>${amount}</Text> to {payee} has
//                 been successfully processed.
//             </Text>
//             <View style={styles.buttonGroup}>
//                 <TouchableOpacity style={styles.detailButton} onPress={onViewDetails}>
//                     <Text style={styles.detailButtonText}>View Transaction Details</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.homeButton} onPress={onReturnHome}>
//                     <Text style={styles.homeButtonText}>Return to Home</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }
//
// export default function MenuPage() {
//     const [quantities, setQuantities] = useState({});
//     const [modalVisible, setModalVisible] = useState(false);
//     const [panY] = useState(new Animated.Value(screenHeight));
//     const [paymentAmount, setPaymentAmount] = useState('0.00');
//     const [showSuccess, setShowSuccess] = useState(false);
//
//     const addItem = (id) => {
//         setQuantities((prev) => ({
//             ...prev,
//             [id]: (prev[id] || 0) + 1,
//         }));
//     };
//
//     const removeItem = (id) => {
//         setQuantities((prev) => {
//             const currentQty = prev[id] || 0;
//             if (currentQty > 0) {
//                 return {
//                     ...prev,
//                     [id]: currentQty - 1,
//                 };
//             }
//             return prev;
//         });
//     };
//
//     const totalOrders = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
//     const totalAmount = MENU_ITEMS.reduce(
//         (sum, item) => sum + (quantities[item.id] || 0) * item.price,
//         0
//     );
//
//     const resetPosition = () => {
//         Animated.timing(panY, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//         }).start();
//     };
//     const closeModal = () => {
//         Animated.timing(panY, {
//             toValue: screenHeight,
//             duration: 300,
//             useNativeDriver: true,
//         }).start(() => setModalVisible(false));
//     };
//
//     const panResponder = PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onPanResponderMove: (evt, gestureState) => {
//             if (gestureState.dy > 0) {
//                 panY.setValue(gestureState.dy);
//             }
//         },
//         onPanResponderRelease: (evt, gestureState) => {
//             if (gestureState.dy > 100) {
//                 closeModal();
//             } else {
//                 resetPosition();
//             }
//         },
//     });
//
//     // const openUpiApp = () => {
//     //     const payeeVPA = "campuscanteen@upi";
//     //     const payeeName = "Campus Canteen";
//     //     const transactionRef = `order_${Date.now()}`;
//     //     const deeplink = `upi://pay?pa=${encodeURIComponent(payeeVPA)}&pn=${encodeURIComponent(payeeName)}&tr=${encodeURIComponent(transactionRef)}&tn=${encodeURIComponent("Food order payment")}&am=${encodeURIComponent(paymentAmount)}&cu=INR&mc=0000`;
//     //     console.log("UPI payment link:", deeplink);
//     //     // Here you would open the deeplink via Linking.openURL(deeplink)
//     //     closeModal();
//     //     setShowSuccess(true);
//     // };
//     const openUpiApp = async () => {
//         const payeeVPA = "campuscanteen@upi";
//         const payeeName = "Campus Canteen";
//         const transactionRef = `order_${Date.now()}`;
//         const deeplink = `upi://pay?pa=${encodeURIComponent(payeeVPA)}&pn=${encodeURIComponent(payeeName)}&tr=${encodeURIComponent(transactionRef)}&tn=${encodeURIComponent("Food order payment")}&am=${encodeURIComponent(paymentAmount)}&cu=INR&mc=0000`;
//
//         // Make the backend request after payment trigger
//         try {
//             // example payee and vendor IDs, replace with actual values in your app
//             const payeeId = "";
//             const vendorId = "REPLACE_WITH_VENDOR_ID";
//             await sendTransactionToBackend(payeeId, vendorId, quantities, Number(paymentAmount));
//             console.log('Transaction sent to backend!');
//         } catch (err) {
//             console.error('Transaction backend error:', err);
//         }
//
//
//         const openPayment = () => {
//         if (totalOrders === 0) return;
//         setPaymentAmount(totalAmount.toFixed(2));
//         setModalVisible(true);
//         resetPosition();
//     };
//
//     if (showSuccess) {
//         return (
//             <PaymentSuccess
//                 amount={paymentAmount}
//                 payee="Campus Eats"
//                 onViewDetails={() => alert('View transaction details pressed')}
//                 onReturnHome={() => setShowSuccess(false)}
//             />
//         );
//     }
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Menu</Text>
//             <FlatList
//                 data={MENU_ITEMS}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <MenuItem
//                         item={item}
//                         quantity={quantities[item.id] || 0}
//                         onAdd={() => addItem(item.id)}
//                         onRemove={() => removeItem(item.id)}
//                     />
//                 )}
//                 contentContainerStyle={styles.list}
//             />
//             {totalOrders > 0 && (
//                 <TouchableOpacity style={styles.totalOrdersBar} onPress={openPayment}>
//                     <Text style={styles.totalOrdersText}>
//                         Pay for {totalOrders} item{totalOrders > 1 ? 's' : ''} (₹{totalAmount.toFixed(2)})
//                     </Text>
//                 </TouchableOpacity>
//             )}
//
//             <Modal visible={modalVisible} transparent animationType="none" onRequestClose={closeModal}>
//                 <View style={styles.modalOverlay}>
//                     <Animated.View style={[styles.modalContent, { transform: [{ translateY: panY }] }]} {...panResponder.panHandlers}>
//                         <View style={styles.modalHandle} />
//                         <Text style={styles.modalTitle}>Complete Payment</Text>
//                         <Text style={styles.modalSubtitle}>You are about to pay</Text>
//                         <Text style={styles.modalAmount}>₹{paymentAmount}</Text>
//                         <Text style={styles.modalTo}>to Campus Canteen</Text>
//                         <TouchableOpacity style={styles.modalButton} onPress={openUpiApp}>
//                             <Text style={styles.modalButtonText}>Open UPI App</Text>
//                         </TouchableOpacity>
//                         <Text style={styles.modalNote}>You will be redirected to your UPI app to complete the payment.</Text>
//                     </Animated.View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }
//
// const themeColors = {
//     background: '#121212',
//     primary: '#007bff',
//     textPrimary: '#e0e0e0',
//     buttonBackground: '#007bff',
//     buttonText: '#ffffff',
//     borderColor: '#333',
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: themeColors.background,
//         padding: 16,
//         paddingBottom: 80,
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: themeColors.textPrimary,
//         marginBottom: 16,
//     },
//     list: {
//         paddingBottom: 24,
//     },
//     menuItem: {
//         backgroundColor: '#1e1e1e',
//         padding: 16,
//         marginVertical: 8,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: themeColors.borderColor,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     menuItemName: {
//         fontSize: 18,
//         color: themeColors.textPrimary,
//     },
//     menuItemPrice: {
//         fontSize: 16,
//         color: '#aaa',
//         marginRight: 16,
//     },
//     quantityContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     qtyButton: {
//         backgroundColor: themeColors.buttonBackground,
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 4,
//     },
//     qtyButtonText: {
//         color: themeColors.buttonText,
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     quantityText: {
//         marginHorizontal: 12,
//         fontSize: 16,
//         width: 24,
//         textAlign: 'center',
//         color: themeColors.textPrimary,
//     },
//     totalOrdersBar: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: themeColors.primary,
//         padding: 16,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     totalOrdersText: {
//         color: themeColors.buttonText,
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     modalOverlay: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         backgroundColor: 'rgba(0,0,0,0.6)',
//     },
//     modalContent: {
//         backgroundColor: '#2c2f36',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         minHeight: 350,
//         padding: 20,
//         alignItems: 'center',
//     },
//     modalHandle: {
//         width: 60,
//         height: 7,
//         backgroundColor: '#51525a',
//         borderRadius: 4,
//         alignSelf: 'center',
//         marginBottom: 18,
//     },
//     modalTitle: {
//         color: '#fff',
//         fontSize: 26,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     modalSubtitle: {
//         color: '#AAAEB8',
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     modalAmount: {
//         color: '#fff',
//         fontSize: 48,
//         fontWeight: 'bold',
//         marginBottom: 2,
//         marginTop: 5,
//     },
//     modalTo: {
//         color: '#AAAEB8',
//         fontSize: 18,
//         marginBottom: 30,
//         marginTop: 5,
//     },
//     modalButton: {
//         backgroundColor: themeColors.primary,
//         borderRadius: 10,
//         width: '100%',
//         height: 55,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginBottom: 24,
//     },
//     modalButtonText: {
//         color: themeColors.buttonText,
//         fontWeight: 'bold',
//         fontSize: 20,
//     },
//     modalNote: {
//         color: '#868686',
//         fontSize: 15,
//         textAlign: 'center',
//         marginTop: 10,
//     },
//     successContainer: {
//         flex: 1,
//         backgroundColor: '#151b26',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingHorizontal: 18,
//     },
//     tickWrapper: {
//         marginBottom: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     successTitle: {
//         color: '#fff',
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 12,
//         textAlign: 'center',
//     },
//     successDesc: {
//         color: '#bfc4ce',
//         fontSize: 17,
//         textAlign: 'center',
//         marginBottom: 38,
//     },
//     bold: {
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     buttonGroup: {
//         width: '100%',
//         alignItems: 'center',
//     },
//     detailButton: {
//         width: '100%',
//         paddingVertical: 16,
//         marginBottom: 10,
//         borderRadius: 9,
//         backgroundColor: '#2591fa',
//         alignItems: 'center',
//     },
//     detailButtonText: {
//         color: '#fff',
//         fontWeight: '700',
//         fontSize: 18,
//     },
//     homeButton: {
//         width: '100%',
//         paddingVertical: 16,
//         borderRadius: 9,
//         backgroundColor: '#243047',
//         alignItems: 'center',
//     },
//     homeButtonText: {
//         color: '#c6cfe1',
//         fontWeight: '700',
//         fontSize: 18,
//     },
// });


import React, { useState, useRef, useEffect } from 'react';
import {AuthProvider} from "@/app/AuthContext";

import {
    View, Text, TouchableOpacity, StyleSheet, FlatList,
    Modal, Animated, PanResponder, Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { sendTransactionToBackend } from './TransactionData'; // Update import path as needed

const MENU_ITEMS = [
    { id: '1', name: 'Iced Tea', price: 20 },
    { id: '2', name: 'Cold Coffee', price: 32 },
    { id: '3', name: 'Maggi', price: 50 },
];
const screenHeight = Dimensions.get("window").height;

const MenuItem = ({ item, quantity, onAdd, onRemove }) => (
    <View style={styles.menuItem}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>₹{item.price}</Text>
        <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={onRemove} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={onAdd} style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
);

function PaymentSuccess({ amount = "25.00", payee = "Campus Eats", onViewDetails, onReturnHome }) {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.successContainer}>
            <Animated.View style={[styles.tickWrapper, { transform: [{ scale: scaleAnim }] }]}>
                <MaterialCommunityIcons name="check-circle" size={110} color="#269c51" />
            </Animated.View>
            <Text style={styles.successTitle}>Payment Successful</Text>
            <Text style={styles.successDesc}>
                Your payment of <Text style={styles.bold}>${amount}</Text> to {payee} has
                been successfully processed.
            </Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.detailButton} onPress={onViewDetails}>
                    <Text style={styles.detailButtonText}>View Transaction Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.homeButton} onPress={onReturnHome}>
                    <Text style={styles.homeButtonText}>Return to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function MenuPage() {
    const [quantities, setQuantities] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [panY] = useState(new Animated.Value(screenHeight));
    const [paymentAmount, setPaymentAmount] = useState('0.00');
    const [showSuccess, setShowSuccess] = useState(false);

    const addItem = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const removeItem = (id) => {
        setQuantities((prev) => {
            const currentQty = prev[id] || 0;
            if (currentQty > 0) {
                return {
                    ...prev,
                    [id]: currentQty - 1,
                };
            }
            return prev;
        });
    };

    const totalOrders = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
    const totalAmount = MENU_ITEMS.reduce(
        (sum, item) => sum + (quantities[item.id] || 0) * item.price,
        0
    );

    const resetPosition = () => {
        Animated.timing(panY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    const closeModal = () => {
        Animated.timing(panY, {
            toValue: screenHeight,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dy > 0) {
                panY.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 100) {
                closeModal();
            } else {
                resetPosition();
            }
        },
    });

    const openUpiApp = async () => {
        const payeeVPA = "campuscanteen@upi";
        const payeeName = "Nescafe";
        const transactionRef = `order_${Date.now()}`;
        const deeplink = `upi://pay?pa=${encodeURIComponent(payeeVPA)}&pn=${encodeURIComponent(payeeName)}&tr=${encodeURIComponent(transactionRef)}&tn=${encodeURIComponent("Food order payment")}&am=${encodeURIComponent(paymentAmount)}&cu=INR&mc=0000`;

        const orderMap = Object.fromEntries(
            Object.entries(quantities)
                .filter(([id, qty]) => qty > 0)
                .map(([id, qty]) => {
                    const itemName = MENU_ITEMS.find(item => item.id === id)?.name || id;
                    return [itemName, qty]; // <-- key-value pair for object
                })
        );

        try {


            await sendTransactionToBackend(
                "Tijil",
                Number(paymentAmount),// payee
                "nescafe",          // vendor
                orderMap     // order object
                 // amount
            );
            console.log("Transaction sent to backend!",);
        } catch (err) {
            console.error("Transaction backend error:", err);
        }

        // Open deeplink here if you want
        // Linking.openURL(deeplink).catch(err => console.error('UPI app error:', err));

        closeModal();
        setShowSuccess(true);
    };


    const openPayment = () => {
        if (totalOrders === 0) return;
        setPaymentAmount(totalAmount.toFixed(2));
        setModalVisible(true);
        resetPosition();
    };

    if (showSuccess) {
        return (
            <PaymentSuccess
                amount={paymentAmount}
                payee="Campus Eats"
                onViewDetails={() => alert('View transaction details pressed')}
                onReturnHome={() => setShowSuccess(false)}
            />
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MenuItem
                        item={item}
                        quantity={quantities[item.id] || 0}
                        onAdd={() => addItem(item.id)}
                        onRemove={() => removeItem(item.id)}
                    />
                )}
                contentContainerStyle={styles.list}
            />
            {totalOrders > 0 && (
                <TouchableOpacity style={styles.totalOrdersBar} onPress={openPayment}>
                    <Text style={styles.totalOrdersText}>
                        Pay for {totalOrders} item{totalOrders > 1 ? 's' : ''} (₹{totalAmount.toFixed(2)})
                    </Text>
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} transparent animationType="none" onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { transform: [{ translateY: panY }] }]} {...panResponder.panHandlers}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Complete Payment</Text>
                        <Text style={styles.modalSubtitle}>You are about to pay</Text>
                        <Text style={styles.modalAmount}>₹{paymentAmount}</Text>
                        <Text style={styles.modalTo}>to Campus Canteen</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={openUpiApp}>
                            <Text style={styles.modalButtonText}>Open UPI App</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalNote}>You will be redirected to your UPI app to complete the payment.</Text>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const themeColors = {
    background: '#121212',
    primary: '#007bff',
    textPrimary: '#e0e0e0',
    buttonBackground: '#007bff',
    buttonText: '#ffffff',
    borderColor: '#333',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.background,
        padding: 16,
        paddingBottom: 80,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: themeColors.textPrimary,
        marginBottom: 16,
    },
    list: {
        paddingBottom: 24,
    },
    menuItem: {
        backgroundColor: '#1e1e1e',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: themeColors.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menuItemName: {
        fontSize: 18,
        color: themeColors.textPrimary,
    },
    menuItemPrice: {
        fontSize: 16,
        color: '#aaa',
        marginRight: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        backgroundColor: themeColors.buttonBackground,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    qtyButtonText: {
        color: themeColors.buttonText,
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        width: 24,
        textAlign: 'center',
        color: themeColors.textPrimary,
    },
    totalOrdersBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: themeColors.primary,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalOrdersText: {
        color: themeColors.buttonText,
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContent: {
        backgroundColor: '#2c2f36',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 350,
        padding: 20,
        alignItems: 'center',
    },
    modalHandle: {
        width: 60,
        height: 7,
        backgroundColor: '#51525a',
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom: 18,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        color: '#AAAEB8',
        fontSize: 16,
        marginBottom: 8,
    },
    modalAmount: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 2,
        marginTop: 5,
    },
    modalTo: {
        color: '#AAAEB8',
        fontSize: 18,
        marginBottom: 30,
        marginTop: 5,
    },
    modalButton: {
        backgroundColor: themeColors.primary,
        borderRadius: 10,
        width: '100%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    modalButtonText: {
        color: themeColors.buttonText,
        fontWeight: 'bold',
        fontSize: 20,
    },
    modalNote: {
        color: '#868686',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
    },
    successContainer: {
        flex: 1,
        backgroundColor: '#151b26',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    tickWrapper: {
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    successTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    successDesc: {
        color: '#bfc4ce',
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 38,
    },
    bold: {
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonGroup: {
        width: '100%',
        alignItems: 'center',
    },
    detailButton: {
        width: '100%',
        paddingVertical: 16,
        marginBottom: 10,
        borderRadius: 9,
        backgroundColor: '#2591fa',
        alignItems: 'center',
    },
    detailButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
    },
    homeButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 9,
        backgroundColor: '#243047',
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#c6cfe1',
        fontWeight: '700',
        fontSize: 18,
    },
});
