<template>
  <div class="post">
    <!-- Nav bar -->
    <!-- ------- -->
    <div>
      <b-navbar class="navBar" type="dark" variant="dark" fixed="top">
        <img id="logo" alt="oh no.." src="./assets/logoG.png" width="25" height="25">
        <b-button id="postButton" v-b-modal.modal-post>Add Post</b-button>
        <!-- <b-button id="createButton" v-b-modal.modal-create>Create SubGeddit</b-button> -->

        <b-navbar-nav>
          <b-nav-item v-on:click = '$router.push("home")'>Home</b-nav-item>
          <b-nav-item v-on:click = '$router.push("Account")'>Account</b-nav-item>
          <b-nav-item v-on:click = 'logout'>Logout</b-nav-item>
          <!-- <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div id="Account-Body">
      <p></p>
    </div>
  </div>
</template>

<script>
import { frbase } from "../setupMyFirebase.js";
import app from "../main.js";

var root = frbase.database().ref("Posts");

// root.on("child_added", snapshot => {
//   console.log(snapshot.val());
//   app.createTable(snapshot);
// });

export default {
  name: "home",
  data() {
    return {
      /*Needs to go in to a post thread component*/
      route: "",
      postTitle: "",
      postData: "",
      postDataTable: [],
      postObj: {},

      /*Needs to go in to a create sub geddit component*/
      newSubGedditTitle: "",
      newSubGedditDescription: "",
      mainTableFields:{

      }
    };
  },
  components: {},
  methods: {
    addPost() {
      const newPost = root.push();
      const data = { votes: 0, title: this.postTitle, user: frbase.auth.ge, content: this.postData };
      newPost.set(data);
    },
    createSubGeddit() {
      let newSubGeddit = root.child(this.newSubGedditTitle);

      newSubGeddit.push().set({ Title: this.newSubGedditTitle });
      newSubGeddit.push().set({ Description: this.newSubGedditDescription });
    },
    resetFields() {
      (route = ""),
        (postTitle = ""),
        (postData = ""),
        (newSubGedditTitle = ""),
        (newSubGedditDescription = "");
    },
    logout() {
      frbase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    createTable(snapshot) {
      const items = snapshot.val();
      this.postDataTable.push(items);
      console.log(this.postDataTable);
    }
  },
  // Created
  created: function() {
    root.on("child_added", snapshot => {
      console.log(snapshot.val());
      this.createTable(snapshot);
    });
    //this.$refs.loadingAni = false;
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

#Account-Body{
  margin-top: 30px;
}
</style>