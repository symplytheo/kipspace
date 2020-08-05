<template>
  <div id="mgr-dashboard">
    <v-container>
      <v-row justify="center">
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" elevation="5">
            <h4 class="mb-10">Open tickets</h4>
            <div class="pt-5">
              300
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" elevation="5">
            <h4 class="mb-10">Closed tickets</h4>
            <div class="pt-5">
              1000
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" color="secondary" dark elevation="5">
            <h4 class="mb-10">Total Clock-ins</h4>
            <div class="pt-5">
              1050
            </div>
          </v-card>
        </v-col>
        <v-col cols="6" sm="5" md="3">
          <v-card class="pa-5" color="primary" dark elevation="5">
            <h4 class="mb-10">Present Capacity</h4>
            <div class="pt-5">
              250
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col>
          <v-card class="pa-5" elevation="5">
            <h4>Weekly Insights</h4>
            <div class="pa-3 px-10">
              <v-sparkline
                :value="[700, 50, 850, 75, 400, 50, 900]"
                padding="8"
                label-size="6"
                auto-line-width
                :labels="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
                class="primary--text"
                :show-labels="true"
                auto-draw
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
export default {
  layout: 'manager'
}
</script>

<style>

</style>