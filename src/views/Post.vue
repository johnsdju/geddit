<template>
  <div class="mainDiv">
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
    <div id="content">
      <h2>{{ postTitle }}</h2>
      <h4>Posted by: {{ email }}</h4>
      <b-button @click="removePost" v-if = "currentUser == email">Delete</b-button>
      <p>{{ postContent }}</p>
      <b-form-textarea v-model="text" placeholder="Reply: " rows="2" max-rows="2"></b-form-textarea>
      <b-button @click="reply">Reply</b-button>
      <div>
        <b-table striped hover :items="comments"></b-table>
          

      </div>
    </div>
  </div>
</template>

<script>
// Start imports for vue script
import { frbase } from "../setupMyFirebase.js";
import app from "../main.js";

// Firebase
var root = frbase.database().ref("Posts");

export default {
  props: {
    ukey: {
      type: String
    }
  },
  data() {
    return {
      postTitle: "",
      postContent: "",
      email: "",
      userKey: this.$props.ukey,
      text: "",
      commentRef: root.child(this.$props.ukey).child("Comments"),
      comments: [],
      createdAt: Date.now(),
      currentUser: frbase.auth().currentUser.email
    };
  },
  methods: {
    Home() {
      this.$router.go(-1);
    },
    removePost() {
      root.child(this.userKey).remove();
      this.Home();
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
      this.$router.push({ path: "/account" });
    },
    moment(){
        reply.createdAt. 
        moment("from", "now")
        return moment();
    },
    reply() {
      const newReply = this.commentRef.child(this.userKey).push();
      const data = {
        user: frbase.auth().currentUser.email,
        replyText: this.text,
        time: Date.now()
      };
      this.commentRef.push(data);
    }
  },
  created: function() {
    // root
    //   .child(this.userKey)
    //   .child("email")
    //   .on("value", function(snapshot) {
    //     let items = snapshot.val()
    //   });


    root.on("child_added", snapshot => {
      let items = snapshot.val();
      if (this.userKey == snapshot.key) {
        this.postTitle = items.title;
        this.postContent = items.content;
        this.email = items.user;
      }
    });
    this.commentRef.on("child_added", snapshot =>{
      this.comments.push(snapshot.val());
    })
    root.on("child_changed", snapshot => {
      let items = snapshot.val();
    });
  }
};
</script>


<style>
/* .mainDiv {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #c850c0;
  background: -webkit-linear-gradient(45deg, #4158d0, #c850c0);
  background: -o-linear-gradient(45deg, #4158d0, #c850c0);
  background: -moz-linear-gradient(45deg, #4158d0, #c850c0);
  background: linear-gradient(45deg, #4158d0, #c850c0);
} */
#test {
  margin-top: 50px;
}
#content {
  margin-top: 60px;
}
</style>