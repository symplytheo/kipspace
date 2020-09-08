<template>
  <v-app
    id="homepage"
    :style="
      $vuetify.breakpoint.smAndDown
        ? 'background-image: url(/img/purple-bg-mob.png);'
        : 'background-image: url(/img/purple-bg.png);'
    "
  >
    <!-- Mobile Menu -->
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
          v-show="isLoggedIn"
          depressed
          color="secondary"
          to="/make-reservation"
          class="text-capitalize"
        >
          Make Reservation
        </v-btn>
      </v-toolbar>

      <div v-if="isLoggedIn">
         <v-list >
          <v-list-item v-for="(link, n) in navLinks" :key="n" :to="link.href">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
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
          @click="openRegister"
          color="secondary"
          class="mx-3 text-capitalize"
          width="90%"
          depressed
        >
          Sign Up
        </v-btn>
      </div>
    </v-navigation-drawer>

    <!-- Desktop Navbar -->
    <v-app-bar
      app
      absolute
      height="64"
      color="transparent"
      flat
    >
      <v-btn
        icon
        color="white"
        class="hidden-md-and-up"
        @click="toggleDrawer"
      >
        <v-icon large>mdi-sort-variant</v-icon>
      </v-btn>

      <v-toolbar-title
        style="cursor: pointer"
        @click="$router.push('/')"
        class="pl-1"
      >
        <v-img src="/logo-white.png" alt="Kipspace" />
      </v-toolbar-title>

      <v-spacer />

      <div v-if="isLoggedIn" class="d-flex align-center">
        <v-btn
          v-for="(link, l) in navLinks"
          :key="l"
          color="white"
          class="nav-link mr-1 hidden-sm-and-down subtitle-1 font-weight-bold"
          text
          :to="link.href"
          active-class="link-active"
          style="text-transform: capitalize"
        >
          {{ link.text }}
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="mr-2 subtitle-1 hidden-sm-and-down font-weight-bold"
          to="/make-reservation"
          style="text-transform: capitalize"
        >
          Make Reservation
        </v-btn>

        <v-spacer class="mr-10"/>

        <v-btn
          icon
          height="40"
          width="40"
          color="white"
          class="mr-2"
          to="/search"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon height="40" width="40" color="white" to="/notifications">
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn
          icon
          height="50"
          width="50"
          depressed
          to="/profile"
          class="mx-3"
        >
          <v-avatar size="50">
            <v-img src="/img/lamp.jpg" alt="Kipspace"/>
          </v-avatar>
        </v-btn>
      </div>

      <div v-else>
        <v-btn color="white" class="nav-link" text>
          Help 
        </v-btn>

        <v-btn
          color="white"
          class="mx-1 hidden-sm-and-down nav-link text-capitalize"
          text
          @click="openLogin"
        >
          Login
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="font-weight-bold mx-2 hidden-sm-and-down text-capitalize"
          style="font-size: 15px"
          @click="openRegister"
        >
          Sign Up
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <nuxt />
    </v-main>

    <!-- Footer -->
    <Footer />

    <!-- Dialogs -->
    <SignIn />
    <SignUp />
  </v-app>
</template>

<script>
import SignIn from '~/components/dialog/Login'
import SignUp from '~/components/dialog/Register'
import Footer from '~/components/core/Footer'

export default {
  components: {
    SignIn,
    SignUp,
    Footer,
  },
  data() {
    return {
      drawer: false,
      navLinks: [
        { text: 'Home', href: '/' },
        { text: 'My Reservations', href: '/reservations' },
        { text: 'Scan to Exit', href: '/exit' },
      ],
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    openLogin() {
      this.$store.commit('dialog/openLogin')
    },
    openRegister() {
      this.$store.commit('dialog/openRegister')
    },
    signOut() {
      this.$store.commit('signOut')
    },
  },
}
</script>

<style>
#homepage {
  background-position: top center !important;
  background-size: cover !important;
}
.nav-link::before {
  background-color: transparent !important;
}
.nav-link:hover {
  opacity: 0.8;
}
</style>
