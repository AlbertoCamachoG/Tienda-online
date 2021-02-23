<template lang="html">

  <section class="cont">
    <notifications group="compra" position="top center" height="700"/>
    <div v-for="producto in query" v-bind:key="producto.id" class="carrito">
        <p><b>{{producto.Producto}}</b></p>
        <p>{{producto.Usuario}}</p>
        <p><b>{{producto.cantidad}}</b> Unidades</p>
        <p>{{producto.Precio}}€</p>
        <p><button @click=borrarCarro(producto)>Borrar</button></p><hr class="barra">
    </div>
    <div class="back">
    <div @click=borrarTodo() class="button_base b10_tveffect">
        <div>Confirmar Compra</div>
        <div>
            <div>Confirmar Compra</div>
            <div>Confirmar Compra</div>
            <div>Confirmar Compran</div>
        </div>
    </div>
</div>
  </section>

</template>

<script lang="js">
  import {db} from '../db.js'
  import Firebase from '../db.js'
    export default  {
    name: 'carrito',
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
        carritos:[],
        productos:[],
        user: {
          loggedIn: false,
          data: {}
        },

      }
    },
    methods: {
      borrarCarro(producto){
        var st=this.productos.filter(fl=>fl.Nombre==producto.Producto);
        db.collection('carrito')
        .doc(producto.id)
        .delete();
        st=st[0].Stock+producto.cantidad;
        db.collection('productos').doc(producto.Producto).update({
            Stock:st
          })
      },
      borrarTodo(){
        if(this.query.length>0){
          this.query.forEach(element => {
          db.collection('carrito')
          .doc(element.id)
          .delete()
        });     
        this.$notify({
            group: 'compra',
            title: 'COMPRADO',
            text: 'Se ha realizado la operación con exito'
          });  
        }else{
          this.$notify({
            group: 'compra',
            title: 'CARRO VACIO',
            type:'error',
            text: 'Por favor introduce elementos en el carrito para continuar'
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
      query(){
        return this.carritos.filter(q=>q.Usuario==this.firstName)
      }
    },
    firestore: {
      carritos: db.collection('carrito'),
      productos: db.collection('productos')
    }
}


</script>

<style scoped lang="scss">
  @import "../styles/main.css";
  
</style>
