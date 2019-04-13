<template>
  <div class="post">

    <!-- Nav bar -->
    <!-- ------- -->
    <div>
      <b-navbar class="navBar" type="dark" variant="dark" fixed="top">
        <img id="logo" alt="oh no.." src="./assets/logoG.png" width="25" height="25">
        <b-button id="postButton" v-b-modal.modal-post>Add Post</b-button>
         <b-button id="createButton" v-b-modal.modal-create>Create SubGeddit</b-button>

        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
          
           <b-nav-item-dropdown text="SubGeddits" right>
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
      <b-modal id="modal-post" title="Post to SubGeddit" @ok="post" @show="resetFields">
        <div class="modal-body">
          <b-form>

            <b-form-group id="SubGeddit" label = "Where do you want to post" label-for="subGeddit-input">
              <b-form-input id="subGeddit-input" v-model="route"></b-form-input>
            </b-form-group>

            <b-form-group id="Title" label = "Title your post" label-for="subGeddit-title">
              <b-form-input id="subGeddit-title" v-model="postTitle"></b-form-input>
            </b-form-group>

            <b-form-group id="Content" label = "What do you want to post" label-for="subGeddit-content">
              <b-form-textarea id="subGeddit-content" v-model="postData" rows ="3" max-rows="6"></b-form-textarea>
            </b-form-group>

          </b-form>
        </div>
      </b-modal>
    </div>
    

    <!--Modal Create SubGeddit-->
    <!-- -------------------- -->
    <div>
      <!-- Modal Component -->
      <b-modal id="modal-create" title="Create a SubGeddit" @ok="createSubGeddit" @show="resetFields">
        <div class="modal-body">
          <b-form>

            <b-form-group id="SubGeddit-name" label = "Name your SubGeddit" label-for="subGeddit-name-input">
              <b-form-input id="subGeddit-name-input" v-model="newSubGedditTitle"></b-form-input>
            </b-form-group>

            <b-form-group id="SubGeddit-Des" label = "Tell us about your new SubGeddit" label-for="subGeddit-des-input">
              <b-form-textarea id="subGeddit-des-input" v-model="newSubGedditDescription" rows="2" max-rows="2"></b-form-textarea>
            </b-form-group>

          </b-form>
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
var root = frbase.database().ref("SubGeddit");

export default {
  name: "home",
  data() {
    return {
      /*Needs to go in to a post thread component*/
      route: "",
      postTitle: "",
      postData: "",

      /*Needs to go in to a create sub geddit component*/
      newSubGedditTitle: "",
      newSubGedditDescription: "",
    };
  },
  components: {},
  methods: {
    
    post() {
      


      let newThread = root.child(this.route)
      let postUnderNewThread = newThread.child("Posts")
      let postDetails = postUnderNewThread.child(this.postTitle)
      postDetails.push().set({Title: this.postTitle})
      postDetails.push().set({Data: this.postData});

      

    },
    createSubGeddit() {
        let newSubGeddit = root.child(this.newSubGedditTitle);
      
        newSubGeddit.push().set({Title: this.newSubGedditTitle})
        newSubGeddit.push().set({Description: this.newSubGedditDescription})



    },
    resetFields(){
      route= "",
      postTitle= "",
      postData= "",
      newSubGedditTitle= "",
      newSubGedditDescription= ""
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
