<template>
  <div id="mgr-profile">
    <v-sheet tile height="160" color="grey lighten-4">
      <v-img
        :src="facility.cover ? facility.cover : '/img/chips.png'"
        height="100%"
      >
        <v-row justify="end" align="end" class="fill-height pb-3 pr-5">
          <v-btn
            color="secondary"
            class="text-capitalize"
            depressed
            :to="`/account/facilities/${id}/edit-profile`"
          >
            Edit profile
          </v-btn>
        </v-row>
      </v-img>
    </v-sheet>

    <v-sheet tile elevation="3">
      <v-container>
        <v-row>
          <v-col cols="5" md="3" lg="2">
            <v-avatar size="140" class="biz-logo">
              <v-img
                :src="facility.logo ? facility.logo : '/img/mcdonald-icon.png'"
                alt="alt"
              />
            </v-avatar>
          </v-col>
          <v-col cols="7" md="9" lg="10" class="pt-0">
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
            <div class="pt-1">
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

    <v-container class="py-5">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col cols="12" md="5" lg="4">
              <v-card outlined class="pa-5">
                <v-row>
                  <v-col cols="2">
                    <v-icon color="primary" size="28">mdi-clock-outline</v-icon>
                  </v-col>
                  <v-col cols="10" class="pl-0">
                    <v-row v-for="(open, h) in facility.opening_hours" :key="h">
                      <v-col cols="4" class="pt-1 pl-0 subtitle-2">
                        {{ open.day }}
                      </v-col>
                      <v-col cols="8" class="pt-1">
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
                    <v-icon color="primary" size="28">
                      mdi-account-multiple
                    </v-icon>
                  </v-col>
                  <v-col cols="10" class="pt-0">
                    <v-chip color="grey lighten-3" label class="px-10 py-5">
                      {{ facility.capacity }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="7" lg="8">
              <v-card outlined class="px-3 py-2">
                <div class="title font-weight-bold">Review Summary</div>
                <v-row align="center" class="py-2">
                  <v-col cols="7" class="px-0">
                    <v-row v-for="(rate, r) in rating" :key="r" align="center">
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
                  <v-col cols="5" class="text-center">
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserFacilityGql from '~/graphql/queries/user-facility'

export default {
  layout: 'manager',
  data() {
    return {
      id: this.$route.params.id,
      facility: {
        name: '',
        location: {
          address: '',
          state: '',
          city: '',
          country: {
            name: '',
          },
        },
        opening_hours: [],
        capacity: 0,
        reviews: [],
      },
      rating: [
        { num: 5, value: 100 },
        { num: 4, value: 50 },
        { num: 3, value: 30 },
        { num: 2, value: 15 },
        { num: 1, value: 0 },
      ],
    }
  },
  apollo: {
    facility: {
      query: UserFacilityGql,
      variables() {
        return {
          _id: this.$route.params.id,
        }
      },
    },
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
  head() {
    const text = this.facility.name + ' | Profile'
    const title = text.replace(/^\w|\s\w/g, (w) => w.toUpperCase())
    return {
      title,
    }
  },
}
</script>

<style>
#mgr-profile .biz-logo {
  margin-top: -65px;
  border: 3px solid white;
  border-radius: 50%;
}
</style>
