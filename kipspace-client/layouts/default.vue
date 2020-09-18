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
/* Vuetify typography helper classes font-family */
.v-application .display-4,
.v-application .display-3,
.v-application .display-2,
.v-application .display-1,
.v-application .headline,
.v-application .title,
.v-application .subtitle-1,
.v-application .subtitle-2,
.v-application .text-sm-h4,
.v-application .text-h6,
.v-application .text-md-h5,
.v-application .text-h5,
.v-application .text-caption,
.v-application .text-sm-subtitle-1 {
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
