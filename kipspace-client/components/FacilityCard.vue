<template>
  <v-card flat>
    <v-card flat :to="`/facilities/${facility._id}`" color="grey lighten-3">
      <v-img :src="facility.cover && facility.cover" :aspect-ratio="17 / 12">
        <template v-slot:placeholder>
          <v-row class="fill-height" justify="center" align="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
    </v-card>
    <v-card-text class="px-0">
      <v-row no-gutters align="center">
        <v-col>
          <h4 class="text-truncate text-capitalize">{{ facility.name }}</h4>
        </v-col>
        <v-col cols="auto" class="text-right pl-0">
          <v-rating
            :value="averageRating"
            readonly
            half-increments
            background-color="primary"
            color="primary"
            dense
            size="14"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'facility-card',
  props: {
    facility: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    averageRating() {
      let sum = 0
      for (const item in this.facility.reviews) sum += item.rating
      const length = this.facility.reviews.length
      const average = sum / (length !== 0 ? length : 1) // 0/0 is NaN
      return average
    },
  },
}
</script>

<style></style>
