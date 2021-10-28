<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <component-footer-menu/>
  </v-app>
</template>

<script>
import componentFooterMenu from './components/component-footer-menu.vue';

export default {
  components: { componentFooterMenu },
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    let setPropertyId = this.$route.params.propertyId || "lux"
    this.$store.commit('setPropertyId', setPropertyId)
    this.$store.dispatch('getProperty')
    this.$store.dispatch('getInstructions')
  }  
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.pointer {
  cursor: pointer;
}

body,
.v-application,
.v-application .text-md-body-1{
  font-family:"Circular Std"!important;
}

.v-application .v-card__subtitle, .v-application .v-card__text, .v-application .v-card__title {
	padding: 20px;
}
.v-application .v-card__text{
  font-size:1rem;
  line-height:1.5;
}

.v-sheet.v-card {
	border-radius: 16px!important;
}

@font-face {
    font-family: 'Circular Std Book';
    src: url('assets/fonts/CircularStd-Book.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Circular Std';
    src: url('assets/fonts/CircularStd-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Circular Std';
    src: url('assets/fonts/CircularStd-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}
</style>
