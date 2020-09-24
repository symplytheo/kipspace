<template>
  <v-card flat :to="`/facilities/${facility._id}`">
    <v-img
      :src="facility.cover ? facility.cover : '/img/burger.png'"
      :aspect-ratio="17 / 12"
      class="card-cover"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height" justify="center" align="center">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>
    <v-card-text class="px-0">
      <v-row no-gutters align="center">
        <v-col>
          <h4 class="text-truncate text-capitalize">{{ facility.name }}</h4>
        </v-col>
        <v-col cols="auto" class="text-right pl-0">
          <v-rating
            :value="4.2"
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
      default() {
        return {
          name: 'Dominos Pizza',
          cover: '/img/burger.png',
        }
      },
    },
  },
}
</script>

<style>
.card-cover {
  border-radius: 5px;
}
</style>
