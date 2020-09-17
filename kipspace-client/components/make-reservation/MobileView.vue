<template>
  <div id="mobile" class="hidden-md-and-up">
    <v-container class="px-sm-10">
      <v-row>
        <v-col cols="4" class="py-3 pr-0">
          <v-select :items="['today', 'tomorrow']" label="day" solo flat />
        </v-col>
        <v-col cols="3" class="py-3 pl-2">
          <v-dialog
            ref="timeModal"
            v-model="selectTime"
            :return-value.sync="time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                height="50"
                text
                block
                depressed
                class="text-lowercase time-btn"
                style="border: 1px solid #d1d1d1"
                :class="!time ? 'grey--text text--darken-1' : ''"
                v-on="on"
              >
                {{ time ? time : 'time' }}
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
              <v-btn text color="primary" @click="selectTime = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.timeModal.save(time)">
                Save
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="5" class="py-3 pl-8">
          <v-select :items="[1, 2, 3, 4, 5]" label="seats" class="" solo flat />
        </v-col>
        <v-col>
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
        <v-col>
          <v-btn
            x-large
            depressed
            block
            height="48"
            class="text-capitalize"
            color="secondary"
            to="/success"
          >
            Reserve
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="px-0">
      <v-tabs>
        <v-tab
          v-for="tab in ['Overview', 'Reviews']"
          :key="tab"
          class="subtitle-1 text-capitalize font-weight-bold"
        >
          {{ tab }}
        </v-tab>

        <v-tab-item>
          <v-sheet tile height="160" color="grey lighten-4">
            <v-img :src="facility.cover && facility.cover" height="100%" />
          </v-sheet>
          <v-sheet tile elevation="3">
            <v-container fluid class="px-sm-10">
              <v-row>
                <v-col cols="4" sm="3" class="pl-0">
                  <v-avatar size="120" class="biz-logo">
                    <v-img
                      :src="facility.avatar && facility.avatar"
                      :alt="facility.name"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="8" sm="9" class="pt-0 pl-8 pl-sm-0">
                  <div class="subtitle-1 font-weight-bold">
                    {{ facility.name }}
                  </div>
                  <v-rating
                    :value="4"
                    half-increments
                    color="primary"
                    background-color="primary"
                    dense
                    readonly
                    size="16"
                    class="d-inline"
                  />
                  <div class="pt-1 subtitle-2">
                    {{ facilityAddress }}
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <v-container class="py-10">
            <v-row justify="center">
              <v-col sm="10">
                <v-card outlined class="px-5 py-3">
                  <v-row>
                    <v-col cols="2">
                      <v-icon color="primary" size="28">
                        mdi-clock-outline
                      </v-icon>
                    </v-col>
                    <v-col cols="10" class="pt-3">
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
                    <v-col cols="10" class="pt-2">
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
                      <v-icon color="primary" size="28">
                        mdi-account-multiple
                      </v-icon>
                    </v-col>
                    <v-col cols="10" class="pt-2">
                      <v-chip color="grey lighten-3" label class="px-10 py-5">
                        1000
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container class="pt-0">
            <v-row justify="center">
              <v-col cols="12" class="px-1">
                <v-card outlined class="px-3 py-2">
                  <div class="title font-weight-bold">Review Summary</div>
                  <v-row align="center" class="pb-3 pt-3">
                    <v-col cols="8" class="px-0">
                      <v-row
                        v-for="(rate, r) in rating"
                        :key="r"
                        align="center"
                      >
                        <v-col cols="2" sm="1" class="pa-0 text-right pr-1">
                          {{ rate.num }}
                        </v-col>
                        <v-col cols="10" sm="11" class="pl-0 py-0">
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
                    <v-col cols="4" class="text-center">
                      <div class="display-2 font-weight-bold">4.4</div>
                      <v-rating
                        :value="4"
                        half-increments
                        color="primary"
                        background-color="primary"
                        dense
                        readonly
                        size="15"
                      />
                      <div class="subtitle-2 font-weight-bold pt-1">
                        1000 Reviews
                      </div>
                    </v-col>
                  </v-row>
                  <div v-for="(review, w) in facility.reviews" :key="w">
                    <v-divider />
                    <v-card tile flat class="pt-5 pb-3">
                      <div class="subtitle-1 font-weight-bold">
                        {{ review.name }}
                      </div>
                      <span class="grey--text">{{ review.date }}</span>
                      <v-rating
                        :value="review.rating"
                        half-increments
                        color="primary"
                        background-color="primary"
                        dense
                        readonly
                        size="16"
                        class="d-inline mx-2"
                      ></v-rating>
                      <div class="py-2 subtitle-2">
                        {{ review.text }}
                      </div>
                    </v-card>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
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
#mobile .biz-logo {
  margin-top: -65px;
  border: 3px solid white;
  border-radius: 50%;
}
#mobile .v-input__control {
  height: 48px;
}
#mobile .v-text-field--solo.v-select {
  border: 1px solid #d1d1d1;
}
</style>
