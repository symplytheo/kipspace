<template>
  <div class="pt-3">
    <v-row>
      <v-col
        v-for="(item, i) in alerts"
        :key="i"
        cols="12"
        sm="6"
        lg="4"
        class="py-5"
      >
        <v-card class="px-2">
          <v-row>
            <v-col cols="5" sm="4" class="pb-0 mb-0">
              <v-card
                class="v-sheet--offset mx-auto py-5 text-center"
                color="primary"
                elevation="6"
                width="100%"
              >
                <v-icon size="50" color="white">{{ item.icon }}</v-icon>
              </v-card>
            </v-col>
            <v-col cols="7" sm="8" class="text-right pa-5 pb-0 primary--text">
              <div class="subtitle-1 font-weight-bold text-uppercase">
                {{ item.title }}
              </div>
              <div class="display-1 font-weight-bold">
                {{ item.text }}
              </div>
            </v-col>
          </v-row>
          <v-card-text class="px-0 pt-0">
            <v-divider></v-divider>
            <div class="pt-2">
              <v-icon left small color="primary">mdi-clock</v-icon>
              Updated at {{ Math.ceil(Math.random() * 6) }} minutes ago
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FacilitiesGql from '~/graphql/queries/facilities'
import CategoriesGql from '~/graphql/queries/categories'
import UsersGql from '~/graphql/queries/users'

export default {
  layout: 'admin',
  data: () => ({
    categories: {
      count: 0,
      items: [],
    },
    users: {
      count: 0,
      items: [],
    },
    facilities: {
      count: 0,
      items: [],
    },
  }),
  apollo: {
    categories: {
      query: CategoriesGql,
      prefetch: true,
    },
    users: {
      query: UsersGql,
      prefetch: true,
    },
    facilities: {
      query: FacilitiesGql,
      prefetch: true,
    },
  },
  computed: {
    alerts() {
      return [
        {
          title: 'Categories',
          text: this.categories.count,
          icon: 'mdi-tag-multiple',
        },
        {
          title: 'Facilities',
          text: this.facilities.count,
          icon: 'mdi-office-building',
        },
        {
          title: 'Users',
          text: this.users.count,
          icon: 'mdi-account-multiple',
        },
      ]
    },
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>

<style scoped>
.v-sheet--offset {
  top: -30px;
  position: relative;
}
</style>
