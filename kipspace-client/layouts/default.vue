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
  font-family: 'Poppins', 'Roboto', sans-serif
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