<template>
  <v-app id="homepage">
    <v-app-bar
      app
      absolute
      flat
      height="64"
      color="rgba(0,0,0,0)"
      class="px-md-10"
    >
      <v-btn 
        icon 
        color="white" 
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

      <span v-if="!isLoggedIn">
        <v-btn
          color="white"
          class="mr-2 nav-link"
          text
        >
          Help
        </v-btn>

        <v-btn
          color="white"
          class="mr-2 hidden-sm-and-down nav-link"
          text
          @click="openLogin"
        >
          Login
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="text-capitalize font-weight-bold mx-3 hidden-sm-and-down"
          @click="openRegister"
          style="font-size: 15px"
        >
          Sign up
        </v-btn>
      </span>

      <span v-if="isLoggedIn">
        <v-btn
          color="white"
          class="nav-link mr-2 hidden-sm-and-down"
          text
          v-for="(link, l) in navLinks"
          :key="l"
          :to="link.href"
        >
          {{link.text}}
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="text-capitalize mx-2 hidden-sm-and-down font-weight-bold"
          to="/make-reservation"
        >
          Make reservation
        </v-btn>
      </span>
      <v-spacer v-if="isLoggedIn"></v-spacer>
      <span v-if="isLoggedIn">
        <v-btn small icon color="white" class="mx-2" to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn small icon color="white" class="mr-4 mr-lg-0" to="/notifications">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-avatar size="40" class="mx-lg-5">
          <v-img src="/lamp.jpg" />
        </v-avatar>
      </span>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <nuxt />
    </v-main>

    <!-- Footer -->
    <Footer />

    <!--Mobile Drawer-->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      floating
      temporary
    >
      
    </v-navigation-drawer>

    <!-- Dialogs -->
    <SignIn />
    <SignUp />
  </v-app>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  components: {
    SignIn: () => import('~/components/dialog/Login'),
    SignUp: () => import('~/components/dialog/Register'),
    Footer: () => import('~/components/core/Footer')
  },
  data: () => ({
    drawer: false,
    navLinks: [
      { text: 'home', href: '/'},
      { text: 'my reservations', href: '/reservations'},
      { text: 'profile', href: '/profile'}
    ]
  }),
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
  ...mapMutations({
      openLogin: 'openLoginDialog',
      openRegister: 'openRegDialog'
    })
  }
}
</script>
<style>
.nav-link {
  font-size: 15px;
  font-weight: bold;
  text-transform: capitalize;
}
.nav-link::before {
  background-color: transparent !important;
}
.nav-link:hover {
  opacity: 0.7;
}

</style>