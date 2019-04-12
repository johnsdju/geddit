<template>
    <div class="sign-up">
        <p>Join the club!</p>
        <input type="text" placeholder="Username"><br>
        <input type="password" placeholder="Password"><br>
        <button @click="signUp">Sign Up</button>
        <span>or go </span><router-link to="/login">back.</router-link>
    </div>
</template>

<script>
import firebase from 'firebase';
//import func from '../vue-temp/vue-editor-bridge';

export default {
    name: 'signUp',
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signUp: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function (user){
                    alert('Your account has been created!')
                },
                function (err){
                    alert('Yikes.. ' + err.message)
                }
            )
        }
    }
}
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

