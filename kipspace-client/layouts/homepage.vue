<template>
  <v-app
    class="homepage"
    :style="
      $vuetify.breakpoint.smAndDown
        ? 'background-image: url(/img/purple-bg-mob.png);'
        : 'background-image: url(/img/purple-bg.png);'
    "
  >
    <v-app-bar
      app
      absolute
      height="64"
      color="transparent"
      class="px-lg-10"
      flat
    >
      <v-btn
        icon
        color="white"
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      >
        <v-icon large>mdi-sort-variant</v-icon>
      </v-btn>

      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        <v-img src="/logo-white.png" alt="Kipspace"></v-img>
      </v-toolbar-title>

      <v-spacer />

      <div v-if="!isLoggedIn">
        <v-btn color="white" class="nav-link" text> Help </v-btn>

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

      <div v-if="isLoggedIn">
        <v-btn
          v-for="(link, l) in navLinks"
          :key="l"
          color="white"
          class="nav-link mr-1 hidden-sm-and-down"
          text
          :to="link.href"
          active-class="link-active"
          style="text-transform: none"
        >
          {{ link.text }}
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="mr-2 hidden-sm-and-down font-weight-bold text-capitalize"
          to="/make-reservation"
          style="font-size: 15px"
        >
          Make Reservation
        </v-btn>
      </div>

      <v-spacer v-if="isLoggedIn" />

      <div v-if="isLoggedIn">
        <v-btn small icon color="white" class="mr-3" to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn small icon color="white" to="/notifications">
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-avatar size="48" color="grey lighten-5" style="cursor: pointer">
          <v-img src="/img/lamp.jpg" />
        </v-avatar>
      </div>
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
      app
      floating
      temporary
      color="primary"
      dark
    >
      <v-toolbar color="transparent" flat>
        <v-btn icon color="white" @click="drawer = false">
          <v-icon size="30">mdi-close</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="isLoggedIn"
          depressed
          color="secondary"
          to="/make-reservation"
          class="text-capitalize"
        >
          Make Reservation
        </v-btn>
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
        class="mx-3 text-capitalize"
        width="90%"
        depressed
        @click="openRegister"
      >
        Sign Up
      </v-btn>
      <v-list v-if="isLoggedIn">
        <v-list-item v-for="(link, n) in navLinks" :key="n" :to="link.href">
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="signOut">
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
.homepage {
  background-position: top center !important;
  background-size: cover !important;
}
.nav-link {
  font-size: 15px;
  font-weight: bold;
}
.nav-link::before {
  background-color: transparent !important;
}
.nav-link:hover {
  opacity: 0.8;
}
</style>
