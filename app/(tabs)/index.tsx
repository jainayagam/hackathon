//
// import {AuthProvider} from "../AuthContext";
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
//
//
//
// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
//
// export default function Index() {
//     return (
//         <View style={styles.container}>
//             {/* Top Nav */}
//             <View style={styles.topNav}>
//                 <TouchableOpacity style={styles.navButton}>
//                     <MaterialCommunityIcons name="menu" size={28} color="#E0E0E0" />
//                 </TouchableOpacity>
//                 <Text style={styles.navTitle}>Campus Utility</Text>
//                 <TouchableOpacity style={styles.navButton}>
//                     <MaterialIcons name="person" size={28} color="#E0E0E0" />
//                 </TouchableOpacity>
//             </View>
//
//             <ScrollView contentContainerStyle={{paddingTop: 14}}>
//                 <Text style={styles.header}>Services</Text>
//                 <View style={styles.grid}>
//                     <ServiceCard icon={<MaterialCommunityIcons name="bus" size={48} color="#fff" />} label="Shuttle" />
//                     <ServiceCard icon={<MaterialCommunityIcons name="washing-machine" size={48} color="#fff" />} label="Paid Laundry" />
//                     <ServiceCard icon={<MaterialCommunityIcons name="storefront-outline" size={48} color="#fff" />} label="Shawarma Shop" />
//                     <ServiceCard icon={<MaterialCommunityIcons name="food" size={48} color="#fff" />} label="One Food World" />
//                     <ServiceCard icon={<MaterialCommunityIcons name="coffee" size={48} color="#fff" />} label="Nescafe" />
//                 </View>
//             </ScrollView>
//
//             {/* Bottom Tab Bar */}
//             <View style={styles.tabBar}>
//                 <TabItem icon={<MaterialIcons name="home" size={28} />} label="Home" active />
//                 <TabItem icon={<MaterialIcons name="person-outline" size={28} />} label="Profile" />
//                 <TabItem icon={<MaterialIcons name="trending-up" size={28} />} label="Trends" />
//                 <TabItem icon={<MaterialIcons name="settings" size={28} />} label="Settings" />
//             </View>
//         </View>
//     );
// }
//
// function ServiceCard({ icon, label }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.cardIconWrap}>{icon}</View>
//             <Text style={styles.cardLabel}>{label}</Text>
//         </View>
//     );
// }
//
// function TabItem({ icon, label, active }) {
//     return (
//         <View style={styles.tabItem}>
//             {React.cloneElement(icon, { color: active ? "#2591fa" : "#A0A0A0" })}
//             <Text style={[styles.tabLabel, active && { color: "#2591fa", fontWeight: "bold" }]}>{label}</Text>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#181818",
//     },
//     topNav: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingHorizontal: 18,
//         paddingTop: 36,
//         paddingBottom: 10,
//     },
//     navButton: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#232323",
//     },
//     navTitle: {
//         flex: 1,
//         textAlign: "center",
//         fontSize: 26,
//         fontWeight: "bold",
//         color: "#EFEFEF",
//         letterSpacing: 0.5,
//     },
//     header: {
//         fontSize: 36,
//         fontWeight: "bold",
//         color: "#E0E0E0",
//         marginLeft: 16,
//         marginBottom: 20,
//     },
//     grid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "center",
//     },
//     card: {
//         width: 150,
//         height: 168,
//         backgroundColor: "#222",
//         margin: 12,
//         borderRadius: 22,
//         alignItems: "center",
//         justifyContent: "center",
//         shadowColor: "#000",
//         shadowOpacity: 0.06,
//         shadowRadius: 4,
//     },
//     cardIconWrap: {
//         backgroundColor: "#2591fa",
//         borderRadius: 64,
//         width: 88,
//         height: 88,
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 10,
//     },
//     cardLabel: {
//         color: "#dedede",
//         fontWeight: "bold",
//         fontSize: 19,
//         textAlign: "center",
//         marginTop: 2,
//     },
//     tabBar: {
//         height: 65,
//         flexDirection: "row",
//         backgroundColor: "#1E1E1E",
//         borderTopWidth: 1,
//         borderColor: "#232323",
//         alignItems: "center",
//         justifyContent: "space-around",
//     },
//     tabItem: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     tabLabel: {
//         fontSize: 14,
//         color: "#A0A0A0",
//         marginTop: 2,
//     }
// });





// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
//
// import Profile from './profile';   // Import your Profile component
// // import Trends from './Trends';     // Import your Trends component
// // import Settings from './Settings'; // Import your Settings component
//
// export default function Index() {
//     const [activeTab, setActiveTab] = useState("Home");
//
//     const renderActiveScreen = () => {
//         switch (activeTab) {
//             case "Home":
//                 return <Home />;
//             case "Profile":
//                 return <Profile />;
//             case "Trends":
//                 return <Trends />;
//             case "Settings":
//                 return <Settings />;
//             default:
//                 return <Home />;
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             {/* Top Nav */}
//             <View style={styles.topNav}>
//                 <TouchableOpacity style={styles.navButton}>
//                     <MaterialCommunityIcons name="menu" size={28} color="#E0E0E0" />
//                 </TouchableOpacity>
//                 <Text style={styles.navTitle}>Campus Utility</Text>
//                 <TouchableOpacity style={styles.navButton}>
//                     <MaterialIcons name="person" size={28} color="#E0E0E0" />
//                 </TouchableOpacity>
//             </View>
//
//             <ScrollView contentContainerStyle={{ paddingTop: 14 }}>
//                 {activeTab === "Home" && (
//                     <>
//                         <Text style={styles.header}>Services</Text>
//                         <View style={styles.grid}>
//                             <ServiceCard icon={<MaterialCommunityIcons name="bus" size={48} color="#fff" />} label="Shuttle" />
//                             <ServiceCard icon={<MaterialCommunityIcons name="washing-machine" size={48} color="#fff" />} label="Paid Laundry" />
//                             <ServiceCard icon={<MaterialCommunityIcons name="storefront-outline" size={48} color="#fff" />} label="Shawarma Shop" />
//                             <ServiceCard icon={<MaterialCommunityIcons name="food" size={48} color="#fff" />} label="One Food World" />
//                             <ServiceCard icon={<MaterialCommunityIcons name="coffee" size={48} color="#fff" />} label="Nescafe" />
//                         </View>
//                     </>
//                 )}
//                 {activeTab === "Profile" && <Profile />}
//                 {activeTab === "Trends" && <Trends />}
//                 {activeTab === "Settings" && <Settings />}
//             </ScrollView>
//
//             {/* Bottom Tab Bar */}
//             <View style={styles.tabBar}>
//                 <TabItem isActive={activeTab === "Home"} icon={<MaterialIcons name="home" size={28} />} label="Home" onPress={() => setActiveTab("Home")} />
//                 <TabItem isActive={activeTab === "Profile"} icon={<MaterialIcons name="person-outline" size={28} />} label="Profile" onPress={() => setActiveTab("Profile")} />
//                 <TabItem isActive={activeTab === "Trends"} icon={<MaterialIcons name="trending-up" size={28} />} label="Trends" onPress={() => setActiveTab("Trends")} />
//                 <TabItem isActive={activeTab === "Settings"} icon={<MaterialIcons name="settings" size={28} />} label="Settings" onPress={() => setActiveTab("Settings")} />
//             </View>
//         </View>
//     );
// }
//
// function ServiceCard({ icon, label }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.cardIconWrap}>{icon}</View>
//             <Text style={styles.cardLabel}>{label}</Text>
//         </View>
//     );
// }
//
// function TabItem({ icon, label, isActive, onPress }) {
//     return (
//         <TouchableOpacity style={styles.tabItem} onPress={onPress}>
//             {React.cloneElement(icon, { color: isActive ? "#2591fa" : "#A0A0A0" })}
//             <Text style={[styles.tabLabel, isActive && { color: "#2591fa", fontWeight: "bold" }]}>{label}</Text>
//         </TouchableOpacity>
//     );
// }
//
// const styles = StyleSheet.create({
//     // same as your existing styles
// });


import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function Index() {

    return (
        <View style={styles.container}>
            {/* Top Nav */}
            <View style={styles.topNav}>
                <TouchableOpacity style={styles.navButton}>
                    <MaterialCommunityIcons name="menu" size={30} color="#E0E0E0" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Campus Utility</Text>
                <TouchableOpacity style={styles.navButton}>
                    <MaterialIcons name="person" size={30} color="#E0E0E0" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingTop: 22 }}>
                <Text style={styles.header}>Services</Text>
                <View style={styles.grid}>
                    <ServiceCard icon={<MaterialCommunityIcons name="bus" size={48} color="#fff" />} label="Shuttle" />
                    <ServiceCard icon={<MaterialCommunityIcons name="washing-machine" size={48} color="#fff" />} label="Paid Laundry" />
                    <ServiceCard icon={<MaterialCommunityIcons name="storefront-outline" size={48} color="#fff" />} label="Shawarma Shop" />
                    <ServiceCard icon={<MaterialCommunityIcons name="food" size={48} color="#fff" />} label="One Food World" />
                    <ServiceCard icon={<MaterialCommunityIcons name="coffee" size={48} color="#fff" />} label="Nescafe" />
                </View>
            </ScrollView>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
    },
    topNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 10,
    },
    navButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222",
    },
    navTitle: {
        flex: 1,
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
        color: "#E0E0E0",
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#D9DBDE",
        marginLeft: 18,
        marginBottom: 18,
        letterSpacing: 0.5,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    card: {
        width: 170,
        height: 170,
        backgroundColor: "#222",
        margin: 12,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },
    cardIconWrap: {
        backgroundColor: "#2591fa",
        borderRadius: 64,
        width: 90,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    cardLabel: {
        color: "#f3f3f3",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
        marginTop: 2,
        letterSpacing: 0.2,
    },
});
