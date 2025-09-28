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

export const sendTransactionToBackend = async (payeeId, vendorId, order, amount) => {
    try {
        const token = await AsyncStorage.getItem("jwt_token");
        const userID = await AsyncStorage.getItem("userID");
        console.log('Token used for transaction:', token);
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.post(
            `${API_URL}/api/transactions/payment/pay`,
            {
                payee: userID,
                amount: vendorId,
                vendor: order,
                order: amount
            },{
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure Bearer prefix here
                    "Content-Type": "application/json",
                    "Accept-Encoding": "gzip, deflate, br",

                }
            }

        );
        console.log('Transaction saved:', response.data);
        return response.data;
    } catch (err) {
        console.error('Failed to save transaction:', err.message);
        throw err;
    }
};
