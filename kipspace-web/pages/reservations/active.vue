<template>
  <div id="active">
    <v-container>
      <v-row justify="center">
        <v-col sm="10" md="12" lg="10">
          <div class="my-3">
            <h3>Active Reservations</h3>
          </div>
          <v-card outlined class="my-2">
            <div v-for="v in 7" :key="v">
              <div class="pa-5">
                <v-row justify="center">
                  <v-col cols="8" sm="9" md="8">
                    <v-row align="center">
                      <v-col cols>Feb 3, 2020</v-col>
                      <v-col cols>12:00PM</v-col>
                      <v-col cols>
                        <v-icon>mdi-account-multiple</v-icon>
                        1
                      </v-col>
                      <v-col cols="12" class="grey--text">
                        You were at Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos state.
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="py-0">
                        <v-btn 
                          color="secondary" 
                          depressed
                          large 
                          class="text-capitalize font-weight-bold"
                        >
                          Cancel Reservation
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="4" sm="3" md="2">
                    <v-img src="/qr-code-black.png" height="100" contain></v-img>
                  </v-col>
                </v-row>
              </div>
              <v-divider v-if="v != 7"></v-divider>
            </div>
          </v-card>
          <div class="grey--text py-5 text-center">
            No active reservations
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
  //
  })
}
</script>

<style>

</style>