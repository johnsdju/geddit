import Vue from 'vue'
import Vuex from 'vuex'
import {frbase} from "./setupMyFirebase.js"
Vue.use(Vuex)

// global object for maintaining application state
export const store = new Vuex.Store({
  
  // (data) shared data accessible to the entire app
  state: {
    //keyOfSelectedPost: null
  },
  // updating the actual state
  mutations: {
    //UPDATE_POSTKEY(s,k){
      //s.keyOfSelectedPost=k;
    
  },
  // (methods) for initiating state update from an async task
  actions: {
    //selectPost({commit}, postKey)//{commit calls}
    //commit('UPDATE_POSTKEY', postKey) //string for function name, key second arugment
  }
})