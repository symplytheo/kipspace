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
                <v-form v-model="MkrForm">
                  <v-row>
                    <v-col col="4" class="pa-0">
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
                            solo
                            flat
                            append-icon="mdi-menu-down"
                            v-bind="attrs"
                            :rules="[(v) => !!v || 'Date is required']"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="date_reserved"
                          scrollable
                          color="primary"
                        >
                          <v-spacer />
                          <v-btn
                            text
                            small
                            color="secondary"
                            @click="datepicker = false"
                            >cancel</v-btn
                          >
                          <v-btn
                            text
                            small
                            color="secondary"
                            @click="$refs.date.save(date_reserved)"
                            >save</v-btn
                          >
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    <v-col col="4" class="pa-0">
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
                            solo
                            flat
                            append-icon="mdi-menu-down"
                            v-bind="attrs"
                            :rules="[(v) => !!v || 'Time is required']"
                            v-on="on"
                          />
                        </template>
                        <v-time-picker
                          v-model="time_reserved"
                          scrollable
                          ampm-in-title
                          color="primary"
                        >
                          <v-spacer />
                          <v-btn
                            text
                            small
                            color="secondary"
                            @click="timepicker = false"
                            >cancel</v-btn
                          >
                          <v-btn
                            text
                            small
                            color="secondary"
                            @click="$refs.time.save(time_reserved)"
                            >save</v-btn
                          >
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                    <v-col col="4" class="pa-0">
                      <v-select
                        v-model="seats"
                        :items="[1, 2, 3, 4, 5]"
                        label="no. of seats"
                        solo
                        flat
                        :rules="[(v) => !!v || 'Seat is required']"
                      />
                    </v-col>
                    <v-col col="4" class="pa-0">
                      <v-btn
                        color="secondary"
                        depressed
                        width="95%"
                        height="48"
                        class="text-capitalize reserve-btn"
                        :disabled="!MkrForm"
                        :loading="loading"
                        @click="makeReservation()"
                      >
                        Reserve
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
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
            <div class="title font-weight-bold text-capitalize">
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
            <div class="pt-1 text-capitalize">
              {{
                `${facility.location.address}, 
                ${facility.location.city}, 
                ${facility.location.state},  
                ${facility.location.country.name}`
              }}
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
                <v-row v-for="(open, h) in facility.opening_hours" :key="h">
                  <v-col cols="5" class="pl-0 pt-1 subtitle-2">
                    {{ open.day }}
                  </v-col>
                  <v-col cols="7" class="pt-1">
                    <v-row>
                      <v-col cols="5" class="py-0 subtitle-2">
                        {{ open.from }}
                      </v-col>
                      <v-col cols="2" class="py-0 subtitle-2">
                        <span>-</span>
                      </v-col>
                      <v-col cols="5" class="py-0 subtitle-2">
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
      MkrForm: false,
      loading: false,
      // for dialogs
      datepicker: false,
      timepicker: false,
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
    averageRating() {
      let sum = 0
      for (const item in this.facility.reviews) sum += item.rating
      const length = this.facility.reviews.length
      const average = sum / (length !== 0 ? length : 1) // 0/0 is NaN
      return average
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
        this.$router.replace('/success')
      } catch (error) {
        // log error in console
        // snackbar for error not perfected yet
        console.log(error)
        this.$store.commit('snackbar/show', {
          text: error,
          icon: 'error',
        })
      } finally {
        this.loading = false
      }
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
#desktop .reserve-btn-col {
  height: 48px;
  border-radius: 0px 50px 50px 0px;
}
#desktop .reserve-btn {
  border-radius: 0px 50px 50px 0px;
}
</style>
