<template>
  <div id="navbar">

    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      temporary
      color="primary"
      dark
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon color="white" @click="toggleDrawer">
          <v-icon size="30">mdi-close</v-icon>
        </v-btn>

        <v-spacer />

        <v-btn 
          depressed
          color="secondary"
          class="text-capitalize"
          to="/make-reservation"
          v-show="isLoggedIn"
          active-class="mkr-active"
        >
          Make Reservation
        </v-btn>
      </v-toolbar>
      
      <div v-if="isLoggedIn">
        <v-list >
          <v-list-item 
            v-for="(link, n) in navLinks" 
            :key="n"
            :to="link.href"
          >
            <v-list-item-title>{{link.text}}</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="signOut">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <div v-else>
        <v-list>
          <v-list-item link to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="openLogin">
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-btn 
          color="secondary" 
          class="mx-3 text-capitalize"
          width="90%"
          depressed
          @click="openRegister"
        >
          Sign Up
        </v-btn>
      </div>
      
    </v-navigation-drawer>

    <v-app-bar
      app
      height="64"
      color="white"
      elevate-on-scroll
    >
      <v-btn 
        icon 
        color="primary" 
        class="hidden-md-and-up mr-2"
        @click="toggleDrawer"
      >
        <v-icon large>mdi-sort-variant</v-icon>
      </v-btn>

      <v-toolbar-title 
        @click="$router.push('/')"
        style="cursor: pointer"
      >
        <v-img src="/logo.svg" />
      </v-toolbar-title>

      <v-spacer />

      <div v-if="isLoggedIn" class="d-flex align-center">
        <v-btn
          color="primary"
          class="nav-link mr-1 hidden-sm-and-down subtitle-1 font-weight-bold"
          text
          v-for="(link, l) in navLinks"
          :key="l"
          :to="link.href"
          active-class="link-active"
          style="text-transform: capitalize"
        >
          {{link.text}}
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="mr-2 hidden-sm-and-down subtitle-1 font-weight-bold"
          to="/make-reservation"
          active-class="mkr-active"
          style="text-transform: capitalize"
        >
          Make Reservation
        </v-btn>

        <v-spacer class="mr-10"/>

        <v-btn small icon color="primary" class="mr-3" to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn small icon color="primary" to="/notifications">
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn
          fab
          depressed
          to="/profile"
          class="mx-3"
        >
          <v-avatar size="46">
            <v-img src="/img/lamp.jpg" />
          </v-avatar>
        </v-btn>
      </div>

      <div v-else>
        <v-btn
          color="primary"
          class="nav-link text-capitalize subtitle-1 font-weight-bold"
          text
        >
          Help
        </v-btn>

        <v-btn
          color="primary"
          class="mx-1 hidden-sm-and-down subtitle-1 nav-link font-weight-bold"
          text
          @click="openLogin"
          style="text-transform: capitalize"
        >
          Login
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="font-weight-bold mx-2 subtitle-1 hidden-sm-and-down"
          @click="openRegister"
          style="text-transform: capitalize"
        >
          Sign Up
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Dialogs -->
    <SignIn />
    <SignUp />

  </div>
</template>

<script>
import SignIn from '~/components/dialog/Login';
import SignUp from '~/components/dialog/Register'

export default {
  name: "Header",
  components: {
    SignIn,
    SignUp
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
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    openLogin() {
      this.$store.commit('dialog/openLogin');
    },
    openRegister() {
      this.$store.commit('dialog/openRegister');
    },
    signOut() {
      this.$store.commit('signOut');
    }
  }
}
</script>
<style scoped>
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
.mkr-active {
  opacity: 0.8; 
}

#navbar .v-btn--fab.v-size--default {
  height: 46px 
}

</style>