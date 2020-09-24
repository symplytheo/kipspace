<template>
  <div>
    <v-container>
      <v-toolbar flat>
        <v-toolbar-title class="font-weight-bold primary--text">
          {{ facility.name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-row justify="center">
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" elevation="5">
            <h4 class="mb-10">Open tickets</h4>
            <div class="pt-5">300</div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" elevation="5">
            <h4 class="mb-10">Closed tickets</h4>
            <div class="pt-5">1000</div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" color="secondary" dark elevation="5">
            <h4 class="mb-10">Total Clock-ins</h4>
            <div class="pt-5">1050</div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" color="primary" dark elevation="5">
            <h4 class="mb-10">Present Capacity</h4>
            <div class="pt-5">{{ facility.capacity }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row justify="center">
        <!-- Mobile -->
        <v-col cols="12" sm="10" class="hidden-md-and-up">
          <v-card class="pa-5" elevation="5">
            <h4>Weekly Insights</h4>
            <div class="pa-3 px-10">
              <v-sparkline
                :value="[700, 50, 850, 75, 400, 50, 900]"
                padding="8"
                label-size="10"
                auto-line-width
                :labels="['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']"
                class="primary--text"
                :show-labels="true"
                type="bar"
              ></v-sparkline>
            </div>
          </v-card>
        </v-col>

        <!-- Desktop -->
        <v-col cols="12" class="hidden-sm-and-down">
          <v-card class="pa-5" elevation="5">
            <h4>Weekly Insights</h4>
            <div class="pa-3 px-10">
              <v-sparkline
                :value="[700, 50, 850, 75, 400, 50, 900]"
                padding
                label-size="5"
                line-width="24"
                :labels="[
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ]"
                class="primary--text"
                :show-labels="true"
                type="bar"
              ></v-sparkline>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserFacilityGql from '~/graphql/queries/user-facility'

export default {
  layout: 'manager',
  data: () => ({
    facility: {
      name: '',
      capacity: 0,
    },
  }),
  apollo: {
    facility: {
      query: UserFacilityGql,
      variables() {
        return {
          _id: this.$route.params.id,
        }
      },
    },
  },
  head() {
    const text = this.facility.name + ' | Dashboard'
    const title = text.replace(/^\w|\s\w/g, (w) => w.toUpperCase())
    return {
      title,
    }
  },
}
</script>

<style></style>
