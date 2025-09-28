import { Alert, Linking } from "react-native";

export async function openUpiApp() {
    const payeeVPA = "blinkit.payu@hdfcbank";
    const payeeName = "RHEMA TRANSPORT";
    const amount = "1";
    const currency = "INR";
    const transactionNote = "test payment";
    const transactionRef = "TXN" + Date.now();

    const upiUrl = `upi://pay?pa=${encodeURIComponent(payeeVPA)}&pn=${encodeURIComponent(
        payeeName
    )}&tr=${encodeURIComponent(transactionRef)}&tn=${encodeURIComponent(
        transactionNote
    )}&am=${encodeURIComponent(amount)}&cu=${encodeURIComponent(currency)}&mc=0000`;

    // const gpayUrl = upiUrl + "&mc=0000"; // add merchant code param
    // Linking.openURL(`intent://${gpayUrl}#Intent;package=com.google.android.apps.nbu.paisa.user;end`);

    Linking.openURL(upiUrl);
    try {
        const supported = await Linking.canOpenURL(upiUrl);
        if (!supported) {
            Alert.alert(
                "No UPI App Found",
                "Please install Google Pay or any UPI app to continue."
            );
            return;
        }
        await Linking.openURL(upiUrl);
    } catch (err) {
        Alert.alert("Error", "Something went wrong: " + err);
    }
}
