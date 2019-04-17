<template>
  <div class="mainDiv">
    <!-- Nav bar -->
    <!-- ------- -->
    <div>
      <b-navbar class="navBar" type="dark" variant="dark" fixed="top">
        <img id="logo" alt="oh no.." src="./assets/logoG.png" width="25" height="25">
        
        <b-navbar-nav>
          <b-nav-item @click="Home">Home</b-nav-item>
          <b-nav-item @click="switchtoAccount">Account</b-nav-item>
          <b-nav-item v-on:click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <!-- Start post content -->
    <div id="postContent">
      <h4 class="sameLine">{{ postTitle }} </h4>
      <p class="sameLine" id="postedBy"> Posted by: {{ email }}</p>
      
      <p id="postContentCSS">{{ postContent }}</p>

      <!-- Table for comments -->
      <div>
        <br>
        <table id="commentTable" align="center">
          <tr height="50">
            <th>Comments</th>
          </tr>
          <template v-for="reply in comments">
            <tr>
              <td><p id="userReply">Posted by {{reply.user}} {{reply.time | moment("from", "now") }} </p><p>{{reply.replyText}}</p></td>
            </tr>
          </template>
        </table>
        </br>
        <br>
              <b-form-textarea id="replybox" v-model="text" placeholder="Reply: " rows="2" max-rows="2" @keyup.enter.native="reply"></b-form-textarea>
      <b-button id="b-butt" @click="reply" >Reply</b-button>
      </br>
      <br>
      <b-button class="sameLine" id="centerButton" @click="removePost" v-if = "currentUser == email" variant="outline-danger">Delete Post</b-button>
      </br>
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
      this.text = "";
    }
  },
  created: function() {
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
#centerButton{
  width: 40%;
margin-left: 30%;
margin-right: 30%
}
#postContentCSS{
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
}
#postedBy{
  color: rgb(149, 152, 156);
}
#b-butt{
    float: right;
    margin-right: 140px;
    margin-top: -50px;
}
#replybox{
    width: 40%;
    margin-left: 30%;
    margin-right: 30%
    
}
#userReply{
  color: rgb(146, 146, 155);
}

.sameLine{
  display:inline-block;
  margin-left: 10px;
  padding-top: 2%;
} 
.mainDiv {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 0px;
  width: 100%;
  min-height: 100vh;
  background: #c850c0;
  background: -webkit-linear-gradient(45deg, #4158d0, #c850c0);
  background: -o-linear-gradient(45deg, #4158d0, #c850c0);
  background: -moz-linear-gradient(45deg, #4158d0, #c850c0);
  background: linear-gradient(45deg, #4158d0, #c850c0);
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-wrap: wrap;
}
#commentTable{
  text-align: left;
  color: #2c3e50;
  width: 90%;
  /* min-height: 30vh;  */
  align-items: center;
  justify-content: center;
  position: relative;
}
#commentTable:nth-child(even){
background: rgb(221, 220, 220);
}
#commenTable:nth-child(odd){
    background: #eee;
}
#test {
  margin-top: 50px;
}
#postContent {
  margin-top: 10%;
  margin-bottom: 10%;
  width: 1000px;
  background: white;
  padding: 1%;
}
</style>