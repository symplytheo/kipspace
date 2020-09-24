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
          v-show="isLoggedIn"
          depressed
          color="secondary"
          class="text-capitalize"
          to="/categories"
          active-class="mkr-active"
        >
          Make Reservation
        </v-btn>
      </v-toolbar>

      <div v-if="isLoggedIn">
        <v-list dark nav>
          <v-list-item v-for="(link, n) in navLinks" :key="n" :to="link.href">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>

      <div v-else>
        <v-list>
          <v-list-item link to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/account/login">
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-btn
          color="secondary"
          class="mx-3 text-capitalize"
          width="90%"
          depressed
          to="/account/register"
        >
          Sign Up
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar app color="white" hide-on-scroll :elevation="1">
      <v-btn
        icon
        height="36"
        width="36"
        color="primary"
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
        <v-img src="/logo.svg" />
      </v-toolbar-title>

      <v-spacer />

      <div v-if="isLoggedIn">
        <v-btn
          v-for="(link, l) in navLinks"
          :key="l"
          color="primary"
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
        <v-btn
          icon
          height="36"
          width="36"
          color="primary"
          class=""
          to="/search"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn
          icon
          height="36"
          width="36"
          class="mx-sm-3"
          color="primary"
          to="/account/notifications"
        >
          <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-menu offset-y min-width="250" open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn icon height="42" width="42" v-on="on">
              <v-avatar
                size="42"
                color="primary"
                class="headline white--text font-weight-bold text-uppercase"
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
  </div>
</template>

<script>
import getInitials from '~/utils/getInitials'

export default {
  data: () => ({
    drawer: false,
    navLinks: [
      { text: 'Home', href: '/' },
      { text: 'My Reservations', href: '/account/reservations' },
      { text: 'Scan to Exit', href: '/exit' },
    ],
  }),
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
        this.$router.go(0)
      })
    },
  },
}
</script>
<style scoped>
.link-active {
  color: #380f4f99 !important;
  cursor: default;
}
.link-active:hover {
  opacity: 1 !important;
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
</style>
