<template>
  <v-card outlined>
    <v-card flat color="grey lighten-3">
      <v-img :src="facility.cover && facility.cover" height="200">
        <template v-slot:placeholder>
          <v-row class="fill-height" justify="center" align="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
    </v-card>
    <v-card-text class="text--primary">
      <div class="subtitle-1 font-weight-bold text-capitalize">
        {{ facility.name }}
      </div>
      <div>
        <v-rating
          :value="averageRating"
          color="primary"
          background-color="primary"
          half-increments
          dense
          readonly
          size="20"
        />
      </div>
      <div class="py-1">
        {{
          `${facility.location.address}, 
          ${facility.location.city}, 
          ${facility.location.state},  
          ${facility.location.country.name}`
        }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
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
