<template>
  <div id="home">
    <v-container style="margin-top: 150px" class="mb-10">
      <v-row justify="center" class="text-center">
        <v-col cols="12" md="10">
          <h1 class="white--text">
            Make a reservation today.
            <br />Kip. Your. Space.
          </h1>
        </v-col>
        <v-col cols="11" sm="8" lg="6">
          <v-text-field
            solo
            rounded
            dense
            flat
            label="Search or type location"
            append-icon="mdi-magnify"
            @keypress.enter="$router.push('/search')"
          ></v-text-field>
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
            <v-row justify="center" class="pa-5 px-md-10">
              <h3 class="primary--text text-center">
                Avoid queues
                <span class="secondary--text">.</span>
              </h3>
              <p class="text-center pt-2">
                With Kipspace, you do not need to worry about waiting in queues.
                Make reservations and gain easy access into any facility of your
                choice.
              </p>
            </v-row>
            <!-- <v-card-title class="text-center">
            </v-card-title>-->
            <v-row>
              <v-container class="px-md-15">
                <v-row>
                  <v-col cols="12">
                    <v-card
                      flat
                      height="350px"
                      color="#F1F1F1"
                      class="ills-card-bg pa-5"
                    >
                      <v-row no-gutters align="center" class="fill-height">
                        <v-col cols="6" md="8" class="pl-md-15">
                          <div class="display-1 font-weight-bold primary--text">
                            A new way to
                            <br />kipspace
                            <span class="secondary--text">.</span>
                          </div>
                          <h5 class="py-3 font-weight-thin">
                            A digital tool for making reservations and managing
                            facilities.
                          </h5>
                        </v-col>
                        <v-col cols="6" md="4">
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

            <!-- <v-img
                src="/img/ellipse-bg.svg"
                class="pa-10 px-5"
                contain
                height="100%"
                style="background-color"
              >
                <v-row align="center" justify="center" class="mt-">
                  <v-col cols="8" md="6" class="pl-7 pl-sm-10  pt-0">
                  </v-col>
                  <v-col cols="4" md="6" class="pr-5 pr-md-0 pt-0">
                  </v-col>
                </v-row>
            </v-img>-->
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-lg-10">
      <h3>Top Searches</h3>
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
              ></v-pagination>
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
  layout: 'homepage',
  components: { FacilityCard },
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
