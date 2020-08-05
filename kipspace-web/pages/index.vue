<template>
  <div id="home">
    <v-container style="margin-top: 150px" class="mb-10">
      <v-row justify="center" class="text-center">
        <v-col cols="12" md="10">
          <h1 class="white--text">
            Make a reservation today. <br>
            Kip. Your. Space.
          </h1>
        </v-col>
        <v-col cols="11" sm="8" lg="6">
          <v-text-field
            solo
            rounded
            dense
            flat
            label="Search or type location"
            append-icon="mdi-magnify"
            @keypress.enter="$router.push('/search')"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="my-10">
      <v-card height="600" flat color="transparent"></v-card>
    </v-container>

    <v-container>
      <v-row justify="center" class="mt-10">
        <v-col cols="12" lg="10">
          <v-card class="pa-5 mb-10">
            <h3 class="primary--text text-center">
              Avoid queues<span class="secondary--text">.</span>
            </h3>
            <p class="text-center pt-2">
              With Kipspace, you do not need to worry about waiting in queues. Make reservations and gain easy access into any facility of your choice.
            </p>
            
              <v-img
                src="/ellipse-bg.svg"
                class="pa-10 px-5"
                contain
                height="100%"
                style="background-color"
              >
                <v-row align="center" justify="center" class="mt-">
                  <v-col cols="8" md="6" class="pl-7 pl-sm-10  pt-0">
                    <h4 class="primary--text">
                      A new way to<br> kipspace<span class="secondary--text">.</span>
                    </h4>
                    <h5 class="py-3 font-weight-thin">
                      A digital tool for making reservations and managing facilities.
                    </h5>
                  </v-col>
                  <v-col cols="4" md="6" class="pr-5 pr-md-0 pt-0">
                    <v-img src="/mobile-app.svg" max-height="200" contain></v-img>
                  </v-col>
                </v-row>
              </v-img>
           
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-sheet color="white" tile flat width="100%">
      <v-container class="mt-lg-10">
        <h3>Top Searches</h3>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="12">
            <v-row>
              <v-col cols="6" md="3" v-for="g in 8" :key="g">
                <v-card flat link>
                  <v-img src="/burger.png" :aspect-ratio="17/12"/>
                </v-card>
                <v-row>
                  <v-col cols="7">
                    <h4>Dominos Pizza</h4>
                  </v-col>
                  <v-col cols="5" class="text-right">
                    <v-rating
                      :value=3
                      half-increments
                      background-color="primary"
                      color="primary"
                      dense
                      size="14"
                    ></v-rating>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="my-2">
                <v-pagination 
                  :length="6" 
                  :value=1
                  color="primary"
                  id="pager"
                >
                </v-pagination>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>

export default {
  layout: 'homepage',
  data() {
    return {};
  },
  computed: {},
  methods: {},
  head() {
    return {
      title: 'Home'
    };
  }
};
</script>

<style>
#pager .v-pagination__item, #pager .v-pagination__navigation {
  border-radius: 0;
  box-shadow: none;
  background: transparent!important;
}
#pager .v-pagination__item--active {
  background: transparent!important;
  color: #EA3788;
}

</style>
