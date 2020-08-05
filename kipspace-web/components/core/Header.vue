<template>
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
        @click="$router.push('/')"
        style="cursor: pointer"
      >
        <v-img src="/logo.svg"></v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <span v-if="!isLoggedIn">
        <v-btn
          color="primary"
          class="nav-link"
          text
        >
          Help
        </v-btn>

        <v-btn
          color="primary"
          class="mx-1 hidden-sm-and-down nav-link"
          text
          @click="openLogin"
        >
          Login
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="font-weight-bold mx-2 hidden-sm-and-down"
          @click="openRegister"
          style="font-size: 15px"
        >
          Sign Up
        </v-btn>
      </span>

      <span v-if="isLoggedIn">
        <v-btn
          color="primary"
          class="nav-link mr-1 hidden-sm-and-down"
          text
          v-for="(link, l) in navLinks"
          :key="l"
          :to="link.href"
          active-class="link-active"
        >
          {{link.text}}
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="mr-2 hidden-sm-and-down font-weight-bold"
          to="/make-reservation"
        >
          Make Reservation
        </v-btn>
      </span>
      <v-spacer v-if="isLoggedIn"></v-spacer>
      <span v-if="isLoggedIn">
        <v-btn small icon color="primary" class="mr-3" to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn small icon color="primary" to="/notifications">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn 
          class="ml-5" 
          to="/profile" 
          fab
          depressed
          small
        >
          <v-avatar size="46">
            <v-img src="/lamp.jpg" />
          </v-avatar>
        </v-btn>
      </span>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      temporary
      color="primary"
      dark
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon color="white">
          <v-icon size="30"  @click="drawer = false">mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          depressed 
          color="secondary" 
          class="text-capitalize"
          to="/make-reservation"
          v-if="isLoggedIn"
        >Make Reservation</v-btn>
      </v-toolbar>
      <v-list v-if="!isLoggedIn">
        <v-list-item link to="/">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="openLogin">
          <v-list-item-title>Log In</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-btn 
        v-if="!isLoggedIn"
        color="secondary" 
        class="mx-3"
        width="90%"
        depressed
        @click="openRegister"
      >
        Sign Up
      </v-btn>

      <v-list v-if="isLoggedIn">
        <v-list-item 
          v-for="(link, n) in navLinks" 
          :key="n"
          :to="link.href"
        >
          <v-list-item-title>{{link.text}}</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="signOut" v-on:click="drawer = !drawer">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <SignIn />
    <SignUp />
  </div>
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
      { text: 'Home', href: '/'},
      { text: 'My Reservations', href: '/reservations'},
      { text: 'Scan to Exit', href: '/exit'}
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
      openRegister: 'openRegDialog',
      signOut: 'signOut'
    })
  }
}
</script>
<style scoped>
.nav-link {
  font-size: 15px;
  font-weight: bold;
  text-transform: capitalize;
}
.link-active {
  color: #380F4F99!important;
  cursor: default;
}
.link-active:hover {
  opacity: 1!important;
}
.nav-link::before {
  background-color: transparent !important;
}
.nav-link:hover {
  opacity: 0.7;
}
</style>