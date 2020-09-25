<template>
  <div>
    <v-toolbar
      color="transparent"
      dense
      class="primary--text my-2"
      elevation="0"
    >
      <v-icon large class="mr-2" color="primary">mdi-office-building</v-icon>
      <v-toolbar-title class="font-weight-bold">
        Facilities <span class="subtitle-2"> ({{ facilities.count }}) </span>
      </v-toolbar-title>
    </v-toolbar>
    <div>
      <v-row justify="center">
        <v-col cols="11" md="12" class="py-0">
          <v-row>
            <v-col
              v-for="(facility, v) in facilities.items"
              :key="v"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <FacilityCard />
            </v-col>
            <v-col cols="12">
              <v-pagination
                :value="1"
                :length="10"
                :total-visible="5"
                class="pagination"
                circle
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import FacilitiesGql from '~/graphql/queries/facilities'

export default {
  layout: 'admin',
  data: () => ({
    facilities: {
      count: 0,
      items: [],
    },
  }),
  apollo: {
    facilities: {
      query: FacilitiesGql,
      prefetch: true,
    },
  },
  head() {
    return {
      title: 'Facilities | Admin',
    }
  },
}
</script>

<style></style>
