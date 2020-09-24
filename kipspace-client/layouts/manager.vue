<template>
  <v-app id="mgr">
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
          color="secondary"
          depressed
          class="mr-2 font-weight-bold text-capitalize"
          :to="`/account/facilities/${id}/walk-ins`"
        >
          Walk-ins
        </v-btn>
      </v-toolbar>
      <v-list nav>
        <v-list-item v-for="(link, n) in links" :key="n" :to="link.to" exact>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
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
        <v-icon size="32"> mdi-sort-variant </v-icon>
      </v-btn>

      <v-toolbar-title
        style="cursor: pointer"
        class="pl-0 ml-1"
        @click="$router.push(`/account/facilities/${id}`)"
      >
        <v-img src="/logo.svg" />
      </v-toolbar-title>
      <v-divider vertical inset class="mx-1" />
      <span class="primary--text font-weight-bold"> Manager </span>

      <v-spacer />

      <v-btn
        v-for="(link, l) in links"
        :key="l"
        color="primary"
        class="nav-link mr-1 hidden-sm-and-down subtitle-1 font-weight-bold"
        text
        :to="link.to"
        active-class="link-active"
        style="text-transform: capitalize"
        exact
      >
        {{ link.text }}
      </v-btn>

      <v-btn
        color="secondary"
        depressed
        class="hidden-sm-and-down font-weight-bold subtitle-1"
        :to="`/account/facilities/${id}/walk-ins`"
        style="text-transform: capitalize"
      >
        Walk-ins
      </v-btn>
      <v-spacer />
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
                {{ getInitials(user.firstname ? user.firstname : user.email) }}
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
              active-class="primary white--text"
            >
              <v-list-item-content>
                <v-list-item-title class="subtitle-1 text-capitalize">
                  {{ item.name }}
                </v-list-item-title>
                <div class="subtitle-2">Go to Dashboard</div>
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
  middleware: ['authenticated'],
  data() {
    return {
      id: this.$route.params.id,
      drawer: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user.profile
    },
    links() {
      return [
        { text: 'Dashboard', to: `/account/facilities/${this.id}` },
        { text: 'Profile', to: `/account/facilities/${this.id}/profile` },
        {
          text: 'Notifications',
          to: `/account/facilities/${this.id}/notifications`,
        },
        { text: 'Exit Code', to: `/account/facilities/${this.id}/exit` },
      ]
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
        this.$router.go('/')
      })
    },
  },
}
</script>

<style>
#mgr .link-active {
  color: #380f4f99 !important;
  cursor: default;
}
#mgr .link-active:hover {
  opacity: 1 !important;
}
#mgr .nav-link::before {
  background-color: transparent !important;
}
#mgr .nav-link:hover {
  opacity: 0.7;
}
#mgr .v-btn--fab.v-size--default {
  height: 46px;
}
</style>
