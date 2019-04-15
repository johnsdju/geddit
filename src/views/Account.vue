<template>
  <div class="post">
    <!-- Nav bar -->
    <!-- ------- -->
    <div>
      <b-navbar class="navBar" type="dark" variant="dark" fixed="top">
        <img id="logo" alt="oh no.." src="./assets/logoG.png" width="25" height="25">
        <b-button id="postButton" v-b-modal.modal-post>Add Post</b-button>
        <b-navbar-nav>
          <b-nav-item v-on:click="$router.push("home")">Home</b-nav-item>
          <b-nav-item v-on:click="$router.push("Account")">Account</b-nav-item>
          <b-nav-item v-on:click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <!-- <div id="Account-Body">
      <div>
        <table class="mainTable">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Date Of Birth</th>
          </tr>
          <template v-for="post in postDataTable">
            <tr v-bind:ref="post.snapKey" @click="postDetails(post.snapKey)">
              <td>{{ post.firstName }}</td>
              <td>{{ post.lastName }}</td>
              <td>{{ post.email }}</td>
              <td>{{ post.phone }}</td>
              <td>{{ post.age }}</td>
              <td>{{ post.dob}}</td>
              <td>{{post.createdAt}}</td>
            </tr>
          </template>
        </table>
      </div>
    </div> -->

    <div>
      <b-table hover :items="items"></b-table>
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
    },
    createTable(snapshot) {
       let items = snapshot.val();
       items.snapKey = snapshot.key;
       this.postDataTable.push(items);

    let curr = root.child().orderByChild("email").equalTo(this.currentUser.email).on("child_added",
              snapshot => {
                let items = snapshot.val()
                items.snapKey = snapshot.key
                this.postDataTable.push(items)
            })

    },
    mainRowClicked(event) {
      alert(event);
    },
    postDetails(key) {}
  },
  // Created
  created: function() {
    root.on("child_added", snapshot => {
      console.log("the added obj: " + snapshot.val());
      this.createTable(snapshot);
    });
    root.on("child_changed", snapshot => {
      this.createTable(snapshot);
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
}
.post {
  padding: 30px;
}
.post a {
  font-weight: bold;
  color: #2c3e50;
}
.post a.router-link-exact-active {
  color: #42b983;
}
#mainHeader {
  display: inline;
}

#post-image {
  padding-bottom: 10px;
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