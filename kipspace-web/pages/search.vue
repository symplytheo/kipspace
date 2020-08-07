<template>
  <div id="search">
    <v-sheet tile width="100%" elevation="3">
      <v-container>
        <v-row justify="center">
          <v-col cols="10" sm="8" lg="6" class="pt-5">
            <v-text-field
              outlined
              rounded
              placeholder="search or type location"
              append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-slide-group 
              :mobile-break-point="900"
            >
              <v-slide-item v-for="(item, i) in categories" :key="i">
                <v-card 
                  flat 
                  class="pa-0 mx-5" 
                  style="border-radius: 50px" 
                  :to="`/category/${item.slug}`"
                >
                  <div class="category-box d-flex align-center pr-5">
                    <div class="icon-box">
                      <v-icon color="primary" large>
                        {{item.icon}}
                      </v-icon>
                    </div>
                    <h4 class="d-inline ml-3 primary--text">
                      {{item.text}}
                    </h4>
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-container class="py-10">
      <h3 class="mb-5 ml-3">Results</h3>
      <v-slide-group>
        <v-slide-item v-for="i in 10" :key="i">
          <v-card outlined flat width="250" class="mx-3">
            <v-img src="/img/pizza.png" :aspect-ratio="16/9" class="pt-5">
            </v-img>
            <v-card-text class="black--text pl-10">
              <h3>Dominos Pizza</h3>
              <div class="py-2">
                No. 6 Adenuga street, Ibara-expressway, Lagos State.
              </div>
              <div>
                <b>Capacity:</b> 250
              </div>
              <div class="py-2">
                <b>Rating:</b> 
                <v-rating
                  value=4
                  half-increments
                  color="primary"
                  background-color="primary"
                  dense
                  size="16"
                  class="d-inline"
                ></v-rating>
              </div>
              <div>
                <v-btn 
                  color="secondary"
                  class="text-capitalize"
                  depressed
                  to="/make-reservation"
                >
                  Reserve
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>

    <v-container>
      <h3>Top Searches</h3>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col cols="6" md="3" v-for="g in 8" :key="g">
              <v-card flat link>
                <v-img src="/img/burger.png" :aspect-ratio="17/12"/>
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
                id="page"
              >
              </v-pagination>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  },
  head() {
    return {
      title: 'Search'
    };
  }
}
</script>

<style>
.category-box {
  border: 1px solid #D1D1D1;
  border-radius: 50px;
  height: 70px;
}
.icon-box {
  border: 5px solid #360F4F;
  height: 69px;
  width: 69px;
  display: inline-flex;
  border-radius: 50%;
  background-color: white;
  justify-content: center;
  align-content: center;
}

#page .v-pagination__item, #page .v-pagination__navigation {
  border-radius: 0;
  box-shadow: none;
  background: transparent!important;
}
#page .v-pagination__item--active {
  background: transparent!important;
  color: #EA3788;
}
</style>