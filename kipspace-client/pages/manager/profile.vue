<template>
  <div id="mgr-profile">
    <v-sheet tile height="150" color="grey lighten-4">
      <v-img src="/img/chips.png" height="100%"></v-img>
    </v-sheet>

    <v-sheet tile elevation="3">
      <v-container>
        <v-row>
          <v-col cols="5" sm="4" md="3" lg="2">
            <v-avatar
              size="140"
              class="biz-logo"
            >
              <v-img src="/img/pizza.png" alt="alt" />
            </v-avatar>
          </v-col>
          <v-col cols="7" sm="8" md="9" lg="10" class="pt-0">
            <div>
              <div class="title font-weight-bold d-inline mr-sm-5">
                Dominos Pizza
              </div>
              <v-btn 
                color="secondary" 
                depressed 
                class="text-capitalize"
                to="/manager/edit-profile"
              >
                edit profile
              </v-btn>
            </div>
            <v-rating
              :value=4
              half-increments
              color="primary"
              background-color="primary"
              dense
              size="18"
              class="my-1"
            />
            <div class="subtitle-1">
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
              <v-card outlined class="pa-5">
                <v-row>
                  <v-col cols="2">
                    <v-icon color="primary" large>mdi-clock-outline</v-icon>
                  </v-col>
                  <v-col cols="10">
                    <v-row v-for="(open, h) in opening" :key="h">
                      <v-col cols="7" class="py-1">
                        {{open.day}}
                      </v-col>
                      <v-col cols="5" class="py-1">
                        {{open.time}}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-icon color="primary" large>mdi-phone</v-icon>
                  </v-col>
                  <v-col cols="10" class="pt-0">
                    <v-btn 
                      x-large 
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
                    <v-icon color="primary" large>mdi-account-multiple</v-icon>
                  </v-col>
                  <v-col cols="10" class="pt-0">
                    <v-chip 
                      large 
                      color="grey lighten-3"
                      label
                      class="px-10" 
                    >
                      1000
                    </v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="7" lg="8">
              <v-card outlined class="pa-5">
                <div class="title font-weight-bold">
                  Review Summary
                </div>
                <v-row align="center" class="pb-3">
                  <v-col cols="8" md="7" lg="9" class="pt-5">
                    <v-row align="center" v-for="(rate, r) in rating" :key="r">
                      <v-col cols="2" sm="1" md="2" lg="1" class="py-0">
                        {{rate.num}}
                      </v-col>
                      <v-col cols="10" sm="11" md="10" lg="11" class="py-0">
                        <v-progress-linear 
                          :value=rate.value 
                          color="primary" 
                          background-color="secondary"
                          height="10"
                          rounded
                        ></v-progress-linear>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="4" md="5" lg="3" class="text-center">
                    <div class="display-2 font-weight-bold">
                      4.4
                    </div>
                    <v-rating
                      :value=4
                      half-increments
                      color="primary"
                      background-color="primary"
                      dense
                      readonly
                      size="16"
                    />
                    <div class="pt-1">
                      1000 Reviews
                    </div>
                  </v-col>
                </v-row>
                <div v-for="(review, w) in reviews" :key="w">
                  <v-divider></v-divider>
                  <v-card tile flat class="pt-5 pb-3">
                    <div class="font-weight-bold">{{review.name}}</div>
                    <span class="grey--text">{{review.date}}</span>
                    <v-rating
                      :value=review.rating
                      half-increments
                      color="primary"
                      background-color="primary"
                      dense
                      readonly
                      size="16"
                      class="d-inline mx-2"
                    />
                    <div class="py-2">
                      {{review.text}}
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
      { num: 5, value: 100},
      { num: 4, value: 50},
      { num: 3, value: 30},
      { num: 2, value: 15},
      { num: 1, value: 0}
    ],
    opening: [
      { day: 'Monday', time: '9am - 5pm' },
      { day: 'Tuesday', time: '9am - 5pm' },
      { day: 'Wednesday', time: '9am - 5pm' },
      { day: 'Thursday', time: '9am - 5pm' },
      { day: 'Friday', time: '9am - 5pm' },
      { day: 'Saturday', time: '9am - 5pm' }
    ],
    reviews: [
      {
        name: 'Ayobami Muyiwa', rating: 4, date: 'July 1, 2020',
        text: "I've used this app to booked accommodation all around lagos & have had no problems with it so far. I love showing up on the doorstep of the place I have booked & they are expecting me, everything goes smoothly & there are no issues before, during or after my stayReading the reviews from other users is also really helpful so I can get an idea of what to expect of the service/facilities/amenities & surroundings."
      },
      {
        name: 'Ahmed Sulaimon', rating: 3.5, date: 'August 2, 2020',
        text: 'It was an Amazing time!'
      },
      {
        name: 'Gloria Smith', rating: 5, date: 'August 12, 2020',
        text: 'This is the best app in the market. The UI is sleek, beautiful and easy to navigate and use. The suggestions are good. Also it offers lots of filtering options for search results. I wish it had the option to list properties that have good price and are popular as well.'
      },
      {
        name: 'Ubon Jeffery', rating: 4.5, date: 'August 15, 2020',
        text: "In general it is a good app, but has had some annoying issues. If you get a link it will be opened in the browser and not app. Sometimes you you get redirected from the app to the browser, too. It doesn't store the cvc of your card, so what is the point of storing the card if you need it anyway."
      }
    ]
  }),
  head() {
    return {
      title: 'Profile / Facility Manager'
    };
  }
}
</script>

<style>
#mgr-profile .biz-logo {
  margin-top: -65px; 
  border: 10px solid white; 
  border-radius: 50%;
}

</style>