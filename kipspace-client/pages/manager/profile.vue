<template>
  <div id="mgr-profile">
    <v-sheet tile height="160" color="grey lighten-4">
      <v-img src="/img/chips.png" height="100%" />
    </v-sheet>
    <v-sheet tile elevation="3">
      <v-container fluid class="px-sm-10">
        <v-row>
          <v-col cols="4" sm="3" class="pl-0">
            <v-avatar size="130" class="biz-logo">
              <v-img src="/img/mcdonald-icon.png" alt="alt" />
            </v-avatar>
          </v-col>
          <v-col cols="8" sm="9" class="pt-0 pl-8 pl-sm-0">
            <div class="subtitle-1 font-weight-bold">Dominos Pizza</div>
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
              No. 6 Adenuga street, Ibara-expressway, Lagos State.
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
              <v-card outlined class="pa-3">
                <v-row>
                  <v-col cols="2">
                    <v-icon color="primary" size="28">
                      mdi-clock-outline
                    </v-icon>
                  </v-col>
                  <v-col cols="10" class="pt-3">
                    <v-row v-for="(open, h) in opening" :key="h">
                      <v-col cols="6" class="pt-1">
                        {{ open.day }}
                      </v-col>
                      <v-col cols="6" class="pt-1">
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
                        ></v-progress-linear>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="5" class="text-center">
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
                <div v-for="(review, w) in reviews" :key="w">
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'manager',
  data: () => ({
    rating: [
      { num: 5, value: 100 },
      { num: 4, value: 50 },
      { num: 3, value: 30 },
      { num: 2, value: 15 },
      { num: 1, value: 0 },
    ],
    opening: [
      { day: 'Monday', time: '9am - 5pm' },
      { day: 'Tuesday', time: '9am - 5pm' },
      { day: 'Wednesday', time: '9am - 5pm' },
      { day: 'Thursday', time: '9am - 5pm' },
      { day: 'Friday', time: '9am - 5pm' },
      { day: 'Saturday', time: '9am - 5pm' },
    ],
    reviews: [
      {
        name: 'Ayobami Muyiwa',
        rating: 4,
        date: 'July 1, 2020',
        text:
          "I've used this app to booked accommodation all around lagos & have had no problems with it so far. I love showing up on the doorstep of the place I have booked & they are expecting me, everything goes smoothly & there are no issues before, during or after my stayReading the reviews from other users is also really helpful so I can get an idea of what to expect of the service/facilities/amenities & surroundings.",
      },
      {
        name: 'Ahmed Sulaimon',
        rating: 3.5,
        date: 'August 2, 2020',
        text: 'It was an Amazing time!',
      },
      {
        name: 'Gloria Smith',
        rating: 5,
        date: 'August 12, 2020',
        text:
          'This is the best app in the market. The UI is sleek, beautiful and easy to navigate and use. The suggestions are good. Also it offers lots of filtering options for search results. I wish it had the option to list properties that have good price and are popular as well.',
      },
      {
        name: 'Ubon Jeffery',
        rating: 4.5,
        date: 'August 15, 2020',
        text:
          "In general it is a good app, but has had some annoying issues. If you get a link it will be opened in the browser and not app. Sometimes you you get redirected from the app to the browser, too. It doesn't store the cvc of your card, so what is the point of storing the card if you need it anyway.",
      },
    ],
  }),
  head() {
    return {
      title: 'Profile / Facility Manager',
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
