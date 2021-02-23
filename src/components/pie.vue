<template lang="html">

  <section class="bg">
    <section class="footer">
      <div class="LetraPlano">
        <h3 class="LetraTitulo">NECESITAS AYUDA?</h3>
        <a href="https://www.pinterest.es/pin/332070172516961353/"><p>Ayuda</p></a>
      </div>
      <div class="LetraPlano">
        <h3 class="LetraTitulo">MAS SOBRE PLANTAS</h3>
        <a href="https://www.ecologiaverde.com/22-flores-de-primavera-2594.html"><p>Flores de Primavera</p></a>
        <a href="https://www.jardineriaon.com/flores-de-verano.html"><p>Flores de Verano</p></a>
        <a href="https://www.lolaflora.es/blog/6-flores-de-otono/"><p>Flores de Otoño</p></a>
        <a href="https://www.hogarmania.com/jardineria/mantenimiento/plantas/flores-invierno-45473.html"><p>Flores de Invierno</p></a>
      </div>
      <div class="LetraPlano">
        <h3 class="LetraTitulo">SOBRE NOSOTROS</h3>
        <a href="https://github.com/AlbertoCamachoG"><p>Github</p></a>
        <p></p>
      </div>
    </section>
    <hr>
    <div class="footer">
      <div class="field">
        <a class="sns-btn sns-btn--twitter"  href="https://www.twitter.com" target="_blank">
          <font-awesome-icon size="2x" :icon="['fab', 'twitter']" />
        </a>	
        <a class="sns-btn sns-btn--facebook"  href="https://www.facebook.com" target="_blank">
          <font-awesome-icon size="2x" :icon="['fab', 'facebook-f']" />
        </a>
        <a class="sns-btn sns-btn--instagram" href="https://www.instagram.com" target="_blank">
          <font-awesome-icon size="2x" :icon="['fab', 'instagram']" />
        </a>
      </div>
      
    </div>
    <br>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'pie',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  @import "../styles/main.css";
</style>
