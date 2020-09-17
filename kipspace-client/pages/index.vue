<template>
  <div id="home">
    <v-container style="margin-top: 100px" class="mb-15">
      <v-row justify="center" class="text-center">
        <v-col cols="12" md="10">
          <div class="text-sm-h4 text-h5 white--text font-weight-bold">
            Make a reservation today.
            <br />Kip. Your. Space.
          </div>
        </v-col>
        <v-col cols="11" sm="8" lg="7" class="py-sm-5">
          <v-text-field
            solo
            rounded
            flat
            height="54"
            label="Search or type location"
            append-icon="mdi-magnify"
            @keypress.enter="$router.push('/search')"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-row no-gutters justify="center" align="center" class="ills-wrapper">
      <img src="/img/office-building.png" contain width="100%" />
    </v-row>

    <v-container>
      <v-row justify="center" class="mt-10">
        <v-col cols="12" lg="10">
          <v-card class="pa-5 mb-10">
            <v-row justify="center" class="px-5 px-md-10 mb-3 text-center">
              <div class="text-md-h5 text-h6 font-weight-bold primary--text">
                Avoid queues
              </div>
              <div class="subtitle-1 pt-2">
                With Kipspace, you do not need to worry about waiting in queues.
                Make reservations and gain easy access into any facility of your
                choice.
              </div>
            </v-row>

            <v-row>
              <v-container class="px-md-15">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-card
                      flat
                      height=""
                      color="#F1F1F1"
                      class="ills-card-bg px-5 py-7 py-sm-5"
                    >
                      <v-row
                        justify="space-between"
                        align="center"
                        class="fill-height"
                      >
                        <v-col cols="8" class="pl-md-15 pl-sm-7">
                          <div
                            class="text-sm-h4 text-h6 pl-sm-5 font-weight-bold primary--text"
                          >
                            A new way to <br />
                            kipspace<span class="secondary--text pl-0">.</span>
                          </div>
                          <div
                            class="pt-3 text-caption text-sm-subtitle-1 font-weight-bold pl-sm-5 pr-sm-10"
                          >
                            A digital tool for making reservations and managing
                            facilities.
                          </div>
                        </v-col>
                        <v-col cols="4">
                          <v-img
                            src="/img/mobile-app.svg"
                            max-height="200"
                            contain
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-lg-10">
      <div class="title font-weight-bold">Top Searches</div>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col v-for="(item, f) in facilities" :key="f" cols="6" md="3">
              <FacilityCard :facility="item" />
            </v-col>
            <v-col cols="12" class="my-2">
              <v-pagination
                :length="6"
                :value="1"
                color="primary"
                class="pagination"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'homepage',
  computed: {
    facilities() {
      return this.$store.getters['facility/facilities']
    },
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>

<style>
.ills-wrapper {
  margin-top: -100px;
  margin-bottom: -80px;
}
.ills-card-bg {
  background-image: url(/img/ellipse-bg.png);
  background-size: cover;
  /* background-position: center center; */
}
</style>
