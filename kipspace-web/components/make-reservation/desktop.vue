<template>
  <div class="hidden-sm-and-down" id="desktop">
    <v-sheet tile height="180" color="grey lighten-5">
      <v-img src="/img/chips.png" height="180">
        <v-row justify="center" align="center" class="fill-height">
          <v-col md="10" lg="8">
            <v-card 
              class="reserve-box pa-0 pl-8 mb-5" 
              height="48"
              flat
            >
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
                    <template v-slot:activator="{on}">
                      <v-btn
                        text
                        tile
                        depressed
                        height="48"
                        width="100%"
                        class="time-btn"
                        v-on="on"
                        :color="!time?'grey darken-1':'black'"
                        style="border-right: 2px solid #DEDEDE"
                      >
                        {{ time ? time : 'pick time' }}
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
                        class="font-weight-bold"
                      >
                        Cancel
                      </v-btn>
                      <v-btn 
                        text 
                        color="primary" 
                        @click="$refs.timeModal.save(time)"
                        class="font-weight-bold"
                      >
                        Save
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </v-col>
                <v-col class="pa-0">
                  <v-select
                    :items="['1 seat', '2 seats', '3 seats', '4 seats', '5 seats']"
                    label="no. of seats"
                    class=""
                    solo
                    flat
                  ></v-select>
                </v-col>
                <v-col class="pa-0" cols="3">
                  <v-select
                    :items="['15 mins before','30 mins before','1 hour before','2 hours before']"
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
                    class="reserve-btn"
                    width="100%"
                    height="48"
                  >Reserve</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-img>
    </v-sheet>
    <v-sheet tile elevation="3">
      <v-container>
        <v-row>
          <v-col md="3" lg="2">
            <v-avatar
              size="160"
              class="biz-logo"
            >
              <img src="/img/mcdonald-icon.png" alt="alt"/>
            </v-avatar>
          </v-col>
          <v-col md="9" lg="10" class="pt-0">
            <h3>Dominos Pizza</h3>
            <div class="pt-1">
              
              <v-rating
                value=4
                half-increments
                color="primary"
                background-color="primary"
                dense
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
        <v-col md="7" lg="8">
          <v-card outlined class="pa-5">
            <h3>Review Summary</h3>
            <v-row align="center" class="pb-3">
              <v-col md="7" lg="9" class="pt-5">
                <v-row align="center" v-for="(rate, r) in rating" :key="r">
                  <v-col md="2" lg="1" class="py-0">
                    {{rate.num}}
                  </v-col>
                  <v-col md="10" lg="11" class="py-0">
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
              <v-col md="5" lg="3" class="text-center">
                <h1 style="font-size: 60px">
                  4.4
                </h1>
                <v-rating
                  value=4
                  half-increments
                  color="primary"
                  background-color="primary"
                  dense
                  size="18"
                ></v-rating>
                <h4>1000 Reviews</h4>
              </v-col>
            </v-row>
            <div v-for="(review, w) in reviews" :key="w">
              <v-divider></v-divider>
              <v-card tile flat class="pt-5 pb-3">
                <h4>{{review.name}}</h4>
                <span class="grey--text">{{review.date}}</span>
                <v-rating
                  :value=review.rating
                  half-increments
                  color="primary"
                  background-color="primary"
                  dense
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
#desktop .biz-logo {
  margin-top: -65px; 
  border: 10px solid white; 
  border-radius: 50%;
}
#desktop .reserve-box {
  border-radius: 50px!important
}
#desktop .reserve-box .v-input__slot {
  border-right: 2px solid #DEDEDE;
  border-radius:0%
}
#desktop .time-btn {
  text-transform: lowercase;
  border-right: 2px solid #DEDEDE;
}
#desktop .time-btn::before {
  background-color: transparent!important;
}
#desktop .reserve-btn-col {
  background: #EA3788; 
  height: 48px; 
  border-radius: 0px 50px 50px 0px;
}
#desktop .reserve-btn {
  text-transform: capitalize;
  border-radius: 0px 50px 50px 0px;
}
</style>