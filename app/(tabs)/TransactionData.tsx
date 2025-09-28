// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//
// const API_URL = 'https://signupbackend-wrdy.onrender.com';
//
// export const sendTransactionToBackend = async (payeeId, vendorId, order, amount) => {
//     try {
//         // Get token from AsyncStorage
//         const token = await AsyncStorage.getItem("jwt_token");
//
//         if (!token) {
//             throw new Error("No auth token found. Please log in.");
//         }
//
//         const response = await axios.post(
//             `${API_URL}/api/transactions/payment/pay`, // <-- added missing `/`
//             {
//                 payee: payeeId,
//                 vendor: vendorId,
//                 order: order,
//                 amount: amount,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // <-- attach token
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//
//         console.log('Transaction saved:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to save transaction:', error.response?.data || error.message);
//         throw error;
//     }
// };
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://signupbackend-wrdy.onrender.com';

export const sendTransactionToBackend = async (payeeId:string, vendorId:string, order, amount:Number) => {
    try {
        const token = await AsyncStorage.getItem("jwt_token");
        console.log(token);
        if (!token) throw new Error("No auth token found. Please log in.");
        console.log(vendorId);
        console.log(typeof vendorId);
        const response = await axios.post(
            `${API_URL}/api/transactions/payment/pay`,
            {
                payee: payeeId,
                 // this must be array of objects
                amount: amount,
                vendor: vendorId,
                order: order,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log('Transaction saved:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to save transaction:', error.response?.data || error.message);
        throw error;
    }
};
