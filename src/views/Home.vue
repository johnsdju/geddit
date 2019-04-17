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
        </b-navbar-nav>
      </b-navbar>
    </div>

    <!-- <NavBar></NavBar> -->
    <!-- Modal Add Post-->
    <!-- ------------- -->
    <div>
      <!-- Modal Component -->
      <b-modal id="modal-post" title="Post to SubGeddit" @ok="addPost" @show="resetFields">
        <div class="modal-body">
          <b-form>
            <b-form-group id="Title" label="Title your post" label-for="subGeddit-title">
              <b-form-input id="subGeddit-title" v-model="postTitle"></b-form-input>
            </b-form-group>

            <b-form-group
              id="Content"
              label="What do you want to post"
              label-for="subGeddit-content">
              <b-form-textarea id="subGeddit-content" v-model="postData" rows="3" max-rows="6"></b-form-textarea>
            </b-form-group>
          </b-form>
        </div>
      </b-modal>
    </div>

    <!-- Start Posts -->
    <!-- ----------- -->
    <div>
      <table class="mainTable">
        <tr class="headers">
          <th>Vote</th>
          <th>Title</th>
          <th>Posted By</th>
          <th>Time Posted</th>
        </tr>
        <!-- For loop to populate data -->
        <template v-for="post in postDataTable">
          <tr v-model="post.votes" v-bind:ref="post.snapKey">
            <td>
              <b-button size="sm" id="upvote" variant="outline-info" @click="upvote(post.snapKey, post.votes)">▲</b-button>
              <p id="upVotesID"><b-button size="sm" disabled variant="info">{{ post.votes }}</b-button></p>
              <b-button size="sm" id="downvote" variant="outline-info"
                @click="downvote(post.snapKey, post.votes)"
              >▼</b-button>
            </td>
            <td id="title" @click="postDetails(post.snapKey)">{{ post.title }}</td>
            <td id="user">{{ post.user }}</td>
            <td id="moment"> {{ post.createdAt | moment("from", "now") }}</td> 
          </tr>
        </template>
      </table>
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
  name: "home",
  data() {
    return {
      route: "",
      postTitle: "",
      postData: "",
      postDataTable: [],
      postObj: {},
      upvoted: false,
      downvoted: false,
      votes: 0,
    };
  },
  methods: {
    addPost() {
      const newPost = root.push();
      const data = {
        votes: this.votes,
        title: this.postTitle,
        user: frbase.auth().currentUser.email,
        content: this.postData,
        createdAt: Date.now()
      };
      newPost.set(data);
    },
    moment() {
      return moment();
    },
    upvote(key, num) {
      if(this.upvoted === false){
      num++; 
      root
        .child(key)
        .child('votes')
        .set(num);
        this.upvoted = true;
        this.downvoted = false;
      }
    },
    downvote(key, num) {
      if (this.downvoted === false){
      num--;
      root
        .child(key)
        .child('votes')
        .set(num);
        this.upvoted = false;
        this.downvoted = true;
      }
    },
    resetFields() {
      (route = ""),
        (postTitle = ""),
        (postData = "");
    },
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
  
    },
    mainRowClicked(event) {
      alert(event);
    },
    postDetails(userkey) {
      this.$router.push({
        name: "Post",
        params: {
          ukey:userkey
        }
      })
    }
  },
  // Created
  created: function() {
    root.on("child_added", snapshot => {
      this.createTable(snapshot);
    });
    root.on("child_changed", snapshot => {
      let items = snapshot.val();
      this.postDataTable.forEach(element =>{
        if(element.snapKey == snapshot.key){
          element.votes = items.votes;
        }
      });
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
.post a {
  font-weight: bold;
  color: #2c3e50;
}

.post a.router-link-exact-active {
  color: #42b983;
}
#upvote{
  margin-bottom: 5px;
  text-align: center;
  margin-left: 7px;
}
#upvoteID{
  /* padding: 10%; */
 text-align: center;
  margin-left: 7px;
}
#downvote{
  margin-top: -10px;
  margin-left: 7px;
  text-align: center;
}
#title:hover{
  color: blue;
  cursor: pointer;
}

#upVotesID{
  font-weight: bold;
  font-size: 18px;
  padding-left: 10px;
  
}
#moment{
  width: 15%;
}

b-button{
  margin-left: 10px;
}

.mainTable {
  border-spacing: 1;
  border-radius: 10px transparent;
  overflow: hidden;
  /* width: 100%; */
  padding-top: 500px;
  margin-top: 20%;
  margin-bottom: 20%;
  /* margin-left: 50%; */
}

table{
  width: 1000px;
}

th{
  font-size: 18px;
  background-color: #2c3e50;
  color: #999d9f;
  line-height: 1.2;
  font-weight: unset;
  padding-left: 30px;
  padding-right:20px;
}

tr:nth-child(even) {
  background-color: #f5f5f5;
}

tr:nth-child(odd){
  font-size: 15px;
  background-color: #ebe7e7;
  line-height: 1.2;
  font-weight: unset;
}
td{
  padding-left: 20px;
  padding-right: 20px;
  height: 30px; 
   padding-top: 10px;
  padding-bottom: 10px;
}
tr:hover {
  color: #555555;
  background-color: #c0c0c0;
}

.headers{
  height: 60px;
  background: rgb(52,58,64);
}


</style>