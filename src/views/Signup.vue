<template>
  <div class="sign-up">
    <img alt="oh no.." src="./assets/logoG.png">
    <p>Join the club!</p>
    <input type="text" placeholder="Email" v-model="email">
    <br>
    <input type="password" placeholder="Password" v-model="password">
    <br>
    <input type="text" placeholder="First Name" v-model="firstName">
    <br>
    <input type="text" placeholder="Last Name" v-model="lastName">
    <br>
    <input type="text" placeholder="Phone Number" v-model="phone">
    <br>
    <input type="text" placeholder="Age" v-model="age">
    <br>
    <input id = "date-picker" type="date" name="bdate" v-model="dob"><br>
    <b-button @click="handler">Sign Up</b-button>
    <span>or go</span>
    <router-link to="/">back</router-link>
  </div>
</template>

<script>
import { frbase } from "../setupMyFirebase.js";

var root = frbase.database().ref("Private Data");

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      age: "",
      dob: ""
    };
  },
  methods: {
    signUp: function() {
      frbase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert("Your account has been created!");
          },
          err => {
            alert("Yikes.. " + err.message);
          }
        );
    },
    createTable() {
      const newPrivate = root.push();
      const privateData = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        age: this.age,
        dob: this.dob
      };
      newPrivate.set(privateData);
    },
    handler() {
      this.signUp();
      this.createTable();
      this.$router.replace("home");
    }
  }
};
</script>
<style scoped>
.signUp {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
