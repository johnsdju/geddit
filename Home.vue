<template>
  <div class="post">
    <div id="post-image">
      <img alt="oh no.." src="./assets/logoG.png" width="50" height="50">
      <h2 id="mainHeader">Geddit: Aquire the Sauce</h2>
    </div>
    <div id="post-form">
      <button id="show-post" v-on:click="showPost">Create Post</button>
      <table v-show="isPostVisible === true">
        <tr>
          <td><input type="text" placeholder="g/" v-model="route"></td>
        </tr>
        <tr>
          <td><input type="text" placeholder="title" v-model = "postTitle"></td>
        </tr>
        <tr>
          <td><textarea rows="10" cols="60" placeholder="Write here!" v-model="postData"></textarea></td>
        </tr>
        <tr>
          <td><button id= "submit-post" v-on:click = "post">Submit</button></td>
        </tr>
      </table>
    </div>
  </div>

  
</template>

<script>
import { frbase } from "../setupMyFirebase.js";
  var root = frbase.database().ref();
  

export default {
  name: "home",
  data(){
    return{
      route: "",
      postTitle: "",
      postData: "",
      isPostVisible: false
    }

  },
  components: {},
  methods: {
    showPost(){
      this.isPostVisible = true
    },
    post() {
      let newSubGeddit = root.child(this.route + "/")
      let newThread = newSubGeddit.child(this.postTitle + "/")
      newThread.push().set(this.postData)

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
</style>
