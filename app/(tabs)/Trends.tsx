import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

export default function ProfileScreen() {
    const avatarUrl = "https://api.dicebear.com/8.x/adventurer/svg?seed=person";

    return (
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity style={styles.backArrow}>
                <Feather name="arrow-left" size={28} color="#fafafa" />
            </TouchableOpacity>
            <Text style={styles.header}>Profile</Text>

            {/* Avatar */}
            <View style={styles.avatarCircle}>
                <Image source={{ uri: avatarUrl }} style={styles.avatarImg} />
            </View>

            {/* Name and Email */}
            <Text style={styles.name}>Ethan Carter</Text>
            <Text style={styles.email}>ethan.carter@university.edu</Text>

            {/* Profile Card */}
            <View style={styles.card}>
                <TouchableOpacity style={styles.row}>
                    <MaterialIcons name="person-outline" size={22} color="#cfd3df" />
                    <Text style={styles.cardActionText}>Edit Profile</Text>
                    <Feather name="chevron-right" size={24} color="#adb3c9" style={styles.rowRightIcon} />
                </TouchableOpacity>
                <View style={styles.divider} />

                {/* Transaction History touchable without dropdown */}
                <TouchableOpacity style={styles.row}>
                    <MaterialIcons name="history" size={22} color="#cfd3df" />
                    <Text style={styles.cardActionText}>Transaction History</Text>
                    <Feather name="chevron-right" size={24} color="#adb3c9" style={styles.rowRightIcon} />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={[styles.row, { marginTop: 6 }]}>
                    <AntDesign name="logout" size={22} color="#f0857a" />
                    <Text style={styles.logoutText}>Log Out</Text>
                    <Feather name="chevron-right" size={24} color="#f0857a" style={styles.rowRightIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#191e2d",
        alignItems: "center",
        paddingTop: 36,
        minHeight: "100%",
    },
    backArrow: {
        position: "absolute",
        left: 16,
        top: 44,
        zIndex: 10,
    },
    header: {
        marginTop: 14,
        fontSize: 28,
        fontWeight: "bold",
        color: "#fafafa",
        marginBottom: 25,
        textAlign: "center",
    },
    avatarCircle: {
        width: 116,
        height: 116,
        borderRadius: 64,
        backgroundColor: "#23283a",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },
    avatarImg: {
        width: 106,
        height: 106,
        borderRadius: 53,
        resizeMode: "cover",
    },
    name: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    email: {
        fontSize: 16,
        color: "#a6aec2",
        textAlign: "center",
        marginBottom: 28,
    },
    card: {
        width: "93%",
        backgroundColor: "#23283a",
        borderRadius: 16,
        padding: 16,
        marginTop: 2,
        marginBottom: 20,
        shadowColor: "#11131b",
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 7 },
        shadowOpacity: 0.08,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        paddingHorizontal: 3,
    },
    rowRightIcon: {
        marginLeft: "auto",
    },
    cardActionText: {
        marginLeft: 14,
        fontSize: 17,
        color: "#e8eaf4",
        fontWeight: "500",
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#2f3550",
        marginVertical: 10,
        opacity: 0.65,
    },
    logoutText: {
        marginLeft: 14,
        color: "#f0857a",
        fontWeight: "bold",
        fontSize: 17,
    },
});
