<template>
  <div id="reservations">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-5" flat color="primary" dark>
            <h3>Active Reservations</h3>
            <v-divider />
            <v-row justify="center" align="end">
              <v-col cols="12" sm="11" class="pa-0 pt-2">
                <v-row align="center">
                  <v-col cols="auto" class="py-0">Feb 3, 2020</v-col>
                  <v-col cols="auto" class="py-0">12:00PM</v-col>
                  <v-col cols="auto" class="py-0">
                    <v-icon>mdi-account-multiple</v-icon>
                    1
                  </v-col>
                  <v-col cols="12" class="py-2">
                    You were at Dominos Pizza, No.6 Adenuga street,
                    ibara-expressway, lagos state.
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
              to="/reservations/active"
            >
              active reservations
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-5" flat outlined>
            <h3>Cancelled Reservations</h3>
            <v-divider />
            <div class="py-3">
              <span>Feb 3, 2020</span>
              <span class="mx-5">12:00PM</span>
              <span>
                <v-icon left>mdi-account-multiple</v-icon>
                1
              </span>
            </div>
            <div class="py-1">
              To Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos
              state.
            </div>
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
              to="/reservations/cancelled"
            >
              cancelled reservations
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-5" flat outlined>
            <h3>History</h3>
            <v-divider />
            <div class="py-3">
              <span>Feb 3, 2020</span>
              <span class="mx-5">12:00PM</span>
              <span>
                <v-icon left>mdi-account-multiple</v-icon>
                1
              </span>
            </div>
            <div class="py-1">
              To Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos
              state.
            </div>
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
              to="/reservations/history"
            >
              past reservations
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="py-10" justify="center">
        <v-col cols="12" sm="10" md="12" lg="10">
          <v-divider />

          <v-simple-table>
            <template>
              <tbody>
                <tr v-for="s in 6" :key="s">
                  <td>Feb 3, 2020</td>
                  <td>
                    <span>
                      <v-icon small left>mdi-account-multiple</v-icon> 1
                    </span>
                  </td>
                  <td class="py-2">
                    To Dominos Pizza, No.6 Adenuga street, Ibara-expressway,
                    Lagos State.
                  </td>
                  <td>
                    <v-btn
                      text
                      class="text-capitalize font-weight-bold"
                      color="primary"
                    >
                      Details
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
</style>
