<template>
  <div id="notifications">
    <v-container class="text-center pt-5 pb-10 my-10">
      <v-row justify="center">
        <v-col cols="9" sm="7" md="6" lg="5">
          <h4>You have a new notification!</h4>
          <p class="py-10">
            You have to be at First bank, No. 6 Adenuga street,
            ibara-expressway, lagos state by 1:00pm today.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Notifications',
    }
  },
}
</script>

<style></style>
