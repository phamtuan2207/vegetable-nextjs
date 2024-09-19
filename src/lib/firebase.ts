import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAP0V4BJXL5IXXl_9JHMSTGZGE4M6-iZk0",
    authDomain: "crud-84bc6.firebaseapp.com",
    projectId: "crud-84bc6",
    storageBucket: "crud-84bc6.appspot.com",
    messagingSenderId: "261973539531",
    appId: "1:261973539531:web:05622d515046611d5e394e",
    measurementId: "G-VLYWN04FWS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
