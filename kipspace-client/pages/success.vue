<template>
  <div id="success">
    <v-sheet color="primary" tile class="py-5">
      <v-row align="center" justify="center" class="fill-height">
        <v-col cols="10" sm="8" lg="6">
          <div class="py-5 white--text text-center">
            <h1>Congratulations!</h1>
            <h4 class="font-weight-thin">
              Check your reservations for your QR code.
            </h4>
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
              <v-card flat link>
                <v-img src="/img/burger.png" :aspect-ratio="17/12"/>
              </v-card>
              <div class="py-2">
                <h4 class="d-inline">Dominos Pizza</h4>
                <v-rating
                  value=3
                  half-increments
                  background-color="primary"
                  color="primary"
                  dense
                  size="16"
                  class="d-inline float-right"
                ></v-rating>
              </div>
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
export default {
head() {
    return {
      title: 'Congratulations'
    };
  }
}
</script>

<style>
</style>