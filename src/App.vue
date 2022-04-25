<template>
  <router-view />
</template>
<script lang="ts" setup>
import "@eds/vanilla/eds.min.css";
import { provide, ref } from "vue";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRMNMJsT4AnMPknkdCe--eMtNRDgtNfXY",
  authDomain: "shareride-71da0.firebaseapp.com",
  projectId: "shareride-71da0",
  storageBucket: "shareride-71da0.appspot.com",
  messagingSenderId: "337711546727",
  appId: "1:337711546727:web:c082792e3d99dd16176fc2",
  measurementId: "G-QPYMMNDBXD",
  databaseURL:
    "https://shareride-71da0-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const userName = ref("");
provide("FirebaseApp", app);
provide("UserName", userName);
</script>

<style lang="scss">
#app {
  height: 100vh;
  width: 100%;
}
</style>
