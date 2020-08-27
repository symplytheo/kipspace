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
          @click="$router.push('/')"
          style="cursor: pointer"
        >
          <v-img src="/logo.svg"></v-img>
        </v-toolbar-title>
        <span 
          class="primary--text ml-2 font-weight-bold"
          style="margin-bottom: -10px"
        >
          Manager
        </span>

        <v-spacer></v-spacer>

        <span v-if="!isLoggedIn">
          <v-btn
            color="primary"
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
            v-for="(link, l) in links"
            :key="l"
            :to="link.to"
            active-class="link-active"
            style="text-transform: none"
            exact
          >
            {{link.text}}
          </v-btn>

          <v-btn
            color="secondary"
            depressed
            class="hidden-sm-and-down font-weight-bold text-capitalize"
            to="/manager/walk-ins"
          >
            Walk-ins
          </v-btn>
        </span>

        <v-spacer v-if="isLoggedIn"></v-spacer>
        <v-avatar size="48" color="grey lighten-4" v-if="isLoggedIn">
          <v-img src="/img/mcdonald-icon.png" />
        </v-avatar>
        
      </v-app-bar>
    </div>

    <v-container fluid class="pt-0 px-0">
      <v-main>
        <nuxt />
      </v-main>
    </v-container>
    <Footer />

    <!-- Mobile Nav -->
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
          color="secondary"
          depressed
          class="mr-2 font-weight-bold text-capitalize"
          to="/manager/walk-ins"
        >
          Walk-ins
        </v-btn>
      </v-toolbar>

      <v-list v-if="!isLoggedIn">
        <v-list-item link @click="openLogin">
          <v-list-item-title>Log In</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="openRegister">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list v-if="isLoggedIn">
        <v-list-item 
          v-for="(link, n) in links" 
          :key="n"
          :to="link.to"
          exact
        >
          <v-list-item-title>{{link.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <SignIn />
    <SignUp />

  </v-app>
</template>

<script>
import Footer from "~/components/core/Footer";
import SignIn from "~/components/dialog/Login";
import SignUp from "~/components/dialog/Register";

export default {
  components: {
    Footer,
    SignIn,
    SignUp
  },
  data: () => ({
    drawer: false,
    menu: false,
    links: [
      {text: 'Dashboard', to: '/manager'},
      {text: 'Profile', to: '/manager/profile'},
      {text: 'Notifications', to: '/manager/notifications'},
      {text: 'Exit Code', to: '/manager/exit'}
    ]
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    openLogin() {
      this.$store.commit('dialog/openLogin');
    },
    openRegister() {
      this.$store.commit('dialog/openRegister');
    },
    signOut() {
      this.$store.commit('signOut');
    }
  },
  head() {
    return {
      title: 'Dashboard / Facility Manager'
    }
  }
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