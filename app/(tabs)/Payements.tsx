
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert, Linking, TextInput } from "react-native";

export default function UpiPaymentScreen() {
    // UPI details as variables
    const [payeeVPA, setPayeeVPA] = useState("example@okaxis"); // pa
    const [payeeName, setPayeeName] = useState("ChaiTheGreat"); // pn
    const [transactionNote, setTransactionNote] = useState("Test Payment"); // tn
    const [amount, setAmount] = useState("20.00"); // am
    const currency = "INR"; // cu

    // Construct UPI URL dynamically
    const getUpiUrl = () =>
        `upi://pay?pa=${encodeURIComponent(payeeVPA)}&pn=${encodeURIComponent(
            payeeName
        )}&tn=${encodeURIComponent(transactionNote)}&am=${encodeURIComponent(
            amount
        )}&cu=${encodeURIComponent(currency)}`;

    const payWithGPay = async () => {
        const url = getUpiUrl();
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(
                    "No UPI App Found",
                    "Please install Google Pay or any UPI app to continue."
                );
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong: " + error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pay via UPI</Text>

            <TextInput
                style={styles.input}
                placeholder="Payee VPA (example@okaxis)"
                value={payeeVPA}
                onChangeText={setPayeeVPA}
            />
            <TextInput
                style={styles.input}
                placeholder="Payee Name"
                value={payeeName}
                onChangeText={setPayeeName}
            />
            <TextInput
                style={styles.input}
                placeholder="Transaction Note"
                value={transactionNote}
                onChangeText={setTransactionNote}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount (e.g., 20.00)"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <Button title={`Pay ₹${amount} via GPay`} onPress={payWithGPay} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
});


