<template>
  <div class="post">
    <!-- <div id="post-image">
      <img alt="oh no.." src="./assets/logoG.png" width="50" height="50">
      <h2 id="mainHeader">Geddit: Aquire the Sauce</h2>
    </div>
    <div id="post-form">
      <button id="post" v-on:click="post">Post</button>
    </div>-->

    <!-- Nav bar -->
    <!-- ------- -->
    <div>
      <b-navbar class="navBar" type="dark" variant="dark" fixed="top">
        <img id="logo" alt="oh no.." src="./assets/logoG.png" width="25" height="25">
        <b-button id="postButton" v-b-modal.modal-1>Add Post</b-button>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item> -->

         
           <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>

   
    <!-- Modal Add Post-->
    <!-- ------------- -->
    <div>
      <!-- Modal Component -->
      <b-modal id="modal-1" title="BootstrapVue">
        <div class="modal-body">
          <div class="form-subGeddit">
            <label for="subGeddit">SubGeddit</label>
            <input type="text" class="form-subGeddit" id="subGeddit" placeholder>
          </div>
          <div class="form-title">
            <label for="inputTitle">Title</label>
            <input type="text" class="form-title" id="inputTitle">
          </div>
          <div class="form-description">
            <label for="descritption">Description</label>
            <input type="text" class="form-description" id="description">
          </div>
        </div>
      </b-modal>
    </div>

    <!-- Start Posts -->
    <!-- ----------- -->
    <div id="showPosts">
      <div class="text-center">
        <b-spinner id="loadingAni" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { frbase } from "../setupMyFirebase.js";
var root = frbase.database().ref();

export default {
  name: "home",
  data() {
    return {
      /*Needs to go in to a post thread component*/
      route: "",
      postTitle: "",
      postData: "",
      isPostVisible: false,

      /*Needs to go in to a create sub geddit component*/
      newSubGedditTitle: "",
      newSubGedditDescription: "",
      isCreateSubGedditVisibile: false
    };
  },
  components: {},
  methods: {
    /*Needs to go in to a post thread component*/
    showPost() {
      this.isPostVisible = !this.isPostVisible;
    },
    post() {
      let newSubGeddit = root.child(this.route + "/");
      let newThread = newSubGeddit.child(this.postTitle + "/");
      newThread.push().set(this.postData);

      this.isPostVisible = false;
    },

    /*Needs to go in to a create sub geddit component*/
    showCreateSubGeddit() {
      this.isCreateSubGedditVisibile = !this.isCreateSubGedditVisibile;
    },
    createSubGeddit() {
      let newSubGeddit = root.child(this.newSubGedditTitle + "/");
      newSubGeddit.push().set(this.newSubGedditDescription + "/");

      this.isCreateSubGedditVisibile = false;
    }
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
</style>
