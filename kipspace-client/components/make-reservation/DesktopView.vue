<template>
  <div id="desktop" class="hidden-sm-and-down">
    <v-container fluid class="pa-0">
      <v-sheet tile height="180" color="grey lighten-5">
        <v-img
          :src="facility.cover ? facility.cover : '/img/chips.png'"
          height="180"
        >
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
            <v-avatar size="160" class="biz-logo">
              <v-img
                :src="facility.logo ? facility.logo : '/img/mcdonald-icon.png'"
                alt="alt"
              />
            </v-avatar>
          </v-col>
          <v-col md="9" lg="10" class="pt-0">
            <div class="title font-weight-bold">
              {{ facility.name }}
            </div>
            <div class="pt-1">
              <v-rating
                :value="averageRating"
                half-increments
                color="primary"
                background-color="primary"
                dense
                readonly
                size="18"
                class="d-inline"
              />
            </div>
            <div class="pt-1">{{ facilityAddress }}</div>
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
                <v-row v-for="(open, h) in facility.opening_hours" :key="h">
                  <v-col cols="4" class="pt-1">
                    {{ open.day }}
                  </v-col>
                  <v-col cols="8" class="pt-1">
                    <v-row>
                      <v-col cols="5" class="py-0">
                        {{ open.from }}
                      </v-col>
                      <v-col cols="2" class="py-0">
                        <span>-</span>
                      </v-col>
                      <v-col cols="5" class="py-0">
                        {{ open.to }}
                      </v-col>
                    </v-row>
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
                  {{ facility.capacity }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col md="7" lg="8">
          <v-card outlined class="pa-5">
            <div class="title font-weight-bold">Review Summary</div>
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
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col md="5" lg="3" class="text-center">
                <div class="display-1 font-weight-bold">
                  {{ averageRating }}
                </div>
                <v-rating
                  :value="averageRating"
                  half-increments
                  color="primary"
                  background-color="primary"
                  dense
                  size="18"
                />
                <div class="subtitle-1 font-weight-bold">100 Reviews</div>
              </v-col>
            </v-row>
            <div v-for="(item, w) in facility.reviews" :key="w">
              <v-divider />
              <v-card tile flat class="pt-5 pb-3">
                <div class="subtitle-1 font-weight-bold">
                  {{ item.display_name }}
                </div>
                <span class="grey--text">{{ item.createdAt }}</span>
                <v-rating
                  :value="item.rating"
                  half-increments
                  color="primary"
                  background-color="primary"
                  dense
                  size="16"
                  class="d-inline mx-2"
                />
                <div class="py-2">
                  {{ item.review }}
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
  props: {
    facility: {
      type: Object,
      default: () => ({}),
    },
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
    facilityAddress() {
      return (
        this.facility.location.address +
        ', ' +
        this.facility.location.city +
        ', ' +
        this.facility.location.state +
        ', ' +
        this.facility.location.country.name
      )
    },
    averageRating() {
      let sum = 0
      for (const item in this.facility.reviews) {
        sum += item.rating
      }
      const length = this.facility.reviews.length
      const average = sum / (length !== 0 ? length : 1)
      return average > 0 ? average : average + 1
    },
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
