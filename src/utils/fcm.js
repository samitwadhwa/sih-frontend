// import { messaging } from '../firebase.js';
// import axios from 'axios';
// import { getToken } from 'firebase/messaging';


// export const fcmToken = () => {
//     getToken(messaging, { vapidKey: 'BDVe_eN5wq_R25TN_MeeEfS1dS6zrwocbo0M6DmN8nTzDBhgYhmg1FSlW8MT8G3n_cJO_xuhBhKbAf786OZHNnY' }).then(async (currentToken) => {
//         if (currentToken) {
//             // Send the token to your server and update the UI if necessary
//             // ...
//             console.log(currentToken);
//             const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/add-fcm-token`, { fcmToken: currentToken }, { headers: { authorization: `Bearer: ${localStorage.getItem('token')}` } });
//             console.log(res)
//         } else {
//             // Show permission request UI
//             console.log('No registration token available. Request permission to generate one.');
//             return null;
//             // ...
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         return null;
//         // ...
//     });

// }