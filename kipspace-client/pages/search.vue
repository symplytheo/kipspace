<template>
  <div id="search">
    <v-sheet tile width="100%" elevation="3">
      <v-container>
        <v-row justify="center">
          <v-col cols="11" sm="8" lg="6" class="pt-5">
            <v-text-field
              outlined
              rounded
              placeholder="search or type location"
              append-icon="mdi-magnify"
            />
          </v-col>
          <v-col cols="12">
            <v-slide-group :mobile-breakpoint="900">
              <v-slide-item v-for="(item, i) in categories.items" :key="i">
                <v-card
                  flat
                  class="pa-0 mx-5"
                  style="border-radius: 50px"
                  :to="`/category/${item.name
                    .replace(/(\s&\s)|(,\s)|\s/g, '-')
                    .toLowerCase()}`"
                >
                  <div class="category-box d-flex align-center pr-5">
                    <div class="icon-box">
                      <v-icon color="primary" large>
                        {{ item.icon }}
                      </v-icon>
                    </div>
                    <h4 class="d-inline ml-3 primary--text text-capitalize">
                      {{ item.name }}
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
      <div class="mb-5 ml-3 title font-weight-bold">Results</div>
      <v-slide-group :mobile-breakpoint="900">
        <v-slide-item v-for="i in 10" :key="i">
          <v-card outlined flat width="250" class="mx-3">
            <v-img src="/img/pizza.png" :aspect-ratio="16 / 9" class="pt-5">
            </v-img>
            <v-card-text class="black--text">
              <div class="subtitle-1 font-weight-bold">Dominos Pizza</div>
              <div class="py-2">
                No. 6 Adenuga street, Ibara-expressway, Lagos State.
              </div>
              <div><b>Capacity:</b> 250</div>
              <div class="py-2">
                <b>Rating:</b>
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
      <div class="title font-weight-bold">Top Searches</div>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col
              v-for="(item, f) in facilities.items"
              :key="f"
              cols="6"
              md="3"
            >
              <FacilityCard :facility="item" />
            </v-col>
            <v-col cols="12" class="my-2">
              <v-pagination
                :length="6"
                :value="1"
                color="primary"
                class="pagination"
              />
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
      return this.$store.state.category.categories
    },
    facilities() {
      return this.$store.state.facility.facilities
    },
  },
  head() {
    return {
      title: 'Search',
    }
  },
}
</script>

<style>
.category-box {
  border: 1px solid #d1d1d1;
  border-radius: 50px;
  height: 70px;
}
.icon-box {
  border: 5px solid #360f4f;
  height: 69px;
  width: 69px;
  display: inline-flex;
  border-radius: 50%;
  background-color: white;
  justify-content: center;
  align-content: center;
}
</style>
