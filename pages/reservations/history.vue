<template>
  <div id="history">
    <v-container>
      <v-row justify="center">
        <v-col sm="10" md="12" lg="10">
          <div class="my-3">
            <h3 class="d-inline">History</h3>
            <v-btn 
              class="float-right font-weight-bold text-capitalize"
              text 
              color="grey"
            >
              <u>Clear List</u>
            </v-btn>
          </div>
          <v-card outlined class="my-2">
            <div v-for="v in 7" :key="v">
              <div class="pa-5">
                <v-row align="center">
                  <v-col cols="4" md="2">Feb 3, 2020</v-col>
                  <v-col cols="4" md="2">12:00PM</v-col>
                  <v-col cols="4" md="2">
                    <v-icon>mdi-account-multiple</v-icon>
                    1
                  </v-col>
                  <v-col cols="12" md="6" class="grey--text">
                    You were at Dominos Pizza, No.6 Adenuga street, ibara-expressway, lagos state.
                  </v-col>
                </v-row>
              </div>
              <v-divider v-if="v != 7"></v-divider>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>