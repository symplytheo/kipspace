<template>
  <div>
    <v-sheet tile width="100%" elevation="3">
      <v-container>
        <v-row justify="center">
          <v-col cols="12">
            <v-slide-group :mobile-breakpoint="900">
              <v-slide-item v-for="(item, i) in categories.items" :key="i">
                <v-card
                  flat
                  class="pa-0 mx-5"
                  style="border-radius: 50px"
                  :to="`/categories/${item._id}`"
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

    <v-container>
      <div class="title font-weight-bold">Top Facilities</div>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col
              v-for="(item, f) in facilities.items
                .slice()
                .reverse()
                .slice(0, 8)"
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
import CategoriesGql from '~/graphql/queries/categories'
import FacilitiesGql from '~/graphql/queries/facilities'

export default {
  data: () => ({
    categories: {
      items: [],
    },
    facilities: {
      items: [],
    },
  }),
  apollo: {
    categories: {
      query: CategoriesGql,
      prefetch: true,
    },
    facilities: {
      query: FacilitiesGql,
      prefetch: true,
    },
  },
  head() {
    return {
      title: 'All Categories',
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
