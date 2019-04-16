<template>
  <div class="post">
    <!-- Nav bar -->
    <!-- ------- -->
    <div>
      <b-navbar class="navBar" type="dark" variant="dark" fixed="top">
        <img id="logo" alt="oh no.." src="./assets/logoG.png" width="25" height="25">
        <b-button id="postButton" v-b-modal.modal-post>Add Post</b-button>
        <b-navbar-nav>
          <b-nav-item @click="Home">Home</b-nav-item>
          <b-nav-item @click="switchtoAccount">Account</b-nav-item>
          <b-nav-item v-on:click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <!-- Show User Private Data -->
    <div>
      <b-table hover :items="items" dark></b-table>
    </div>
  </div>
</template>

<script>
// Start imports for vue script
import { frbase } from "../setupMyFirebase.js";
import app from "../main.js";

// Firebase
var root = frbase.database().ref("Private Data");

export default {
  name: "home",
  data() {
    return {
      /*Needs to go in to a post thread component*/
      items: [],
      currentUser: frbase.auth().currentUser.email
    };
  },
  components: {},
  methods: {
    Home() {
      this.$router.replace("home");
    },
    logout() {
      frbase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    switchtoAccount() {
      this.$router.replace("account");
    }
  },
  // Created
  created: function() {
    root.on("child_added", snapshot => {
      let records = snapshot.val();
      if (this.currentUser == records.email) {
        this.items.push(records);
      }
    });
  }
};
</script>

<style>
.post {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /* padding: 30px; */
}
tr{
  font-size: 15px;
  background-color: #080707;
  line-height: 1.2;
  font-weight: unset;
}
.post a {
  font-weight: bold;
  color: #2c3e50;
}
body{
  background-color: #454d55;
  margin: 0px;
}
#mainHeader {
  display: inline;
}

#post-image {
  padding-bottom: 0px;
}

#post-form {
  float: left;
}

#createSubGeddit-form {
  float: left;
}

#logo {
  margin-right: 20px;
}

#postButton {
  margin-right: 20px;
}

#loadingAni {
  margin-top: 200px;
  width: 3rem;
  height: 3rem;
}

#mainTable {
  margin-top: 20px;
}

#Account-Body {
  margin-top: 30px;
}
</style>