import {AuthProvider} from "../AuthContext";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Index() {
    return (
        <View style={styles.container}>
            {/* Top Nav */}
            <View style={styles.topNav}>
                <TouchableOpacity style={styles.navButton}>
                    <MaterialCommunityIcons name="menu" size={28} color="#E0E0E0" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Campus Utility</Text>
                <TouchableOpacity style={styles.navButton}>
                    <MaterialIcons name="person" size={28} color="#E0E0E0" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{paddingTop: 14}}>
                <Text style={styles.header}>Services</Text>
                <View style={styles.grid}>
                    <ServiceCard icon={<MaterialCommunityIcons name="bus" size={48} color="#fff" />} label="Shuttle" />
                    <ServiceCard icon={<MaterialCommunityIcons name="washing-machine" size={48} color="#fff" />} label="Paid Laundry" />
                    <ServiceCard icon={<MaterialCommunityIcons name="storefront-outline" size={48} color="#fff" />} label="Shawarma Shop" />
                    <ServiceCard icon={<MaterialCommunityIcons name="food" size={48} color="#fff" />} label="One Food World" />
                    <ServiceCard icon={<MaterialCommunityIcons name="coffee" size={48} color="#fff" />} label="Nescafe" />
                </View>
            </ScrollView>

            {/* Bottom Tab Bar */}
            <View style={styles.tabBar}>
                <TabItem icon={<MaterialIcons name="home" size={28} />} label="Home" active />
                <TabItem icon={<MaterialIcons name="person-outline" size={28} />} label="Profile" />
                <TabItem icon={<MaterialIcons name="trending-up" size={28} />} label="Trends" />
                <TabItem icon={<MaterialIcons name="settings" size={28} />} label="Settings" />
            </View>
        </View>
    );
}

function ServiceCard({ icon, label }) {
    return (
        <View style={styles.card}>
            <View style={styles.cardIconWrap}>{icon}</View>
            <Text style={styles.cardLabel}>{label}</Text>
        </View>
    );
}

function TabItem({ icon, label, active }) {
    return (
        <View style={styles.tabItem}>
            {React.cloneElement(icon, { color: active ? "#2591fa" : "#A0A0A0" })}
            <Text style={[styles.tabLabel, active && { color: "#2591fa", fontWeight: "bold" }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
    },
    topNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingTop: 36,
        paddingBottom: 10,
    },
    navButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#232323",
    },
    navTitle: {
        flex: 1,
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
        color: "#EFEFEF",
        letterSpacing: 0.5,
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#E0E0E0",
        marginLeft: 16,
        marginBottom: 20,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    card: {
        width: 150,
        height: 168,
        backgroundColor: "#222",
        margin: 12,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    cardIconWrap: {
        backgroundColor: "#2591fa",
        borderRadius: 64,
        width: 88,
        height: 88,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    cardLabel: {
        color: "#dedede",
        fontWeight: "bold",
        fontSize: 19,
        textAlign: "center",
        marginTop: 2,
    },
    tabBar: {
        height: 65,
        flexDirection: "row",
        backgroundColor: "#1E1E1E",
        borderTopWidth: 1,
        borderColor: "#232323",
        alignItems: "center",
        justifyContent: "space-around",
    },
    tabItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tabLabel: {
        fontSize: 14,
        color: "#A0A0A0",
        marginTop: 2,
    }
});