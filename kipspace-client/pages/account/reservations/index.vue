<template>
  <div id="reservations">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <div v-if="activeR">
            <v-card class="pa-5" flat color="primary" dark>
              <h3>Active Reservations</h3>
              <v-divider />
              <v-row justify="center" align="end">
                <v-col cols="12" sm="11" class="pa-0 pt-2">
                  <v-row align="center">
                    <v-col cols="auto" class="py-0">{{
                      activeR.date_reserved.substr(0, 10)
                    }}</v-col>
                    <v-col cols="auto" class="py-0">{{
                      activeR.time_reserved
                    }}</v-col>
                    <v-col cols="auto" class="py-0">
                      <v-icon>mdi-account-multiple</v-icon>
                      {{ activeR.seats }}
                    </v-col>
                    <v-col cols="12" class="py-2">
                      <div class="text-capitalize">
                        {{ activeR.facility.name }}
                      </div>
                      <div>
                        {{
                          activeR.facility.location.address +
                          ', ' +
                          activeR.facility.location.city +
                          ', ' +
                          activeR.facility.location.state
                        }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5" class="py-0 pl-0">
                      <v-img src="/img/qr-code.png" height="100" contain />
                    </v-col>
                    <v-col cols="12" class="pb-0">
                      <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="secondary"
                            v-bind="attrs"
                            depressed
                            large
                            class="text-capitalize font-weight-bold"
                            v-on="on"
                          >
                            Cancel Reservation
                          </v-btn>
                        </template>
                        <v-row justify="center">
                          <v-card>
                            <h4 class="text-center pa-5">
                              Are you sure you want to cancel reservation?
                            </h4>
                            <v-divider></v-divider>
                            <v-card-actions class="pt-0">
                              <v-btn
                                color="black"
                                text
                                width="50%"
                                class="text-capitalize font-weight-bold"
                                @click="dialog = false"
                                >Yes</v-btn
                              >
                              <v-divider vertical></v-divider>
                              <v-btn
                                color="black"
                                text
                                width="50%"
                                class="text-capitalize font-weight-bold"
                                @click="dialog = false"
                                >No</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-row>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
            <div class="py-2 pl-5">
              <span style="font-size: 15px">Check other</span>
              <v-btn
                color="grey darken-2"
                text
                class="pl-0 others-btn"
                to="/account/reservations/active"
              >
                active reservations
              </v-btn>
            </div>
          </div>
          <div v-else class="text-center ma-10">No active reservations</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div v-if="cancelledR">
            <v-card v-show="cancelledR" class="pa-5" flat outlined>
              <h3>Cancelled Reservations</h3>
              <v-divider />
              <v-row justify="center" align="end">
                <v-col cols="12" sm="11" class="pa-0 pt-2">
                  <v-row align="center">
                    <v-col cols="auto" class="py-0">{{
                      cancelledR.date_reserved.substr(0, 10)
                    }}</v-col>
                    <v-col cols="auto" class="py-0">{{
                      cancelledR.time_reserved
                    }}</v-col>
                    <v-col cols="auto" class="py-0">
                      <v-icon>mdi-account-multiple</v-icon>
                      {{ cancelledR.seats }}
                    </v-col>
                    <v-col cols="12" class="py-2">
                      <div class="text-capitalize">
                        {{ cancelledR.facility.name }}
                      </div>
                      <div>
                        {{
                          cancelledR.facility.location.address +
                          ', ' +
                          cancelledR.facility.location.city +
                          ', ' +
                          cancelledR.facility.location.state
                        }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div class="py-2">
                This reservation has been cancelled and is no longer active.
              </div>
              <v-btn
                color="#D1D1D1"
                depressed
                large
                class="text-capitalize font-weight-bold"
              >
                Renew Reservation
              </v-btn>
            </v-card>
            <div class="py-2 pl-5">
              <span style="font-size: 15px">Check other</span>
              <v-btn
                color="grey darken-2"
                text
                class="pl-0 others-btn"
                to="/account/reservations/cancelled"
              >
                cancelled reservations
              </v-btn>
            </div>
          </div>
          <div class="text-center ma-10">No cancelled reservations</div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <div v-if="historyR">
            <v-card class="pa-5" flat outlined>
              <h3>History</h3>
              <v-divider />
              <v-row justify="center" align="end">
                <v-col cols="12" sm="11" class="pa-0 pt-2">
                  <v-row align="center">
                    <v-col cols="auto" class="py-0">{{
                      historyR.date_reserved.substr(0, 10)
                    }}</v-col>
                    <v-col cols="auto" class="py-0">{{
                      historyR.time_reserved
                    }}</v-col>
                    <v-col cols="auto" class="py-0">
                      <v-icon>mdi-account-multiple</v-icon>
                      {{ historyR.seats }}
                    </v-col>
                    <v-col cols="12" class="py-2">
                      <div class="text-capitalize">
                        {{ historyR.facility.name }}
                      </div>
                      <div>
                        {{
                          historyR.facility.location.address +
                          ', ' +
                          historyR.facility.location.city +
                          ', ' +
                          historyR.facility.location.state
                        }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <div class="py-2">
                This reservation has been cancelled and is no longer active.
              </div>
              <v-btn
                color="#D1D1D1"
                large
                depressed
                class="text-capitalize font-weight-bold"
              >
                Clear list
              </v-btn>
            </v-card>
            <div class="py-2 pl-5">
              <span style="font-size: 15px">Check other</span>
              <v-btn
                color="grey darken-2"
                text
                class="pl-0 others-btn"
                to="/account/reservations/history"
              >
                past reservations
              </v-btn>
            </div>
          </div>
          <div v-else class="text-center ma-10">No past reservations</div>
        </v-col>
      </v-row>

      <!-- Most recent reservations -->
      <v-row class="py-10" justify="center">
        <v-col cols="12" sm="10" md="12" lg="10">
          <v-card elevation="3" class="mt-10">
            <v-row align="center">
              <v-col cols="12" class="pb-0 mb-0">
                <v-card
                  class="v-sheet--offset mx-auto py-2 px-3"
                  elevation="6"
                  width="96%"
                  color="primary"
                  dark
                >
                  <div class="title font-weight-medium">
                    Recent Reservations
                  </div>
                  <div class="font-weight-medium subtitle-1">
                    Most recent 10 reservations
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-card-text
              v-if="reservations"
              class="px-10"
              style="margin-top: -30px"
            >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th
                        v-for="i in [
                          's/n',
                          'facility',
                          'seats',
                          'date reserved',
                          'time reserved',
                          'status',
                          '',
                        ]"
                        :key="i"
                        class="text-uppercase primary--text"
                      >
                        {{ i }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, m) in reservations.slice().reverse()"
                      :key="m"
                      class="tablerow"
                    >
                      <td>{{ m + 1 }}</td>
                      <td class="text-capitalize">
                        {{ item.facility.name }}
                      </td>
                      <td>{{ item.seats }}</td>
                      <td>{{ item.date_reserved.substr(0, 10) }}</td>
                      <td>{{ item.time_reserved }}</td>
                      <td>{{ item.current_status }}</td>
                      <td>
                        <v-btn text small color="primary"> Details </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-text v-else class="pb-10 text--primary">
              <div class="text-center">You have no reservations</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  computed: {
    reservations() {
      return this.$store.state.user.profile.reservations
    },
    // get the most recent pending reservations
    activeR() {
      return this.reservations
        .filter((el) => el.current_status === 'PENDING')
        .slice(-1)[0]
    },
    // get the most recent cancelled reservations
    cancelledR() {
      return this.reservations
        .filter((el) => el.current_status === 'CANCELED')
        .slice(-1)[0]
    },
    // get the most recent completed reservations
    historyR() {
      return this.reservations
        .filter((el) => el.current_status === 'COMPLETED')
        .slice(-1)[0]
    },
  },
  head() {
    return {
      title: 'My Reservations',
    }
  },
}
</script>

<style>
.others-btn {
  font-weight: bold;
  font-size: 15px;
  text-transform: lowercase;
}
.others-btn::before {
  background-color: transparent !important;
}
.v-sheet--offset {
  top: -30px;
  position: relative;
}
.tablerow .btn {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
.tablerow:hover .btn {
  opacity: 1;
}
</style>
