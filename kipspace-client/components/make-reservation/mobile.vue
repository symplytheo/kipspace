<template>
  <div class="hidden-md-and-up" id="mobile">
    <v-container class="px-sm-10">
      <v-row>
        <v-col cols="4" class="py-3">
          <v-select
            :items="['today', 'tomorrow']"
            label="select day"
            solo
            flat
          ></v-select>
        </v-col>
        <v-col cols="3" class="py-3">
          <v-dialog
            ref="timeModal"
            v-model="selectTime"
            :return-value.sync="time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{on}">
              <v-btn
                height="48"
                text
                block
                depressed
                class="text-lowercase time-btn"
                style="border: 1px solid #D1D1D1"
                v-on="on"
                :class="!time?'grey--text': ''"
              >
                {{ time ? time : 'time' }}
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-time-picker
              v-model="time"
              v-if="selectTime"
              color="primary"
              ampm-in-title            
            >
              <v-spacer></v-spacer>
              <v-btn 
                text 
                color="primary" 
                @click="selectTime = false"
              >
                Cancel
              </v-btn>
              <v-btn 
                text 
                color="primary" 
                @click="$refs.timeModal.save(time)"
              >
                Save
              </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col cols="5" class="py-3">
          <v-select
            :items="['1 seat', '2 seats', '3 seats', '4 seats', '5 seats']"
            label="no. of seats"
            class=""
            solo
            flat
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            :items="['15 mins before','30 mins before','1 hour before','2 hours before']"
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
          class="subtitle-1 text-capitalize font-weight-bold"
          v-for="tab in ['Overview', 'Reviews']"
          :key="tab"
        >
         {{ tab }}
        </v-tab>

        <v-tab-item>
          <v-sheet tile height="180" color="grey lighten-4">
            <v-img src="/img/chips.png" height="100%" />
          </v-sheet>
          <v-sheet tile elevation="3">
            <v-container class="px-10">
              <v-row>
                <v-col cols="5" sm="4">
                  <v-avatar
                    size="150"
                    class="biz-logo"
                  >
                    <v-img src="/img/mcdonald-icon.png" alt="alt"/>
                  </v-avatar>
                </v-col>
                <v-col cols="7" sm="8" class="pt-0">
                  <div class="title font-weight-bold">Dominos Pizza</div>
                  <div class="pt-1">
                    <v-rating
                      :value=4
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
                    No. 6 Adenuga street, Ibara-expressway, Lagos State.
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>

          <v-container class="py-10">
            <v-row justify="center">
              <v-col cols="10">
                <v-card outlined class="px-5 py-3">
                  <v-row>
                    <v-col cols="2">
                      <v-icon color="primary" size="28">mdi-clock-outline</v-icon>
                    </v-col>
                    <v-col cols="10" class="pt-3">
                      <v-row v-for="(open, h) in opening" :key="h">
                        <v-col cols="7" class="pt-1">
                          {{open.day}}
                        </v-col>
                        <v-col cols="5" class="pt-1">
                          {{open.time}}
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
                      <v-icon color="primary" size="28">mdi-account-multiple</v-icon>
                    </v-col>
                    <v-col cols="10" class="pt-2">
                      <v-chip 
                        color="grey lighten-3"
                        label
                        class="px-10 py-5" 
                      >
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
              <v-col cols="12" class="pt-0">
                <v-card outlined class="pa-5 pb-2">
                  <div class="title font-weight-bold">Review Summary</div>
                  <v-row align="center" class="pb-3">
                    <v-col cols="8" class="pt-5">
                      <v-row align="center" v-for="(rate, r) in rating" :key="r">
                        <v-col cols="1" class="py-0">
                          {{rate.num}}
                        </v-col>
                        <v-col cols="11" class="py-0">
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
                    <v-col cols="4" class="text-center">
                      <div class="display-1 font-weight-bold">
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
                      <h4 class="">1000 Reviews</h4>
                    </v-col>
                  </v-row>
                  <div v-for="(review, w) in reviews" :key="w">
                    <v-divider />
                    <v-card tile flat class="pt-5 pb-3">
                      <div class="subtitle-1 font-weight-bold">
                        {{review.name}}
                      </div>
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
                      ></v-rating>
                      <div class="py-2">
                        {{review.text}}
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
  data: () => ({
    time: null,
    selectTime: false,
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
  })
}
</script>

<style>
#mobile .biz-logo {
  margin-top: -65px; 
  border: 7px solid white; 
  border-radius: 50%;
}
#mobile .v-input__control {
  height: 48px
}
#mobile .v-text-field--solo.v-select {
  border: 1px solid #D1D1D1
}
</style>