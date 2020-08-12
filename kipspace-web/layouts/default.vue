<template>
  <v-app>
    <Header />
    <v-container fluid class="pt-0">
      <v-main>
        <nuxt />
      </v-main>
    </v-container>
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
  font-family: 'Poppins', sans-serif
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
</style>