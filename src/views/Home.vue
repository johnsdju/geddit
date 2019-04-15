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
          <b-nav-item-dropdown text="SubGeddits" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <!-- <b-nav-item-dropdown text="User" right>
            <b-dropdown-item @click="switchtoAccount">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>-->
        </b-navbar-nav>
      </b-navbar>
    </div>

    <!-- Modal Add Post-->
    <!-- ------------- -->
    <div>
      <!-- Modal Component -->
      <b-modal id="modal-post" title="Post to SubGeddit" @ok="addPost" @show="resetFields">
        <div class="modal-body">
          <b-form>
            <b-form-group
              id="SubGeddit"
              label="Where do you want to post"
              label-for="subGeddit-input"
            >
              <b-form-input id="subGeddit-input" v-model="route"></b-form-input>
            </b-form-group>

            <b-form-group id="Title" label="Title your post" label-for="subGeddit-title">
              <b-form-input id="subGeddit-title" v-model="postTitle"></b-form-input>
            </b-form-group>

            <b-form-group
              id="Content"
              label="What do you want to post"
              label-for="subGeddit-content"
            >
              <b-form-textarea id="subGeddit-content" v-model="postData" rows="3" max-rows="6"></b-form-textarea>
            </b-form-group>
          </b-form>
        </div>
      </b-modal>
    </div>

    <!--Modal Create SubGeddit-->
    <!-- -------------------- -->
    <div>
      <!-- Modal Component -->
      <b-modal
        id="modal-create"
        title="Create a SubGeddit"
        @ok="createSubGeddit"
        @show="resetFields"
      >
        <div class="modal-body">
          <b-form>
            <b-form-group
              id="SubGeddit-name"
              label="Name your SubGeddit"
              label-for="subGeddit-name-input"
            >
              <b-form-input id="subGeddit-name-input" v-model="newSubGedditTitle"></b-form-input>
            </b-form-group>

            <b-form-group
              id="SubGeddit-Des"
              label="Tell us about your new SubGeddit"
              label-for="subGeddit-des-input"
            >
              <b-form-textarea
                id="subGeddit-des-input"
                v-model="newSubGedditDescription"
                rows="2"
                max-rows="2"
              ></b-form-textarea>
            </b-form-group>
          </b-form>
        </div>
      </b-modal>
    </div>

    <!-- Start Posts -->
    <!-- ----------- -->
    <!-- <div id="showPosts">
      <div class="text-center">
        <div>
          <b-table
            id="mainTable"
            hover
            :items="postDataTable"
            :fields="mainTableFields"
            @row-clicked="mainRowClicked(row)"
          >
            <template slot="actions" scope="postDataTable">
              <b-btn size="sm" @click="console.log(postDataTable.item)">Details</b-btn>
            </template>
          </b-table>
        </div>
      </div>
    </div>
    </div>-->
    <div>
      <table class="mainTable">
        <tr>
          <th>Vote</th>
          <th>Posted By</th>
          <th>Time Posted</th>
          <th>Title</th>
        </tr>
        <tr>
          <!-- For loop to populate data -->
        </tr>
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
      /*Needs to go in to a post thread component*/
      route: "",
      postTitle: "",
      postData: "",
      postDataTable: [],
      postObj: {},

      /*Needs to go in to a create sub geddit component*/
      newSubGedditTitle: "",
      newSubGedditDescription: "",
      mainTableFields: {}
    };
  },
  components: {},
  methods: {
    addPost() {
      const newPost = root.push();
      const data = {
        votes: 0,
        title: this.postTitle,
        user: this.currentUser,
        content: this.postData
      };
      newPost.set(data);
    },
    removePost() {
      root.child(post[".key"]).remove();
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
    switchtoAccount() {
      this.$router.replace("account");
    },
    createTable(snapshot) {
      const items = snapshot.val();
      this.postDataTable.push(items);
      console.log(this.postDataTable);
    },
    mainRowClicked(event) {
      alert(event);
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
.mainTable {
  margin-top: 30px;
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
</style>