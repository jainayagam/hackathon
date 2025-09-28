
    // import { createContext, useContext, useEffect, useState } from "react";
    // import axios from "axios";
    // import * as SecureStore from "expo-secure-store";
    //
    // interface AuthProps {
    //     authState?: { token: string | null; authenticated: boolean | null };
    //     onRegister?: (username: string, email: string, password: string, confirmPassword: string) => Promise<any>;
    //     onLogin?: (email: string, password: string) => Promise<any>;
    //     onLogout?: () => Promise<any>;
    // }
    //
    // const TOKEN_KEY = "my-jwt";
    // export const API_URL = "https://signupbackend-wrdy.onrender.com"; // or your LAN IP if using a device
    //
    // const AuthContext = createContext<AuthProps>({});
    //
    // export const useAuth = () => useContext(AuthContext);
    //
    // export const AuthProvider = ({ children }: any) => {
    //     const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>({
    //         token: null,
    //         authenticated: null,
    //     });
    //
    //     // Load token from SecureStore on app start
    //     useEffect(() => {
    //         const loadToken = async () => {
    //             const token = await SecureStore.getItemAsync(TOKEN_KEY);
    //             if (token) {
    //                 axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    //                 setAuthState({ token, authenticated: true });
    //             } else {
    //                 setAuthState({ token: null, authenticated: false });
    //             }
    //         };
    //         loadToken();
    //     }, []);
    //
    //     // Register new user
    //     const register = async (email: string, password: string) => {
    //         try {
    //             return await axios.post(`${API_URL}/api/auth/signup`, { username, email, password, confirmPassword });
    //         } catch (err: any) {
    //             const errorMsg =
    //                 err?.response?.data?.message || err?.message || "Something went wrong";
    //             return { error: true, msg: errorMsg };
    //         }
    //     };
    //
    //     // Login by checking users.json
    //     const login = async (email: string, password: string) => {
    //         try {
    //             const res = await axios.get(`${API_URL}/users`);
    //             const user = res.data.find((u: any) => u.email === email && u.password === password);
    //
    //             if (user) {
    //                 // simulate a JWT token
    //                 const fakeToken = btoa(`${email}:${password}`);
    //                 await SecureStore.setItemAsync(TOKEN_KEY, fakeToken);
    //                 axios.defaults.headers.common["Authorization"] = `Bearer ${fakeToken}`;
    //
    //                 setAuthState({ token: fakeToken, authenticated: true });
    //                 return { success: true };
    //             } else {
    //                 return { error: true, msg: "Invalid email or password" };
    //             }
    //         } catch (err) {
    //             return { error: true, msg: "Login failed" };
    //         }
    //     };
    //
    //     // Logout
    //     const logout = async () => {
    //         await SecureStore.deleteItemAsync(TOKEN_KEY);
    //         axios.defaults.headers.common["Authorization"] = "";
    //         setAuthState({ token: null, authenticated: false });
    //     };
    //
    //     const value = {
    //         onRegister: register,
    //         onLogin: login,
    //         onLogout: logout,
    //         authState,
    //     };
    //
    //     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    // };
    import { createContext, useContext, useState, useEffect } from "react";
    import axios from "axios";
    import AsyncStorage from "@react-native-async-storage/async-storage";

    interface AuthState {
        token: string | null;
        authenticated: boolean;
    }

    interface AuthContextType {
        authState: AuthState;
        onRegister: (
            username: string,
            email: string,
            password: string,
            confirmPassword: string
        ) => Promise<void>;
        onLogin: (email: string, password: string) => Promise<void>;
        logout: () => Promise<void>;
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
        const [authState, setAuthState] = useState<AuthState>({
            token: null,
            authenticated: false,
        });

        const API_URL = "https://signupbackend-wrdy.onrender.com";

        // Load token from AsyncStorage on provider mount
        useEffect(() => {
            const loadToken = async () => {
                try {
                    const token = await AsyncStorage.getItem("jwt_token");
                    if (token) {
                        setAuthState({ token, authenticated: false });
                    }
                } catch (error) {
                    console.error("Failed to load token", error);
                }
            };
            loadToken();
        }, []);

        const onRegister = async (
            username: string,
            email: string,
            password: string,
            confirmPassword: string
        ) => {
            try {
                const url = `${API_URL}/api/auth/signup`;

                const response = await axios.post(
                    url,
                    {
                        username,
                        email,
                        password,
                        confirmPassword,
                    },
                    { headers: { "Content-Type": "application/json" } }
                );

                const jwtToken = response.data.token;
                await AsyncStorage.setItem("jwt_token", jwtToken);
                setAuthState({ token: jwtToken, authenticated: false });

                console.log("Registered successfully");
                console.log("JWT token:", jwtToken);
            } catch (error: any) {
                console.error("Registration failed:", error.response?.data || error.message);
            }
        };

        const onLogin = async (email: string, password: string) => {
            try {
                const response = await axios.post(
                    `${API_URL}/api/auth/login`,
                    { email, password },
                    { headers: { "Content-Type": "application/json" } }
                );

                // Adjust here as per actual backend response structure
                const jwtToken = response.data.token;
                const userID = response.data.user;

                await AsyncStorage.setItem("jwt_token", jwtToken)
                await AsyncStorage.setItem("userID", userID);
                setAuthState({ token: jwtToken, authenticated: true })
                console.log(jwtToken);

                console.log("Logged in successfully");
            } catch (error: any) {
                if (error.response) {
                    console.error("Login failed:", error.response.data);
                } else if (error.request) {
                    console.error("No response:", error.request);
                } else {
                    console.error("Error:", error.message);
                }
            }
        };

        const logout = async () => {
            try {
                await AsyncStorage.removeItem("jwt_token");
                setAuthState({ token: null, authenticated: false });
                console.log("Logged out");
            } catch (error) {
                console.error("Logout failed", error);
            }
        };

        return (
            <AuthContext.Provider value={{ authState, onRegister, onLogin, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => {
        const context = useContext(AuthContext);
        if (!context) throw new Error("useAuth must be used within AuthProvider");
        return context;
    };
