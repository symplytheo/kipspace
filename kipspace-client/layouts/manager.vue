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
          to="/manager/walk-ins"
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

    <v-app-bar app color="white" elevate-on-scroll>
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
        @click="$router.push('/manager')"
      >
        <v-img src="/logo.svg" />
      </v-toolbar-title>
      <v-divider vertical inset class="mx-1" />
      <span class="primary--text subtitle-1 font-weight-bold"> Manager </span>

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
        to="/manager/walk-ins"
        style="text-transform: capitalize"
      >
        Walk-ins
      </v-btn>
      <v-spacer />
      <v-btn icon height="42" width="42" to="/manager/profile">
        <v-avatar size="42">
          <v-img src="/img/mcdonald-icon.png" alt="Kipspace" />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <nuxt />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>
export default {
  middleware: ['authenticated'],
  data: () => ({
    drawer: false,
    links: [
      { text: 'Dashboard', to: '/manager' },
      { text: 'Notifications', to: '/manager/notifications' },
      { text: 'Exit Code', to: '/manager/exit' },
    ],
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    signOut() {
      this.$store.commit('user/logout')
    },
  },
  head() {
    return {
      title: 'Dashboard / Facility Manager',
    }
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
