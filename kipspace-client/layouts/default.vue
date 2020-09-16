<template>
  <v-app>
    <Header />
    <v-main>
      <nuxt />
      <Snackbar />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {}
</script>
<style>
#app,
.v-application {
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
}
.logo {
  font-family: 'Nunito';
  text-decoration: none;
  font-weight: 900;
  font-style: normal;
}
/* Vuetify typography helper classes font-family */
.v-application .display-4,
.v-application .display-3 {
  font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}
.v-application .display-2,
.v-application .display-1 {
  font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}
.v-application .headline,
.v-application .title {
  font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}
.v-application .subtitle-1,
.v-application .subtitle-2 {
  font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}

#app .v-btn {
  text-transform: none !important;
}
.pagination .v-pagination__item,
.pagination .v-pagination__navigation {
  border-radius: 0;
  box-shadow: none;
  background: transparent !important;
}
.pagination .v-pagination__item--active {
  background: transparent !important;
  color: #ea3788 !important;
}
.v-app-bar--fixed.v-app-bar--hide-shadow.white > .v-toolbar__content {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
