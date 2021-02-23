<template lang="html">

  <section>
    <notifications group="home" position="top center" height="700"/>
    <div class="hero-image">
      <div class="hero-text">
        <h1>Bienvenido a mi tienda de flores!</h1>
        <p>Para acceder a la tienda necesitas estar logueado</p>
        <router-link class="hero-link" :to="{ name: 'Main',params:{}, props: { 'auth': 'true' } }">Ver los productos</router-link><br>
      </div>
    </div>
  </section>

</template>

<script lang="js">
import Firebase from '../db.js'

  export default  {
    name: 'home',
    props: [],
    mounted () {
      Firebase.auth.onAuthStateChanged( user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
        
      }
      else {
        this.user.loggedIn = false;
        this.user.data = {};
        this.lanzarError();
      }
    })
    },
    data () {
      return {
        user: {
          loggedIn: false,
          data: {}
        },
      }
    },
    methods: {
      lanzarError(){
      if(!this.authenticated){
        this.$notify({
            group: 'home',
            title: 'Error',
            text: 'No has iniciado sesion!',
            type: 'error'
          });
          setTimeout(300);
      }
    }
    },
    computed: {
      authenticated(){
        return this.user.loggedIn
      }
    }
}


</script>

<style scoped lang="scss">
  @import "../styles/main.css";
  
</style>