<template>
  <div id="active">
    <v-container>
      <v-row justify="center">
        <v-col sm="10" md="12" lg="10">
          <div class="my-3">
            <h3>Active Reservations</h3>
          </div>
          <v-card outlined>
            <v-row>
              <v-col
                v-for="(item, m) in active.slice().reverse()"
                :key="m"
                cols="12"
              >
                <v-row class="px-3">
                  <v-col cols="5" class="py-0">
                    {{ item.date_reserved.substr(0, 10) }}
                  </v-col>
                  <v-col cols="4" class="py-0">{{ item.time_reserved }}</v-col>
                  <v-col cols="3" class="py-0">
                    <v-icon right color="primary">
                      mdi-account-multiple
                    </v-icon>
                    {{ item.seats }}
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <div class="text-capitalize">
                      {{ item.facility.name }}
                    </div>
                    <div>
                      {{
                        `${item.facility.location.address}, 
                          ${item.facility.location.city}, 
                          ${item.facility.location.state}`
                      }}
                    </div>
                  </v-col>
                  <v-col cols="4" class="py-0">
                    <v-img :src="item.barcode_url" height="100" contain />
                  </v-col>
                  <v-col cols="12" class="pt-0 pl-0">
                    <v-btn
                      depressed
                      color="secondary"
                      class="ma-2"
                      @click="cancelReservation(item.code)"
                    >
                      Cancel Reservation
                    </v-btn>
                  </v-col>
                </v-row>
                <v-divider />
              </v-col>
            </v-row>
            <v-card-text>
              <v-pagination
                color="primary"
                :value="1"
                :total-visible="5"
                :length="12"
                class="pagination"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CancelReservationGql from '~/graphql/mutations/CancelReservation'

export default {
  middleware: ['authenticated'],
  data: () => ({
    loading: false,
  }),
  computed: {
    reservations() {
      return this.$store.state.user.profile.reservations
    },
    active() {
      return this.reservations.filter((el) => el.current_status === 'PENDING')
    },
  },
  methods: {
    async cancelReservation(code) {
      this.dialog = false
      this.loading = true

      //
      try {
        await this.$apollo.mutate({
          mutation: CancelReservationGql,
          variables: { code },
        })
        this.$store.commit('snackbar/show', {
          text: 'Reservation has been cancelled',
          icon: 'success',
        })
        this.$router.go(0)
        //
      } catch (error) {
        console.log(error)
        this.$store.commit('snackbar/show', {
          text: error,
          icon: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
  head() {
    return {
      title: 'Active Reservations',
    }
  },
}
</script>

<style></style>
