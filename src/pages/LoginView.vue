<script lang="ts" setup>
import { computed, ref, inject, provide, Ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import type { FirebaseApp } from "@firebase/app";
import router from "../components/Routes";
import { UserEntryMode } from "../enums/user-entry-mode";

const app = inject("FirebaseApp") as FirebaseApp;
const auth = getAuth(app);
const email = ref<string>("");
const password = ref("");
const userName = inject("UserName") as Ref<string>;
const mode = ref<UserEntryMode>(UserEntryMode.Login);
const errorMsg = ref("");
let uid = "";
const disableButton = computed(() => {
  return (
    !email.value ||
    !password.value ||
    (!userName.value && mode.value === UserEntryMode.Register)
  );
});

if (!!auth.currentUser) {
  userName.value = auth.currentUser.displayName ?? "";
  router.push({
    name: "drive",
  });
}

function changeMode() {
  mode.value =
    mode.value === UserEntryMode.Register
      ? UserEntryMode.Login
      : UserEntryMode.Register;
}

function handleButtonClick() {
  if (mode.value === UserEntryMode.Register) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        uid = user.uid;

        return user;
      })
      .then((user) => {
        updateProfile(user, { displayName: userName.value });
        userName.value = auth.currentUser?.displayName ?? "";
        router.push({
          name: "drive",
          params: { userID: uid },
        });
      })
      .catch((error) => {
        errorMsg.value = error.message;
      });
  } else {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.displayName, auth.currentUser?.displayName);
        uid = user.uid;
        userName.value = auth.currentUser?.displayName ?? "";
        router.push({
          name: "drive",
        });
        // ...
      })
      .catch((error) => {
        errorMsg.value = error.message;
      });
  }
}
</script>
<template>
  <div class="card">
    <div class="header">
      <div class="left">
        <div class="title">{{ mode }} with Email and Password</div>
        <div class="subtitle"></div>
      </div>
    </div>
    <div class="content">
      <input
        required
        v-model="email"
        class="validation"
        type="email"
        placeholder="Email"
      />
      <span class="validation-msg">Please enter a valid email</span>
      <input
        required
        class="validation"
        type="password"
        placeholder="Password"
        v-model="password"
      />
      <input
        required
        v-if="mode === UserEntryMode.Register"
        class="validation"
        type="text"
        placeholder="Name"
        v-model="userName"
      />
      <button
        class="btn primary"
        @click="handleButtonClick"
        :disabled="disableButton"
      >
        {{ mode }}
      </button>
      <p v-if="mode === UserEntryMode.Login">
        Or <a @click="changeMode">Register</a> if you are a new user
      </p>
      <p v-else>
        Already Registered?<a @click="changeMode"> Login</a> with username and
        password
      </p>
      <p v-if="errorMsg" class="error-msg">
        <i> {{ errorMsg }}</i>
      </p>
    </div>
  </div>
</template>

<style scoped>
.error-msg {
  margin-top: 20px;
  color: brown;
}
</style>
