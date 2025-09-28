// import React, { useState, useRef, useEffect } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     Modal,
//     Animated,
//     PanResponder,
//     Dimensions,
// } from "react-native";
// import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import Sidebar from "./Sidebar"; // Sidebar component in separate file
// import { openUpiApp } from "./ShuttlePay"; // UPI payment function
//
// const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
// const sidebarWidth = screenWidth * 0.75;
//
// export default function Index() {
//     const [modalVisible, setModalVisible] = useState(false);
//     const [sidebarVisible, setSidebarVisible] = useState(false);
//     const panY = useRef(new Animated.Value(screenHeight)).current;
//     const sidebarTranslateX = useRef(new Animated.Value(-sidebarWidth)).current;
//
//     // Animate modal popup
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
//     const panResponder = useRef(
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => true,
//             onPanResponderMove: (evt, gestureState) => {
//                 if (gestureState.dy > 0) {
//                     panY.setValue(gestureState.dy);
//                 }
//             },
//             onPanResponderRelease: (evt, gestureState) => {
//                 if (gestureState.dy > 100) {
//                     closeModal();
//                 } else {
//                     resetPosition();
//                 }
//             },
//         })
//     ).current;
//
//     // Animate sidebar slide in/out
//     useEffect(() => {
//         if (sidebarVisible) {
//             Animated.timing(sidebarTranslateX, {
//                 toValue: 0,
//                 duration: 300,
//                 useNativeDriver: true,
//             }).start();
//         } else {
//             Animated.timing(sidebarTranslateX, {
//                 toValue: -sidebarWidth,
//                 duration: 300,
//                 useNativeDriver: true,
//             }).start();
//         }
//     }, [sidebarVisible]);
//
//     const openModal = () => {
//         setModalVisible(true);
//         resetPosition();
//     };
//
//     const closeSidebar = () => setSidebarVisible(false);
//
//     return (
//         <View style={styles.container}>
//             {/* Top Nav */}
//             <View style={styles.topNav}>
//                 <TouchableOpacity
//                     style={styles.navButton}
//                     onPress={() => setSidebarVisible(true)}
//                 >
//                     <MaterialCommunityIcons name="menu" size={30} color="#E0E0E0" />
//                 </TouchableOpacity>
//                 <Text style={styles.navTitle}>Campus Utility</Text>
//                 <TouchableOpacity style={styles.navButton}>
//                     <MaterialIcons name="person" size={30} color="#E0E0E0" />
//                 </TouchableOpacity>
//             </View>
//
//             <ScrollView contentContainerStyle={{ paddingTop: 22 }}>
//                 <Text style={styles.header}>Services</Text>
//                 <View style={styles.grid}>
//                     <TouchableOpacity onPress={openModal}>
//                         <ServiceCard
//                             icon={<MaterialCommunityIcons name="bus" size={48} color="#fff" />}
//                             label="Shuttle"
//                         />
//                     </TouchableOpacity>
//                     <ServiceCard icon={<MaterialCommunityIcons name="washing-machine" size={48} color="#fff" />} label="Paid Laundry" />
//                     <ServiceCard icon={<MaterialCommunityIcons name="storefront-outline" size={48} color="#fff" />} label="Shawarma Shop" />
//                     <ServiceCard icon={<MaterialCommunityIcons name="food" size={48} color="#fff" />} label="One Food World" />
//                     <ServiceCard icon={<MaterialCommunityIcons name="coffee" size={48} color="#fff" />} label="Nescafe" />
//                 </View>
//             </ScrollView>
//
//             {/* Sidebar Modal */}
//             <Modal
//                 visible={sidebarVisible}
//                 animationType="none"
//                 transparent
//                 onRequestClose={closeSidebar}
//             >
//                 <TouchableOpacity
//                     style={styles.sidebarBackdrop}
//                     activeOpacity={1}
//                     onPress={closeSidebar}
//                 />
//                 <Animated.View
//                     style={[
//                         styles.sidebarContainer,
//                         { width: sidebarWidth, transform: [{ translateX: sidebarTranslateX }] },
//                     ]}
//                 >
//                     <Sidebar onClose={closeSidebar} />
//                 </Animated.View>
//             </Modal>
//
//             {/* Payment Modal */}
//             <Modal
//                 visible={modalVisible}
//                 animationType="none"
//                 transparent
//                 onRequestClose={closeModal}
//             >
//                 <View style={styles.modalOverlay}>
//                     <Animated.View
//                         style={[styles.modalContent, { transform: [{ translateY: panY }] }]}
//                         {...panResponder.panHandlers}
//                     >
//                         <View style={styles.modalHandle} />
//                         <Text style={styles.modalTitle}>Complete Payment</Text>
//                         <Text style={styles.modalSubtitle}>You are about to pay</Text>
//                         <Text style={styles.modalAmount}>₹20.00</Text>
//                         <Text style={styles.modalTo}>to Campus Canteen</Text>
//                         <TouchableOpacity style={styles.modalButton} onPress={openUpiApp}>
//                             <Text style={styles.modalButtonText}>Open UPI App</Text>
//                         </TouchableOpacity>
//                         <Text style={styles.modalNote}>
//                             You will be redirected to your UPI app to complete the payment.
//                         </Text>
//                     </Animated.View>
//                 </View>
//             </Modal>
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
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#181818",
//     },
//     topNav: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingHorizontal: 16,
//         paddingTop: 40,
//         paddingBottom: 10,
//     },
//     navButton: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#222",
//     },
//     navTitle: {
//         flex: 1,
//         textAlign: "center",
//         fontSize: 26,
//         fontWeight: "bold",
//         color: "#E0E0E0",
//     },
//     header: {
//         fontSize: 36,
//         fontWeight: "bold",
//         color: "#D9DBDE",
//         marginLeft: 18,
//         marginBottom: 18,
//         letterSpacing: 0.5,
//     },
//     grid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "center",
//     },
//     card: {
//         width: 170,
//         height: 170,
//         backgroundColor: "#222",
//         margin: 12,
//         borderRadius: 22,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     cardIconWrap: {
//         backgroundColor: "#2591fa",
//         borderRadius: 64,
//         width: 90,
//         height: 90,
//         justifyContent: "center",
//         alignItems: "center",
//         marginBottom: 15,
//     },
//     cardLabel: {
//         color: "#f3f3f3",
//         fontWeight: "bold",
//         fontSize: 18,
//         textAlign: "center",
//         marginTop: 2,
//         letterSpacing: 0.2,
//     },
//     sidebarBackdrop: {
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.4)",
//     },
//     sidebarContainer: {
//         position: "absolute",
//         top: 0,
//         bottom: 0,
//         left: 0,
//         backgroundColor: "#222",
//     },
//     modalOverlay: {
//         flex: 1,
//         justifyContent: "flex-end",
//         backgroundColor: "rgba(0,0,0,0.6)",
//     },
//     modalContent: {
//         backgroundColor: "#2c2f36",
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         minHeight: 350,
//         padding: 20,
//         alignItems: "center",
//     },
//     modalHandle: {
//         width: 60,
//         height: 7,
//         backgroundColor: "#51525a",
//         borderRadius: 4,
//         alignSelf: "center",
//         marginBottom: 18,
//     },
//     modalTitle: {
//         color: "#fff",
//         fontSize: 26,
//         fontWeight: "bold",
//         marginBottom: 10,
//     },
//     modalSubtitle: {
//         color: "#AAAEB8",
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     modalAmount: {
//         color: "#fff",
//         fontSize: 48,
//         fontWeight: "bold",
//         marginBottom: 2,
//         marginTop: 5,
//     },
//     modalTo: {
//         color: "#AAAEB8",
//         fontSize: 18,
//         marginBottom: 30,
//         marginTop: 5,
//     },
//     modalButton: {
//         backgroundColor: "#2591fa",
//         borderRadius: 10,
//         width: "100%",
//         height: 55,
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: 24,
//     },
//     modalButtonText: {
//         color: "#fff",
//         fontWeight: "bold",
//         fontSize: 20,
//     },
//     modalNote: {
//         color: "#868686",
//         fontSize: 15,
//         textAlign: "center",
//         marginTop: 10,
//     },
// });
import React, { useState, useRef, useEffect } from "react";
import Profile from "@/app/(tabs)/profile";
import MenuPage from "@/app/(tabs)/Nescafe";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Animated,
    PanResponder,
    Dimensions,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Sidebar from "./Sidebar"; // Sidebar component
import { openUpiApp } from "./ShuttlePay"; // UPI payment function

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const sidebarWidth = screenWidth * 0.75;

export default function Index() {
    const [modalVisible, setModalVisible] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedPage, setSelectedPage] = useState("Home"); // page state
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const sidebarTranslateX = useRef(new Animated.Value(-sidebarWidth)).current;

    // Animate modal popup
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

    const panResponder = useRef(
        PanResponder.create({
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
        })
    ).current;

    // Animate sidebar slide in/out
    useEffect(() => {
        if (sidebarVisible) {
            Animated.timing(sidebarTranslateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(sidebarTranslateX, {
                toValue: -sidebarWidth,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [sidebarVisible]);

    const openModal = () => {
        setModalVisible(true);
        resetPosition();
    };

    const closeSidebar = () => setSidebarVisible(false);

    // Navigation handler passed to Sidebar
    const handleNavigate = (page: string) => {
        setSelectedPage(page);
        setSidebarVisible(false);
    };

    return (
        <View style={styles.container}>
            {/* Top Nav */}
            <View style={styles.topNav}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setSidebarVisible(true)}
                >
                    <MaterialCommunityIcons name="menu" size={30} color="#E0E0E0" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Campus Utility</Text>
                <TouchableOpacity style={styles.navButton}>
                    <MaterialIcons name="person" size={30} color="#E0E0E0" />
                </TouchableOpacity>
            </View>

            {/* Render content based on selected page */}
            {selectedPage === "Home" && (
                <ScrollView contentContainerStyle={{ paddingTop: 22 }}>
                    <Text style={styles.header}>Services</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity onPress={openModal}>
                            <ServiceCard
                                icon={<MaterialCommunityIcons name="bus" size={48} color="#fff" />}
                                label="Shuttle"
                            />
                        </TouchableOpacity>
                        <ServiceCard icon={<MaterialCommunityIcons name="washing-machine" size={48} color="#fff" />} label="Paid Laundry" />
                        <ServiceCard icon={<MaterialCommunityIcons name="storefront-outline" size={48} color="#fff" />} label="Shawarma Shop" />
                        <ServiceCard icon={<MaterialCommunityIcons name="food" size={48} color="#fff" />} label="One Food World" />
                        <TouchableOpacity onPress={() => setSelectedPage('Menu')}>
                            <ServiceCard
                                icon={<MaterialCommunityIcons name="coffee" size={48} color="#fff" />}
                                label="Nescafe"
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}

            {selectedPage === "Profile" && <Profile />}

            {selectedPage === "Settings" && (
                <View style={pageStyles.pageContainer}>
                    <Text style={pageStyles.pageTitle}>Settings Page</Text>
                </View>
            )}

            {selectedPage === "Menu" && <MenuPage />}

            {selectedPage === "Logout" && (
                <View style={pageStyles.pageContainer}>
                    <Text style={pageStyles.pageTitle}>Logout Page</Text>
                </View>
            )}

            {/* Sidebar Modal */}
            <Modal
                visible={sidebarVisible}
                animationType="none"
                transparent
                onRequestClose={closeSidebar}
            >
                <TouchableOpacity
                    style={styles.sidebarBackdrop}
                    activeOpacity={1}
                    onPress={closeSidebar}
                />
                <Animated.View
                    style={[
                        styles.sidebarContainer,
                        { width: sidebarWidth, transform: [{ translateX: sidebarTranslateX }] },
                    ]}
                >
                    <Sidebar onClose={closeSidebar} onNavigate={handleNavigate} />
                </Animated.View>
            </Modal>

            {/* Payment Modal */}
            <Modal
                visible={modalVisible}
                animationType="none"
                transparent
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <Animated.View
                        style={[styles.modalContent, { transform: [{ translateY: panY }] }]}
                        {...panResponder.panHandlers}
                    >
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Complete Payment</Text>
                        <Text style={styles.modalSubtitle}>You are about to pay</Text>
                        <Text style={styles.modalAmount}>₹20.00</Text>
                        <Text style={styles.modalTo}>to Campus Canteen</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={openUpiApp}>
                            <Text style={styles.modalButtonText}>Open UPI App</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalNote}>
                            You will be redirected to your UPI app to complete the payment.
                        </Text>
                    </Animated.View>
                </View>
            </Modal>
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
    sidebarBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    sidebarContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#222",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    modalContent: {
        backgroundColor: "#2c2f36",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 350,
        padding: 20,
        alignItems: "center",
    },
    modalHandle: {
        width: 60,
        height: 7,
        backgroundColor: "#51525a",
        borderRadius: 4,
        alignSelf: "center",
        marginBottom: 18,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalSubtitle: {
        color: "#AAAEB8",
        fontSize: 16,
        marginBottom: 8,
    },
    modalAmount: {
        color: "#fff",
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 2,
        marginTop: 5,
    },
    modalTo: {
        color: "#AAAEB8",
        fontSize: 18,
        marginBottom: 30,
        marginTop: 5,
    },
    modalButton: {
        backgroundColor: "#2591fa",
        borderRadius: 10,
        width: "100%",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    modalButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
    },
    modalNote: {
        color: "#868686",
        fontSize: 15,
        textAlign: "center",
        marginTop: 10,
    },
});

const pageStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181818",
    },
    pageTitle: {
        fontSize: 32,
        color: "#E0E0E0",
        fontWeight: "bold",
    },
});
