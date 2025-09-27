// import { View, TextInput, StyleSheet, Button, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
// import React, { useState } from 'react';
// import { useAuth } from './AuthContext';
// import { useRouter, Link } from 'expo-router';
// import { Register } from './Register';
//
//
//
// export default function Login() {
//     const router = useRouter();
//     const { onLogin } = useAuth();
//
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//
//     const login = async () => {
//         if (!email.trim() || !password.trim()) {
//             Alert.alert('Error', 'Username and password are required.');
//             return;
//         }
//
//         setLoading(true);
//         try {
//             await onLogin!(email, password); // email empty, confirm password same as password
//
//         } catch (err) {
//             Alert.alert('Error', 'Something went wrong during registration.');
//         }
//         setLoading(false);
//     };
//
//     return (
//         <View style={styles.topContainer}>
//             <View style={styles.container}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Username"
//                     value={email}
//                     onChangeText={setEmail}
//                     autoCapitalize="none"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry
//                 />
//
//                 <Link href="/Register" style={{ color: 'blue', textDecorationLine: 'underline' }}>
//                     Don't have an account? Register here
//                 </Link>
//
//                 {loading ? (
//                     <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />
//                 ) : (
//                     <Button title="Login" onPress={login} />
//                 )}
//             </View>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     topContainer: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     container: {
//         alignItems: 'center',
//         width: '100%',
//         paddingHorizontal: 20,
//     },
//     input: {
//         height: 44,
//         borderWidth: 1,
//         borderColor: 'gray',
//         padding: 10,
//         borderRadius: 5,
//         width: '100%',
//         marginBottom: 12,
//     },
//     linkText: {
//         color: '#137fec',
//         marginBottom: 12,
//         textDecorationLine: 'underline',
//     },
// });

import { View, TextInput, StyleSheet, Button, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter, Link } from 'expo-router';
import Register from "./Register";

export default function Login() {
    const router = useRouter();
    const { onLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Username and password are required.');
            return;
        }

        setLoading(true);
        try {
            await onLogin!(email, password);
        } catch (err) {
            Alert.alert('Error', 'Something went wrong during registration.');
        }
        setLoading(false);
    };

    return (
        <View style={styles.topContainer}>
            <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>!</Text>
                </View>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Log in to your Campus Utility account.</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#aaa"
                />

                <TouchableOpacity style={styles.forgotContainer}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {loading ? (
                    <ActivityIndicator size="large" color="#137fec" style={{ marginVertical: 20 }} />
                ) : (
                    <TouchableOpacity style={styles.loginButton} onPress={login}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account? </Text>
                    <Link href="./Register.tsx" style={styles.signupLink}>Sign Up</Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: "#222734",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 6,
        borderColor: "#2580E3",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    iconText: {
        color: "#2580E3",
        fontSize: 40,
        fontWeight: "bold",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#F4F6FC",
        textAlign: "center",
    },
    subtitle: {
        color: "#9EA7C1",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 32
    },
    formContainer: {
        width: "100%",
        alignItems: 'center',
    },
    input: {
        width: "100%",
        height: 48,
        borderRadius: 12,
        backgroundColor: "#262C3B",
        color: "#F4F6FC",
        marginBottom: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#2D3447",
    },
    forgotContainer: {
        width: "100%",
        alignItems: 'flex-end',
    },
    forgotText: {
        color: "#2580E3",
        fontSize: 15,
        marginBottom: 24,
    },
    loginButton: {
        width: "100%",
        height: 52,
        backgroundColor: "#2580E3",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    loginButtonText: {
        color: "#F4F6FC",
        fontSize: 20,
        fontWeight: "bold"
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: "#9EA7C1",
        fontSize: 16,
    },
    signupLink: {
        color: "#2580E3",
        fontSize: 16,
        textDecorationLine: 'underline',
        fontWeight: "bold",
    }
});
