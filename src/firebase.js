// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getMessaging, onMessage, getToken } from "firebase/messaging";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5NYk01ktTtd0d2AQThUzQKw99UBl4Lao",
  authDomain: "vc-tech-app.firebaseapp.com",
  projectId: "vc-tech-app",
  storageBucket: "vc-tech-app.appspot.com",
  messagingSenderId: "745970913307",
  appId: "1:745970913307:web:35a915ccac35fbb90ae8be",
  measurementId: "G-0F0SRM6DJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);



export const registerSW = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`);
      console.log('reg success, scope is:', reg.scope);
      const currToken = await getToken(messaging, { vapidKey: 'BDVe_eN5wq_R25TN_MeeEfS1dS6zrwocbo0M6DmN8nTzDBhgYhmg1FSlW8MT8G3n_cJO_xuhBhKbAf786OZHNnY', serviceWorkerRegistration: reg });
      return currToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export const foreMsg = async () => {
  onMessage(messaging, (payload) => {
    // console.log('Message received. ', payload);
    return payload;
    // ...
  });
}