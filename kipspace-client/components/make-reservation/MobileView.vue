<template>
  <div id="mobile" class="hidden-md-and-up">
    <v-container class="px-sm-10">
      <v-row>
        <v-col cols="4" class="py-3 pr-0">
          <v-dialog
            ref="date"
            v-model="datepicker"
            :return-value.sync="date_reserved"
            persistent
            width="290"
            hide-overlay
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date_reserved"
                label="date"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="date_reserved" scrollable>
              <v-spacer />
              <v-btn text small color="secondary" @click="datepicker = false">
                cancel
              </v-btn>
              <v-btn
                text
                small
                color="secondary"
                @click="$refs.date.save(date_reserved)"
              >
                save
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="4" class="pr-0">
          <v-dialog
            ref="time"
            v-model="timepicker"
            :return-value.sync="time_reserved"
            persistent
            width="290"
            hide-overlay
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time_reserved"
                label="time"
                readonly
                outlined
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-time-picker v-model="time_reserved" scrollable>
              <v-spacer />
              <v-btn text small color="secondary" @click="timepicker = false">
                cancel
              </v-btn>
              <v-btn
                text
                small
                color="secondary"
                @click="$refs.time.save(time_reserved)"
              >
                save
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="seats"
            :items="[1, 2, 3, 4, 5]"
            label="seats"
            outlined
          />
        </v-col>
        <!-- <v-col>
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
        </v-col> -->
        <v-col>
          <v-btn
            x-large
            depressed
            block
            height="48"
            class="text-capitalize"
            color="secondary"
            :loading="loading"
            @click="makeReservation()"
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
            <v-img
              :src="facility.cover ? facility.cover : '/img/chips.png'"
              height="100%"
            />
          </v-sheet>
          <v-sheet tile elevation="3">
            <v-container fluid class="px-sm-10">
              <v-row>
                <v-col cols="3" sm="3" class="pl-0">
                  <v-avatar size="110" class="biz-logo">
                    <v-img
                      :src="
                        facility.logo ? facility.logo : '/img/mcdonald-icon.png'
                      "
                      alt="alt"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="9" sm="9" class="pt-0 pl-8 pl-sm-0">
                  <div class="subtitle-1 font-weight-bold">
                    {{ facility.name }}
                  </div>
                  <v-rating
                    :value="averageRating"
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
                <v-card outlined class="px-3 py-3">
                  <v-row>
                    <v-col cols="2">
                      <v-icon color="primary" size="28">
                        mdi-clock-outline
                      </v-icon>
                    </v-col>
                    <v-col cols="10">
                      <v-row
                        v-for="(open, h) in facility.opening_hours"
                        :key="h"
                      >
                        <v-col cols="4" class="pt-1 px-0">
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
                        {{ facility.capacity }}
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
                      <div class="display-2 font-weight-bold">
                        {{ averageRating }}
                      </div>
                      <v-rating
                        :value="averageRating"
                        half-increments
                        color="primary"
                        background-color="primary"
                        dense
                        readonly
                        size="15"
                      />
                      <div class="subtitle-2 font-weight-bold pt-1">
                        {{ facility.reviews.length }} Reviews
                      </div>
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
                        readonly
                        size="16"
                        class="d-inline mx-2"
                      />
                      <div class="py-2 subtitle-2">
                        {{ item.review }}
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
import MakeReservationGql from '~/graphql/mutations/MakeReservation'

export default {
  props: {
    facility: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      seats: '',
      date_reserved: '',
      time_reserved: '',
      // for dialogs
      datepicker: false,
      timepicker: false,
      loading: false,
      //
      rating: [
        { num: 5, value: 100 },
        { num: 4, value: 50 },
        { num: 3, value: 30 },
        { num: 2, value: 15 },
        { num: 1, value: 0 },
      ],
    }
  },
  computed: {
    facilityAddress() {
      // join address, city, state & country
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
      // calculate the average rating for facility
      // returns 1 if result is zero to avoid NaN when 0/0
      let sum = 0
      for (const item in this.facility.reviews) {
        sum += item.rating
      }
      const length = this.facility.reviews.length
      const average = sum / (length !== 0 ? length : 1)
      return average > 0 ? average : average + 1
    },
  },
  methods: {
    async makeReservation() {
      this.loading = true
      //
      const record = {
        facility: this.facility._id,
        seats: this.seats,
        date_reserved: this.date_reserved,
        time_reserved: this.time_reserved,
      }
      try {
        await this.$apollo.mutate({
          mutation: MakeReservationGql,
          variables: { record },
        })
        this.$store.commit('snackbar/show', {
          text: 'Reservation was successfully made',
          icon: 'success',
        })
        this.$router.push('/success')
      } catch (error) {
        // log error in console
        // snackbar for error not perfected yet
        console.log(error)
        this.$store.commit('snackbar/show', {
          text: error,
          icon: 'success',
        })
      } finally {
        this.loading = false
      }
    },
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
