<template>
    <div class="login">
        <img alt="oh no.." src="./assets/logoG.png">
        <h3>Sign In</h3>
        <input type="text" placeholder="Username or Email" v-model = "email"><br>
        <input type="password" placeholder="Password" v-model = "password"><br>
        <b-button v-on:click = "login">Log in</b-button>
        <p>Don't have an account? Why not </p><router-link to="/sign-up">create one?</router-link>
    </div>
</template>

<script>

import {frbase} from "../setupMyFirebase.js"

export default {
    name: 'login',
    data(){
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login: function() {
            frbase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => { 
                    this.$router.replace('home')
                },
                (err) => {
                    alert('Yikes... '+ err.message);
                }
            )}
    }
}
</script>

<style scoped>

    body{
        text-align:center;
    }

  .login {
      margin-top: 40px;
      padding: 30px;
  }
  input {
      margin: 10px 0;
      width: 20%;
      padding: 15px;
  }
  button {
      margin-top: 20px;
      width: 10%;
      cursor: pointer;
  }
  p {
      margin-top: 40px;
      font-size: 13px;
  }
  p a {
      text-decoration: underline;
      cursor: pointer;
  }

</style>