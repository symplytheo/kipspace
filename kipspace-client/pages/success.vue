<template>
  <div id="success">
    <v-sheet color="primary" tile class="py-5 mb-5">
      <v-row align="center" justify="center" class="fill-height text-center">
        <v-col cols="12" sm="8" lg="6">
          <div class="pa-5 white--text text-center">
            <div class="headline font-weight-bold">Congratulations!</div>
            <div class="subtitle-1">
              Check your reservations for your QR code.
            </div>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <v-container>
      <div class="title font-weight-bold">Top Searches</div>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col v-for="g in 8" :key="g" cols="6" md="3">
              <FacilityCard />
            </v-col>
            <v-col cols="12" class="my-2">
              <v-pagination
                :length="6"
                :value="1"
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
      title: 'Congratulations',
    }
  },
}
</script>

<style></style>
