<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" placeholder="Username"><br>
        <input type="password" placeholder="Password"><br>
        <button>Log in</button>
        <p>Don't have an account? Why not </p><router-link to="/sign-up">create one?</router-link>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
        return {};
    },
    methods: {
        login: function() {
            this.$router.replace('home');
        }
    }
}
</script>

<style scoped>
  .login {
      margin-top: 40px;
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
