<template>
  <div class="post">
    <!-- <div id="post-image">
      <img alt="oh no.." src="./assets/logoG.png" width="50" height="50">
      <h2 id="mainHeader">Geddit: Aquire the Sauce</h2>
    </div>
    <div id="post-form">
      <button id="post" v-on:click="post">Post</button>
    </div> -->

       <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Reddit Clone</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <button type="button" class="btn btn-primary add-post" data-toggle="modal" data-target="#addPost">
                Add Post
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">
      <!-- loading message -->
      <h1 id="loadingMsg">Loading...</h1>

      <!-- start modal -->
      <div class="modal fade" id="addPost" tabindex="-1" role="dialog" aria-labelledby="addNewPost">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" id="myModalLabel">Add New Post</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="inputURL">URL</label>
                <input type="text" class="form-control" id="inputURL" placeholder="https://www.thebestjs.com">
              </div>
              <div class="form-group">
                <label for="inputTitle">Title</label>
                <input type="text" class="form-control" id="inputTitle">
              </div>
              <div class="form-group">
                <label for="inputUser">Your Name</label>
                <input type="text" class="form-control" id="inputUser">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="sharePost">Share!</button>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal -->

      <ul id="list" class="list-unstyled"></ul>

      <!-- begin reusable template code -->
      <template id="content-template">
        <li class="content row">
          <div class="content-votes col-xs-1">
            <div class="arrow vote-up">&bigtriangleup;</div>
            <div class="votes"></div>
            <div class="arrow vote-down">&bigtriangledown;</div>
          </div>
          <div class="content-main col-xs-9">
            <a class="content-link"><h3 class="content-title"></h3></a>
            <p class="content-meta"></p>
          </div>
        </li>
      </template>
      <!-- end reusable template code -->
    </div> <!-- /container -->

  </div>

  
</template>

<script>
import { frbase } from "../setupMyFirebase.js";




export default {
  name: "home",
  components: {},
  methods: {
    post() {
      alert("works");
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
