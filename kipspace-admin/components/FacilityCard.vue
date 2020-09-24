<template>
  <v-card outlined>
    <v-img :src="facility.cover" height="200">
      <template v-slot:placeholder>
        <v-row justify="center" align="center" class="fill-height">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>
    <v-card-text class="text--primary">
      <div class="subtitle-1 font-weight-bold">{{ facility.name }}</div>
      <div>
        <v-rating
          :value="facility.rating"
          color="primary"
          background-color="primary"
          half-increments
          dense
          size="20"
        />
      </div>
      <div class="py-1">{{ facility.address }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    facility: {
      type: Object,
      default: () => ({
        name: 'Dominos Pizza',
        cover: '/burger.png',
        rating: 4.2,
        address: '23 Adesanya Street, Ibara-expressway, Lagos State.',
      }),
    },
  },
}
</script>

<style></style>
