<template>
  <div id="reservations">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-5" flat color="primary" dark>
            <h3>Active Reservations</h3>
            <v-sheet style="border-top: 2px solid #fff" width="175"/>
            <div class="py-3">
              <span>Feb 3, 2020</span>
              <span class="mx-5">12:00PM</span>
              <span>
                <v-icon left>mdi-account-multiple</v-icon>
                1
              </span>
            </div>
            <p>
              To Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos state.
            </p>
            <v-row align="end" class="pt-1">
              <v-col cols="4">
                <v-img src="/qr-code.png"/>
              </v-col>
              <v-col cols="8">
                <v-row justify="center">
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{on, attrs}">
                      <v-btn 
                        color="secondary"
                        v-on="on"
                        v-bind="attrs" 
                        depressed
                        large 
                        class="text-capitalize font-weight-bold"
                      >
                        Cancel Reservation
                      </v-btn>
                    </template>
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
                        >Yes</v-btn>
                        <v-divider vertical></v-divider>
                        <v-btn 
                          color="black" 
                          text
                          width="50%"
                          class="text-capitalize font-weight-bold" 
                          @click="dialog = false"
                        >No</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <div class="text-right py-2">
            Check other 
            <v-btn 
              color="grey darken-2"
              text
              class="pl-0 others-btn"
              style="font-size: 15px"
              to="/reservations/active"
            > 
              active reservations
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-5" flat outlined>
            <h3>Cancelled Reservations</h3>
            <v-sheet style="border-top: 2px solid #000" width="210"/>
            <div class="py-3">
              <span>Feb 3, 2020</span>
              <span class="mx-5">12:00PM</span>
              <span>
                <v-icon left>mdi-account-multiple</v-icon>
                1
              </span>
            </div>
            <p>
              To Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos state.
            </p>
            <p class="pt-3">
              This reservation has been cancelled and is no longer active.
            </p>
            <v-btn 
              color="#D1D1D1" 
              depressed
              large 
              class="text-capitalize font-weight-bold"
            >
              Renew Reservation
            </v-btn>
          </v-card>
          <div class="text-right py-2">
            Check other 
            <v-btn 
              color="grey darken-2"
              text
              class="pl-0 others-btn"
              style="font-size: 15px"
              to="/reservations/cancelled"
            > 
              cancelled reservations
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-card class="pa-5" flat outlined>
            <h3>History</h3>
            <v-sheet style="border-top: 2px solid #000" width="65"/>
            <div class="py-3">
              <span>Feb 3, 2020</span>
              <span class="mx-5">12:00PM</span>
              <span>
                <v-icon left>mdi-account-multiple</v-icon>
                1
              </span>
            </div>
            <p>
              To Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos state.
            </p>
            <p class="pt-3">
              This reservation has been cancelled and is no longer active.
            </p>
            <v-btn 
              color="#D1D1D1" 
              large
              depressed 
              class="text-capitalize font-weight-bold"
            >
              Clear list
            </v-btn>
          </v-card>
          <div class="text-right py-2">
            Check other 
            <v-btn 
              color="grey darken-2"
              text
              class="pl-0 others-btn"
              style="font-size: 15px"
              to="/reservations/history"
            > 
              past reservations
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="py-10" justify="center">
        <v-col cols="12" sm="10" md="12" lg="10">
          <v-divider></v-divider>
          <div v-for="x in 6" :key="x">
            <v-row align="center" class="px-5">
              <v-col cols="2">Feb 3, 2020</v-col>
              <v-col cols="2">12:00PM</v-col>
              <v-col cols="2">
                <v-icon left>mdi-account-multiple</v-icon>
                1
              </v-col>
              <v-col cols="4">
                To Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos state.
              </v-col>
              <v-col cols="2">
                <v-btn text class="text-capitalize font-weight-bold" color="primary">
                  Details
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false
  })
}
</script>

<style>
.others-btn {
  font-weight: bold;
  text-transform: lowercase;
  margin-top: -1px
}
.others-btn::before {
  background-color: transparent!important;
}
</style>