<template>
  <v-app>
    <Header />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "~/components/core/Header";
import Footer from "~/components/core/Footer";

export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style>
#app, .v-application {
  font-family: 'Poppins', Arial, Helvetica, sans-serif
}

/* Vuetify typography helper classes font-family */
.v-application .display-4, .v-application .display-3{
  font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}
.v-application .display-2, .v-application .display-1{
  font-family: 'Poppins', Arial, Helvetica, sans-serif!important;
}
.v-application .headline, .v-application .title{
  font-family: 'Poppins', Arial, Helvetica, sans-serif!important;
}
.v-application .subtitle-1, .v-application .subtitle-2{
  font-family: 'Poppins', Arial, Helvetica, sans-serif!important;
}

#app .v-btn {
  text-transform: none !important;
} 
.pagination .v-pagination__item, .pagination .v-pagination__navigation {
  border-radius: 0;
  box-shadow: none;
  background: transparent!important;
}
.pagination .v-pagination__item--active {
  background: transparent!important;
  color: #EA3788!important;
}
.v-app-bar--fixed.v-app-bar--hide-shadow.white > .v-toolbar__content {
  border-bottom: 1px solid rgba(0,0,0,0.12)
}
</style>