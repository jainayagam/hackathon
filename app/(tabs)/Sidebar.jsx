// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import {Link } from "react-dom";
// interface SidebarProps {
//     onClose: () => void;
// }
//
// export default function Sidebar({ onClose }: SidebarProps) {
//     return (
//         <View style={styles.sidebar}>
//             <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//                 <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//             <View style={styles.menuItems}>
//                 <Text style={styles.menuItem}>Home</Text>
//                 <Text style={styles.menuItem}><Link href={"./profile.tsx"}>Profile</Link></Text>
//                 <Text style={styles.menuItem}>Settings</Text>
//                 <Text style={styles.menuItem}>Logout</Text>
//             </View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     sidebar: {
//         flex: 1,
//         backgroundColor: "#222",
//         paddingTop: 40,
//         paddingHorizontal: 20,
//     },
//     closeButton: {
//         marginBottom: 30,
//     },
//     closeText: {
//         fontSize: 20,
//         color: "#f3f3f3",
//     },
//     menuItems: {
//         marginTop: 20,
//     },
//     menuItem: {
//         color: "#eee",
//         fontSize: 18,
//         marginVertical: 12,
//     },
// });
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SidebarProps {
    onClose: () => void;
    onNavigate: (page: string) => void; // navigation callback
}

export default function Sidebar({ onClose, onNavigate }: SidebarProps) {
    const handleItemPress = (page: string) => {
        onNavigate(page);
        onClose();
    };

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.menuItems}>
                <TouchableOpacity onPress={() => handleItemPress("Home")}>
                    <Text style={styles.menuItem}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleItemPress("Profile")}>
                    <Text style={styles.menuItem}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleItemPress("Settings")}>
                    <Text style={styles.menuItem}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleItemPress("Logout")}>
                    <Text style={styles.menuItem}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        flex: 1,
        backgroundColor: "#222",
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    closeButton: {
        marginBottom: 30,
    },
    closeText: {
        fontSize: 20,
        color: "#f3f3f3",
    },
    menuItems: {
        marginTop: 20,
    },
    menuItem: {
        color: "#eee",
        fontSize: 18,
        marginVertical: 12,
    },
});
