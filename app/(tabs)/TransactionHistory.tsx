
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
