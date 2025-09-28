// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import axios from 'axios';
// import { useAuth } from '../AuthContext'; // Adjust this import to your AuthContext file
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// // Enable LayoutAnimation on Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }
//
// const API_URL = 'https://signupbackend-wrdy.onrender.com';
//
// const TransactionCard = ({ item, expanded, onToggle }) => (
//     <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
//         <View style={styles.card}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <MaterialCommunityIcons
//                     name={item.icon || 'receipt'}
//                     size={26}
//                     color="#3796FF"
//                     style={{ marginRight: 12 }}
//                 />
//                 <View>
//                     <Text style={styles.name}>{item.payee || item.vendor || item.name || 'Unknown'}</Text>
//                     <Text style={styles.date}>{new Date(item.date || item.createdAt || Date.now()).toDateString()}</Text>
//                 </View>
//             </View>
//             <Text style={styles.amount}>-₹{parseFloat(item.amount).toFixed(2)}</Text>
//             {expanded && (
//                 <View style={styles.expandedSection}>
//                     <Text style={styles.expandedText}>Transaction ID: {item._id || item.transactionId || 'N/A'}</Text>
//                     <Text style={styles.expandedText}>Order Details:</Text>
//                     {item.order
//                         ? Object.entries(item.order).map(([key, value]) => (
//                             <Text key={key} style={styles.orderText}>
//                                 {key}: {value}
//                             </Text>
//                         ))
//                         : <Text style={styles.orderText}>No order details</Text>}
//                 </View>
//             )}
//         </View>
//     </TouchableOpacity>
// );
//
// export default function TransactionHistory() {
//     const { authState } = useAuth();
//     const [transactions, setTransactions] = useState([]);
//     const [expandedIds, setExpandedIds] = useState([]);
//     const [vendor, setVendor] = useState("");
//     const [order, setOrder] = useState("");
//     const [amount, setAmount] = useState("");
//
//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 // Get the userID from AsyncStorage or from Login response storage
//                 const userID = await AsyncStorage.getItem("userID");
//                 const jwt_token = await AsyncStorage.getItem("jwt_token");
//
//                 if (!userID) {
//                     console.warn('User ID not found; unable to fetch transactions');
//                     return;
//                 }
//
//                 // Send userID to backend as query param or headers as per your backend API contract
//                 const params = {
//                     userID,    // or rename if backend expects different param name
//                     orders: true,
//                 };
//
//                 const response = await axios.get(`${API_URL}/api/callback/history/${userID}`, {
//                     headers: { Authorization: jwt_token  },
//                 });
//                 console.log(response.data);
//
//
//                 setTransactions(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch transactions:', error.response?.data || error.message);
//             }
//         };
//
//         fetchTransactions();
//     }, [authState]); // refetch if auth state changes
//
//     const toggleExpand = (id) => {
//         LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//         setExpandedIds((prev) => {
//                 return prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id];
//             }
//         );
//     };
//
//     const renderItem = ({ item }) => (
//         <TransactionCard
//             item={item}
//             expanded={expandedIds.includes(item._id || item.transactionId)}
//             onToggle={() => toggleExpand(item._id || item.transactionId)}
//         />
//     );
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Transaction History</Text>
//             <View style={styles.filters}>
//                 <View style={styles.filterButton}><Text style={styles.filterText}>Date ▼</Text></View>
//                 <View style={styles.filterButton}><Text style={styles.filterText}>Category ▼</Text></View>
//             </View>
//             <FlatList
//                 data={transactions}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item._id || item.transactionId || Math.random().toString()}
//                 contentContainerStyle={{ paddingBottom: 24 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <Text></Text>
//             </FlatList>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212',
//         paddingHorizontal: 13,
//         paddingTop: 34,
//     },
//     header: {
//         fontSize: 23,
//         fontWeight: 'bold',
//         color: '#ececec',
//         textAlign: 'center',
//         marginBottom: 17,
//     },
//     filters: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 13,
//     },
//     filterButton: {
//         backgroundColor: '#18181C',
//         borderRadius: 16,
//         paddingHorizontal: 36,
//         paddingVertical: 12,
//         marginHorizontal: 7,
//     },
//     filterText: {
//         color: '#9095a7',
//         fontSize: 16,
//     },
//     card: {
//         backgroundColor: '#19191C',
//         borderRadius: 14,
//         padding: 17,
//         marginBottom: 11,
//         borderWidth: 1,
//         borderColor: '#24242c',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     name: {
//         color: '#e0e0e0',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     date: {
//         color: '#99a0b8',
//         fontSize: 14,
//     },
//     amount: {
//         color: '#fd4141',
//         fontWeight: 'bold',
//         fontSize: 18,
//     },
//     expandedSection: {
//         marginTop: 12,
//         marginLeft: 38,
//     },
//     expandedText: {
//         color: '#cfcfd4',
//         fontSize: 14,
//         marginBottom: 4,
//     },
//     orderText: {
//         color: '#9a9aa0',
//         fontSize: 13,
//         marginLeft: 12,
//     },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const API_URL = 'https://signupbackend-wrdy.onrender.com';

const TransactionCard = ({ item }) => (
    <View style={styles.card}>
        <Text style={styles.vendorName}>{item.vendorName}</Text>
        <Text style={styles.amount}>₹{item.amount.toFixed(2)}</Text>
    </View>
);

export default function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const userID = await AsyncStorage.getItem("userID");
                const jwt_token = await AsyncStorage.getItem("jwt_token");
                if (!userID || !jwt_token) {
                    console.warn('Missing userID or token, cannot fetch transactions.');
                    return;
                }

                const response = await axios.get(`${API_URL}/api/callback/history/${userID}`, {
                    headers: { Authorization: `Bearer ${jwt_token}` },
                });
                console.log(response.data);
                setTransactions(response.data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error.response?.data || error.message);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Transaction History</Text>
            <FlatList
                data={transactions}
                renderItem={({ item }) => <TransactionCard item={item} />}
                keyExtractor={item => item.transactionId}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 13,
        paddingTop: 34,
    },
    header: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#ececec',
        textAlign: 'center',
        marginBottom: 17,
    },
    card: {
        backgroundColor: '#19191C',
        padding: 17,
        borderRadius: 14,
        marginBottom: 11,
        borderColor: '#24242c',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vendorName: {
        color: '#e0e0e0',
        fontSize: 18,
        fontWeight: '600',
    },
    amount: {
        color: '#fd4141',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
