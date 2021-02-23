<template lang="html">

  <header>
    <notifications group="home" position="top center" height="700"/>
    <div class="cabecera">
      <div class="logo">
        <router-link class="link" :to="'/'"><font-awesome-icon class="logoVector" size="3x" :icon="['fab', 'canadian-maple-leaf']" /></router-link>
        <p>Has iniciado sesión como: {{firstName}}</p>
      </div>
      <div class="pro">
        <router-link class="tiend-link" :to="{ name: 'Main',params:{}, props: { 'auth': 'true' } }"><font-awesome-icon size="2x" :icon="['fas', 'shopping-bag']" /> </router-link>
        <p>Hay {{numero}} pedidos por valor de {{precio}}€</p></div>
      <div class="carro">
        <button v-if="!authenticated" @click="login">Iniciar Sesión</button>
        <button v-if="authenticated" @click="logout">Cerrar Sesión</button>
        <router-link class="link" :to="'/carro'"><font-awesome-icon size="2x" :icon="['fas', 'shopping-cart']" /></router-link>
      </div>
    </div>
  </header>
  
</template>
<script lang="js">

import Firebase from '../db.js';
import {db} from '../db.js'

  export default  {
    name: 'Cabecera',
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
        }
      })
    
    },
    data () {
      return {
        carritos:[],
        user: {
          loggedIn: false,
          data: {}
        }
        
      }
    },
    methods: {
      login() {
        if(Firebase.login())
          this.$notify({
            group: 'home',
            title: 'login',
            text: 'Se ha realizado la operación con exito'
          });
      },
      logout() {
        Firebase.logout()
        this.$notify({
          group: 'home',
          title: 'logout',
          text: 'Se ha cerrado sesión con exito'
        });
      }
    },
    computed: {
      authenticated(){
          return this.user.loggedIn
      },
      firstName(){
        if (this.user.data.displayName) {
          return this.user.data.displayName.split(' ')[0]
        }
        return null
      },
      precio(){
        var arr=this.carritos.filter(q=>q.Usuario==this.firstName);
        var n=0;
        arr.forEach(el=> {
          n+=el.Precio;
        })
        return n
      },
      numero(){
        var arr=this.carritos.filter(q=>q.Usuario==this.firstName);
        return arr.length;
      }
    },
    filters: {
      mayus(nombre){
        if(nombre)
          return nombre.toUpperCase();
      }
    },
    firestore: {
      carritos: db.collection('carrito')
    }
}


</script>

<style scoped lang="scss">
  @import "../styles/main.css";
</style>
