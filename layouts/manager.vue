<template>
  <v-app id="mgr">
    <div style="border-bottom: 1px solid #D1D1D1; margin-top: 64px">
      <v-app-bar
        app
        height="64"
        color="white"
        class="px-lg-10"
        elevate-on-scroll
      >
        <v-btn 
          icon 
          color="primary" 
          class="hidden-md-and-up"
          @click="drawer = !drawer"
        >
          <v-icon large>mdi-sort-variant</v-icon>
        </v-btn>

        <v-toolbar-title 
          class="ml-lg-10"
          @click="$router.push('/')"
          style="cursor: pointer"
        >
          <v-img src="/logo.svg"></v-img>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        
        <v-btn
          color="primary"
          class="nav-link mr-2 hidden-sm-and-down"
          text
          v-for="(link, l) in links"
          :key="l"
          :to="link.to"
          active-class="link-active"
        >
          {{link.text}}
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="text-capitalize mx-2 hidden-sm-and-down font-weight-bold"
          to="/manager/walk-ins"
        >
          Walk-ins
        </v-btn>

        <v-spacer></v-spacer>
        <v-avatar size="40" class="mx-5">
          <v-img src="/lamp.jpg" />
        </v-avatar>
      </v-app-bar>
    </div>

    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  components: {
    Footer: () => import('~/components/core/Footer')
  },
  data: () => ({
    links: [
      {text: 'Dashboard', to: '/manager/dashboard'},
      {text: 'Notifications', to: '/manager/notifications'},
      {text: 'Profile', to: '/manager/profile'},
      {text: 'Exit Code', to: '/manager/exit'}
    ]
  })
}
</script>

<style>
#mgr .nav-link {
  font-size: 15px;
  font-weight: bold;
  text-transform: capitalize;
}
#mgr .link-active {
  color: #380F4F99!important;
  cursor: default;
}
#mgr .link-active:hover {
  opacity: 1!important;
}
#mgr .nav-link::before {
  background-color: transparent !important;
}
#mgr .nav-link:hover {
  opacity: 0.7;
}
</style>