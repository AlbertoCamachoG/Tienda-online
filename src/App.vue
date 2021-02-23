<template>
  <div id="app">
    
    <Cabecera></Cabecera>
    <pulse-loader class="loader"  :loading="loading" :color="color" :size="size"></pulse-loader>
    <router-view></router-view>
    <router-view v-if="authenticated" name="productos"></router-view>
    <Pie></Pie>
  </div>
  
</template>

<script>
import Cabecera from './components/Cabecera.vue'
import Pie from './components/pie.vue'
import Firebase from './db.js'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'App',
  components: {
    Cabecera,
    Pie,
    PulseLoader
  },
  mounted (){
    Firebase.auth.onAuthStateChanged( user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      }
      else {
        this.user.loggedIn = false;
        this.user.data = {};
        if(this.$route.path!="/")this.$router.push('/')
      }

    })
    setTimeout(()=>{this.loading=false},400);
  },
  data (){
    return{
      user: {
          loggedIn: true,
          data: {}
        },
        size:'200px',
        loading:true,
        color:"green"
    }
  },
  computed: {
    authenticated(){
      return this.user.loggedIn
    }
  }
}


</script>

<style lang="scss">
  .loader{
    position:absolute;
    z-index: 100;
    top:35%;
    left:35%;
  }
</style>
