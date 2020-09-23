<template>
  <div id="category">
    <v-container class="py-10">
      <div class="headline font-weight-bold text-capitalize">
        {{ category.name }}
      </div>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col
              v-for="(item, g) in category.facilities.items"
              :key="g"
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
import CategoryGql from '~/graphql/queries/category'

export default {
  data: () => ({
    category: {
      name: '',
      facilities: {
        items: [],
      },
    },
  }),
  apollo: {
    category: {
      query: CategoryGql,
      variables() {
        return {
          filter: {
            _id: this.$route.params.id,
          },
        }
      },
    },
  },
  head() {
    const text = this.category.name
    const title = text.replace(/^\w|\s\w/g, (w) => w.toUpperCase())
    return {
      title,
    }
  },
}
</script>

<style>
#category .category-box {
  border: 1px solid #d1d1d1;
  border-radius: 50px;
  height: 70px;
}
#category .icon-box {
  height: 69px;
  width: 69px;
  display: inline-flex;
  border-radius: 50%;
  background-color: white;
  justify-content: center;
  align-content: center;
}
.pryBd {
  border: 5px solid #360f4f;
}
.greyBd {
  border: 5px solid grey;
}
</style>
