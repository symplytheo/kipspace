<template>
  <div id="desktop" class="hidden-sm-and-down">
    <v-container fluid class="pa-0">
      <v-sheet tile height="180" color="grey lighten-5">
        <v-img :src="facility.cover && facility.cover" height="180">
          <v-row justify="center" align="center" class="fill-height">
            <v-col md="10" lg="8">
              <v-card class="reserve-box pa-0 pl-8 mb-5" height="48" flat>
                <v-row>
                  <v-col class="pa-0">
                    <v-select
                      :items="['today', 'tomorrow']"
                      label="select day"
                      class=""
                      solo
                      flat
                    ></v-select>
                  </v-col>
                  <v-col class="pa-0">
                    <v-dialog
                      ref="timeModal"
                      v-model="selectTime"
                      :return-value.sync="time"
                      persistent
                      width="290px"
                      hide-overlay
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          text
                          tile
                          depressed
                          height="48"
                          width="100%"
                          class="time-btn"
                          :color="!time ? 'grey darken-1' : 'black'"
                          style="border-right: 2px solid #dedede"
                          v-on="on"
                        >
                          {{ time ? time : 'pick time' }}
                          <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                      </template>
                      <v-time-picker
                        v-if="selectTime"
                        v-model="time"
                        color="primary"
                        ampm-in-title
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          class="font-weight-bold text-capitalize"
                          @click="selectTime = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          class="font-weight-bold text-capitalize"
                          @click="$refs.timeModal.save(time)"
                        >
                          Save
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                  <v-col class="pa-0">
                    <v-select
                      :items="[
                        '1 seat',
                        '2 seats',
                        '3 seats',
                        '4 seats',
                        '5 seats',
                      ]"
                      label="no. of seats"
                      class=""
                      solo
                      flat
                    ></v-select>
                  </v-col>
                  <v-col class="pa-0 remind" cols="3">
                    <v-select
                      :items="[
                        '15 mins before',
                        '30 mins before',
                        '1 hour before',
                        '2 hours before',
                      ]"
                      label="remind me "
                      solo
                      flat
                    ></v-select>
                  </v-col>
                  <v-col class="pa-0 reserve-btn-col">
                    <v-btn
                      color="white"
                      text
                      large
                      class="reserve-btn text-capitalize"
                      width="100%"
                      height="48"
                      to="/success"
                    >
                      Reserve
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-img>
      </v-sheet>
    </v-container>

    <v-sheet tile elevation="3">
      <v-container>
        <v-row>
          <v-col md="3" lg="2">
            <v-avatar size="160" class="biz-logo" color="primary">
              <img :src="facility.avatar" :alt="facility.name" />
            </v-avatar>
          </v-col>
          <v-col md="9" lg="10" class="pt-0">
            <h3>{{ facility.name }}</h3>
            <div class="pt-1">
              <v-rating
                :value="facility.review.rating"
                half-increments
                color="primary"
                background-color="primary"
                dense
                readonly
                size="18"
                class="d-inline"
              ></v-rating>
            </div>
            <div class="pt-1">
              {{ facilityAddress }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container class="py-10">
      <v-row>
        <v-col md="5" lg="4">
          <v-card outlined class="pa-5">
            <v-row>
              <v-col cols="2">
                <v-icon color="primary" size="28">mdi-clock-outline</v-icon>
              </v-col>
              <v-col cols="10">
                <v-row v-for="(open, h) in opening" :key="h">
                  <v-col cols="7" class="pt-1">
                    {{ open.day }}
                  </v-col>
                  <v-col cols="5" class="pt-1">
                    {{ open.time }}
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-icon color="primary" size="28">mdi-phone</v-icon>
              </v-col>
              <v-col cols="10" class="pt-0">
                <v-btn
                  large
                  color="grey lighten-3"
                  href="tel:+2348012345678"
                  link
                  depressed
                >
                  +234 801 234 5678
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-icon color="primary" size="28">mdi-account-multiple</v-icon>
              </v-col>
              <v-col cols="10" class="pt-0">
                <v-chip color="grey lighten-3" label class="px-10 py-5">
                  1000
                </v-chip>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col md="7" lg="8">
          <v-card outlined class="pa-5">
            <h3>Review Summary</h3>
            <v-row align="center" class="pb-3">
              <v-col md="7" lg="9" class="pt-5">
                <v-row v-for="(rate, r) in rating" :key="r" align="center">
                  <v-col md="2" lg="1" class="py-0">
                    {{ rate.num }}
                  </v-col>
                  <v-col md="10" lg="11" class="py-0">
                    <v-progress-linear
                      :value="rate.value"
                      color="primary"
                      background-color="secondary"
                      height="10"
                      rounded
                    ></v-progress-linear>
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="5" lg="3" class="text-center">
                <h1 style="font-size: 60px">4.4</h1>
                <v-rating
                  :value="4"
                  half-increments
                  color="primary"
                  background-color="primary"
                  dense
                  size="18"
                />
                <h4>1000 Reviews</h4>
              </v-col>
            </v-row>
            <div v-for="(review, w) in facility.reviews" :key="w">
              <v-divider />
              <v-card tile flat class="pt-5 pb-3">
                <div class="subtitle-1 font-weight-bold">{{ review.name }}</div>
                <span class="grey--text">{{ review.date }}</span>
                <v-rating
                  :value="review.rating"
                  half-increments
                  color="primary"
                  background-color="primary"
                  dense
                  size="16"
                  class="d-inline mx-2"
                />
                <div class="py-2">
                  {{ review.text }}
                </div>
              </v-card>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = await params.slug
    return { slug }
  },
  data: () => ({
    time: null,
    selectTime: false,
    rating: [
      { num: 5, value: 100 },
      { num: 4, value: 50 },
      { num: 3, value: 30 },
      { num: 2, value: 15 },
      { num: 1, value: 0 },
    ],
  }),
  computed: {
    facilities() {
      return this.$store.getters['facility/facilities']
    },
    facility() {
      return this.facilities.find((el) => el.slug === this.slug)
    },
    facilityAddress() {
      const addr = this.facility.location
      return addr.address + ', ' + addr.city + ', ' + addr.state
    },
  },
  head() {
    const text = this.facility.text
    const title = text.replace(/^\w|(\s\w)/g, (str) => str.toUpperCase())
    return {
      title,
    }
  },
}
</script>

<style>
#desktop .biz-logo {
  margin-top: -65px;
  border: 7px solid white;
  border-radius: 50%;
}
#desktop .reserve-box {
  border-radius: 50px !important;
}
#desktop .reserve-box .v-input__slot {
  border-right: 2px solid #dedede;
  border-radius: 0%;
}
#desktop .reserve-box .remind .v-input__slot {
  border: none;
}
#desktop .time-btn {
  text-transform: lowercase;
  border-right: 2px solid #dedede;
}
#desktop .time-btn::before {
  background-color: transparent !important;
}
#desktop .reserve-btn-col {
  background: #ea3788;
  height: 48px;
  border-radius: 0px 50px 50px 0px;
}
#desktop .reserve-btn {
  border-radius: 0px 50px 50px 0px;
}
</style>
