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
        <v-list>
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

    <!-- Desktop Navbar -->
    <v-app-bar app absolute color="transparent" flat>
      <v-btn
        icon
        height="36"
        width="36"
        color="white"
        class="hidden-md-and-up"
        @click="toggleDrawer"
      >
        <v-icon size="32">mdi-sort-variant</v-icon>
      </v-btn>

      <v-toolbar-title
        style="cursor: pointer"
        class="pl-0 ml-1"
        @click="$router.push('/')"
      >
        <v-img src="/logo-white.png" />
      </v-toolbar-title>

      <v-spacer />

      <div v-if="isLoggedIn">
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
          class="mr-2 hidden-sm-and-down subtitle-1 font-weight-bold"
          to="/make-reservation"
          active-class="mkr-active"
          style="text-transform: capitalize"
        >
          Make Reservation
        </v-btn>
      </div>

      <v-spacer />
      <div v-if="isLoggedIn">
        <v-btn icon height="36" width="36" color="white" class="" to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon height="36" width="36" color="white" to="/notifications">
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn icon height="42" width="42" to="/profile">
          <v-avatar size="42">
            <v-img src="/img/mcdonald-icon.png" alt="Kipspace" />
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
          style="text-transform: capitalize"
          @click="openLogin"
        >
          Login
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="font-weight-bold mx-2 subtitle-1 hidden-sm-and-down"
          style="text-transform: capitalize"
          @click="openRegister"
        >
          Sign Up
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <nuxt />
      <Snackbar />
    </v-main>

    <!-- Footer -->
    <Footer />

    <!-- Dialogs -->
    <Login />
    <Register />
  </v-app>
</template>

<script>
export default {
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
      return this.$store.getters['user/isLoggedIn']
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
