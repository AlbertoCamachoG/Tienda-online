<template>
  <div v-if="authenticated">
    <h1 class="title">Novedades</h1>
     <hr class="hr">
    <notifications group="foo" position="top center" height="700"/>
    <div class="productos">

      <div v-if="input" class="anadir">
        <button @click="quitarInput" class="cerrar">X</button>
        <h1>{{product}}</h1>
        <input v-model="cantidad" type="number" min="0" :max='maxi'>
        <label>Total: {{precio}} €</label>
        <button @click="anadirProducto(producto)"><font-awesome-icon :icon="['fas', 'plus']" /></button>
        
      </div>
      <div v-for="producto in productos" v-bind:key="producto.id" class="producto LetraPlano">
        <h1 class="LetraTitulo">{{producto.Nombre}}</h1><hr>
        <img :src=producto.Imagen width="150px" height="100px">
        <br><p>{{producto.Descripcion}}</p><br>
        <p><b>{{producto.Precio}}€/u</b></p>
        <p><b>{{producto.Stock}}</b> Unidades restantes</p> <hr>
        <button @click="anadirInput(producto)" class="comprar"> <font-awesome-icon size="2x" :icon="['fas', 'plus']" /> </button>
      </div>

    </div>
    
  </div>
</template>

<script>
import {db} from '../db.js'
import Firebase from '../db.js'
export default {
  name: 'Novedades',
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
        this.$router.push('/')
      }
    })
  },
  data () {
    return {
      productos:[],
      user: {
          loggedIn: false,
          data: {}
        },
        input:false,
        cantidad:1,
        product:"Lycoris",
        maxi:0
    }
  },
  methods: {
    anadirInput:
        function(coso){
          this.maxi=coso.Stock;
          this.cantidad=1;
          this.input=true;
          this.producto=coso;
          this.product=coso.Nombre
          
        },
        quitarInput:
        function(){
          this.input=false;
        },
      anadirProducto: 
        function(coso){
          if(this.maxi!=0){
            db.collection('carrito').add({
            Producto:coso.Nombre,
            Usuario:this.firstName,
            cantidad:this.cantidad,
            Precio:this.precio
          })
          .then(function() {
            console.log('Exito');
          })
          .catch((error)=> {
            console.log(error);
          });
          this.quitarInput();
          
          this.maxi-=this.cantidad;
          db.collection('productos').doc(coso.Nombre).update({
            Stock:this.maxi
          })
          this.$notify({
            group: 'foo',
            title: 'AÑADIDO AL CARRITO',
            text: 'Se ha realizado la operación con exito'
          });
        }else{
          this.quitarInput();
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: 'No hay suficiente Stock! Comprueba de nuevo mañana!',
            type: 'error'
          });
        }
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
      return this.producto.Precio*this.cantidad;  
    }
  },
  firestore: {
    productos: db.collection('productos').where('Novedad', '==', true)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "../styles/main.css";
  
</style>
