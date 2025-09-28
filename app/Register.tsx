import { View, TextInput, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_URL, useAuth } from './AuthContext';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Register() {
    const router = useRouter();
    const { onRegister } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Test API call once on mount (optional)
    useEffect(() => {
        const testCall = async () => {
            try {
                const result = await axios.get(`${API_URL}/users`);
                console.log('Users from API:', result.data);
            } catch (err) {
                console.log('Error fetching users:', err);
            }
        };
        testCall();
    }, []);

    const login = async () => {
        setLoading(true);
        try {
            const result = await onLogin!(email, password);
            if (result?.error) {
                Alert.alert('Login Failed', result.msg);
            } else {
                router.replace('/'); // Navigate to Home / RootLayout
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong during login.');
            console.log(err);
        }
        setLoading(false);
    };

    const register = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        if (!username.trim()) {
            Alert.alert('Error', 'Username is required.');
            return;
        }

        setLoading(true);
        try {
            // Call the onRegister from AuthContext
            await onRegister!(username, email, password, confirmPassword);

            // Optional: automatically login after registration


        } catch (err: any) {
            console.log('Registration error:', err);
            Alert.alert('Error', 'Something went wrong during registration.');
        }
        setLoading(false);
    };


    return (
        <View style={styles.topContainer}>
            <View style={styles.container}>
                {/* Username (only needed for registration, but always shown for simplicity) */}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />
                ) : (
                    <>
                        <Button title="Sign In" onPress={login} />
                        <View style={{ height: 10 }} />
                        <Button title="Register" onPress={register} />
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginBottom: 12,
    },
});
