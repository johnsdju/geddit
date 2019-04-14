import Vue from 'vue'
import Vuex from 'vuex'
import {frbase} from "./setupMyFirebase.js"
Vue.use(Vuex)

// global object for maintaining application state
export default new Vuex.Store({
  
  // (data) shared data accessible to the entire app
  state: {
    currentUser: null,
    userProfile: {}
  },
  // updating the actual state
  mutations: {
    setCurrentUser(state, val){
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPosts(state, val){
      if (val){
        state.posts = val
      }else {
        state.posts = []
      }
    },
    setHiddenPosts(state, val){
      if (val) {
        if(!state.hiddenPosts.some(x => x.id === val.id)){
          state.hidden
        }
      }
    }
  },
  // (methods) for initiating state update from an async task
  actions: {
    clearData({ commit }){
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
    fetchUserProfile({ commit, state }){
      frbase.usersCollection.doc(state.currentUser.uid).get()
      .then(res => { 
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    }
  },
  // (computed) 
  getters: {

  }
})