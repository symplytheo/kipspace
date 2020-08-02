<template>
  <div id="home">
    <v-img 
      src="/exclude.jpg" 
      class="bg-parallax" 
      style=" width: 100%"
    >
      <v-container style="margin-top: 160px" class="mb-10">
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

      <v-container class="my-10 my-lg-0">
        <v-card height="400" flat color="transparent"></v-card>
      </v-container>

      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" lg="8">
            <v-card class="pa-10 mt-4 mb-10">
              <h3 class="primary--text text-center">
                Avoid queues<span class="secondary--text">.</span>
              </h3>
              <p class="text-center py-3">
                With Kipspace, you do not need to worry about waiting in queues. Make reservations and gain easy access into any facility of your choice.
              </p>
              <v-card flat class="pa-5" color="#F1F1F1">
                <v-row align="center" justify="center">
                  <v-col cols="6" class="px-10">
                    <h4 class="primary--text">
                      A new way to kipspace<span class="secondary--text">.</span>
                    </h4>
                    <p class="py-3">
                      A digital tool for making reservations and managing facilities.
                    </p>
                  </v-col>
                  <v-col cols="6"></v-col>
                </v-row>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h3>Top Searches</h3>
        <v-row justify="center">
          <v-col cols="12" sm="11" md="11" lg="12">
            <v-row>
              <v-col cols="6" sm="6" lg="3" v-for="g in 8" :key="g">
                <v-card flat link>
                  <v-img src="/burger.png" :aspect-ratio="17/12"/>
                </v-card>
                <div class="py-2">
                  <h4 class="d-inline">Dominos Pizza</h4>
                  <v-rating
                    :value=3
                    half-increments
                    background-color="primary"
                    color="primary"
                    dense
                    size="16"
                    class="d-inline float-right"
                  ></v-rating>
                </div>
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
    </v-img>
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

@media screen and (min-width: 1265px) {
  .bg-parallax {
    max-height: 2300px;
  }
}
</style>
