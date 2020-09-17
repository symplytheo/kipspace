<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      mobile-breakpoint="960"
      color="primary"
      dark
      hide-overlay
      app
    >
      <v-list dark nav>
        <v-list-item v-for="(item, i) in links" :key="i" :to="item.to" exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left app height="64" color="white">
      <v-btn
        icon
        color="primary"
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      >
        <v-icon large>mdi-sort-variant</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-2">
        <v-img src="/logo.svg" />
      </v-toolbar-title>
      <v-divider vertical inset class="mx-2" />
      <span class="primary--text title font-weight-bold"> Admin </span>
    </v-app-bar>

    <!-- content -->
    <v-main>
      <v-container fluid class="pt-0">
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <v-container fluid>
        <span>&copy; {{ new Date().getFullYear() }}</span>
        <a href="/" style="text-decoration: none" class="pl-2">Kipspace</a>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/admin',
        },
        {
          icon: 'mdi-tag-multiple',
          title: 'Categories',
          to: '/admin/category',
        },
        {
          icon: 'mdi-office-building',
          title: 'Facilities',
          to: '/admin/facility',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Users',
          to: '/admin/users',
        },
      ],
    }
  },
}
</script>
