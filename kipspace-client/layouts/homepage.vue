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
      </v-toolbar>

      <div v-if="isLoggedIn">
        <v-list nav>
          <v-list-item
            v-for="(link, n) in navLinks"
            :key="n"
            :to="link.href"
            exact
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
          <v-list-item class="pl-0">
            <v-btn
              depressed
              block
              color="secondary"
              to="/categories"
              class="text-capitalize"
            >
              Make Reservation
            </v-btn>
          </v-list-item>
        </v-list>
      </div>

      <div v-else>
        <v-list nav>
          <v-list-item link to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/account/login">
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item>
          <v-list-item class="pl-0">
            <v-btn
              color="secondary"
              class="text-capitalize"
              block
              depressed
              to="/account/register"
            >
              Sign Up
            </v-btn>
          </v-list-item>
        </v-list>
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
          exact
        >
          {{ link.text }}
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="mr-2 hidden-sm-and-down subtitle-1 font-weight-bold"
          to="/categories"
          active-class="mkr-active"
          style="text-transform: capitalize"
        >
          Make Reservation
        </v-btn>
      </div>

      <v-spacer />
      <div v-if="isLoggedIn">
        <v-btn icon height="36" width="36" color="white" to="/search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          icon
          height="36"
          width="36"
          color="white"
          class="mx-sm-3"
          to="/account/notifications"
        >
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-menu offset-y min-width="250" open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn icon height="42" width="42" v-on="on">
              <v-avatar
                size="42"
                color="white"
                class="headline primary--text font-weight-bold text-uppercase"
              >
                <v-img v-if="user.avatar" :src="user.avatar" />
                <span v-else>
                  {{
                    getInitials(user.firstname ? user.firstname : user.email)
                  }}
                </span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card color="white">
            <!-- User Faciities' Link -->
            <v-list
              v-show="user.facilities"
              light
              color="grey lighten-5"
              class="pa-0"
            >
              <v-list-item
                v-for="(item, f) in user.facilities"
                :key="f"
                :to="`/account/facilities/${item._id}`"
                style="border-bottom: 1px solid #ccc"
              >
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 text-capitalize">
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="subtitle-2">
                    Go to Dashboard
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- User profile menu -->
            <v-list class="pa-0">
              <v-list-item to="/account/profile">
                <v-list-item-title>My Profile</v-list-item-title>
              </v-list-item>
              <v-list-item to="/account/change-password">
                <v-list-item-title>Change password</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-btn
                  block
                  color="secondary"
                  class="text-capitalize"
                  width="90%"
                  depressed
                  @click="signOut()"
                >
                  Logout
                </v-btn>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>

      <div v-else>
        <v-btn
          color="white"
          class="nav-link text-capitalize subtitle-1 font-weight-bold"
          text
        >
          Help
        </v-btn>

        <v-btn
          color="white"
          class="mx-1 hidden-sm-and-down subtitle-1 nav-link font-weight-bold"
          text
          style="text-transform: capitalize"
          to="/account/login"
        >
          Login
        </v-btn>

        <v-btn
          color="secondary"
          depressed
          class="font-weight-bold mx-2 subtitle-1 hidden-sm-and-down"
          style="text-transform: capitalize"
          to="/account/register"
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
  </v-app>
</template>

<script>
import getInitials from '~/utils/getInitials'

export default {
  data() {
    return {
      drawer: false,
      navLinks: [
        { text: 'Home', href: '/' },
        { text: 'My Reservations', href: '/account/reservations' },
      ],
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.authenticated
    },
    user() {
      return this.$store.state.user.profile
    },
  },
  methods: {
    getInitials,
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    async signOut() {
      await this.$apolloHelpers.onLogout().then(() => {
        this.$store.commit('user/setUser', null)
        this.$store.commit('snackbar/show', {
          text: 'Logged out successfully',
          icon: 'success',
        })
        this.$router.replace('/')
      })
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
