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
export default {
  components: {
    Header: () => import('~/components/core/Header'),
    Footer: () => import('~/components/core/Footer')
  }
}
</script>
<style>
#app, .v-application {
   font-family: 'Raleway', Arial;
 }
 .v-application .v-btn {
   text-transform: none;
 } 
</style>