
// import {AuthProvider, useAuth} from "./AuthContext";
// import {NavigationContainer} from '@react-navigation/native';
// import { Button } from "react-native";
//
// import Login from "./Login";
// import Index from "./(tabs)/index";
// import RootLayout from "@/app/(tabs)/_layout";
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
//
//
//
// const Stack = createNativeStackNavigator();
//
// export default function App() {
//     return (
//         <AuthProvider>
//             <Layout>
//             </Layout>
//         </AuthProvider>
//
//     );
// }
//
// // export const Layout = () =>{
//     const {authState, onLogout} = useAuth();
//     return (
//
//             <Stack.Navigator screenOptions={{headerShown: false} }>{
//                 authState?.authenticated?
//                     (<Stack.Screen name={"Home"} component={RootLayout} options={{
//                         headerShown: true,
//                         headerRight:() => (<Button onPress={onLogout} title={"Logout"} />)
//                     }}></Stack.Screen>):
//                     (<Stack.Screen name={"Login"} component={Login}></Stack.Screen>)
//             }
//
//
//             </Stack.Navigator>
//
//     )
// }

import { AuthProvider, useAuth } from "./AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";
import Login from "./Login";
import RootLayout from "@/app/(tabs)/_layout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "@/app/(tabs)";

const Stack = createNativeStackNavigator();

// 🔹 Auth stack (Login/Signup)
const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        {/* you can add Signup or ForgotPassword here */}
    </Stack.Navigator>
);

// 🔹 App stack (only after login)
const AppStack = ({ onLogout }: { onLogout: () => void }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Index}
            options={{
                headerShown: false,
                // headerRight: () => <Button onPress={onLogout} title="Logout" />,
            }}
        />
    </Stack.Navigator>
);

// 🔹 Root navigator
const Layout = () => {
    const { authState, onLogout } = useAuth();

    return authState?.authenticated ? (
        <AppStack onLogout={onLogout} />
    ) : (
        <AuthStack />
    );
};

export default function App() {
    return (
        <AuthProvider>

                <Layout />

        </AuthProvider>
    );
}

