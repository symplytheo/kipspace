<template>
  <div id="success">
    <v-sheet color="primary" tile class="py-5">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="10" sm="8" lg="6">
          <div class="py-5 white--text text-center">
            <div class="display-1 font-weight-bold">Congratulations!</div>
            <div class="title">
              Check your reservations for your QR code.
            </div>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
    
    <v-container class="py-10">
      <h3>Top Searches</h3>
      <v-row justify="center">
        <v-col cols="10" sm="11" md="11" lg="12">
          <v-row>
            <v-col cols="12" sm="6" lg="3" v-for="g in 8" :key="g">
              <FacilityCard />
            </v-col>
            <v-col cols="12" class="my-2">
              <v-pagination 
                :length="6" 
                :value=1
                color="primary"
                class="pagination"
              >
              </v-pagination>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FacilityCard from '~/components/home/FacilityCard'

export default {
components: { FacilityCard },
head() {
    return {
      title: 'Congratulations'
    };
  }
}
</script>

<style>
</style>