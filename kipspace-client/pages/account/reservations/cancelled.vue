<template>
  <div id="cancelled">
    <v-container>
      <v-row justify="center">
        <v-col sm="10" md="12" lg="10">
          <div class="my-3">
            <h3 class="d-inline">Cancelled Reservations</h3>
            <v-btn
              class="float-right font-weight-bold text-capitalize"
              text
              color="grey"
            >
              <u>Clear List</u>
            </v-btn>
          </div>
          <v-card outlined>
            <v-row>
              <v-col
                v-for="(item, m) in cancelled.slice().reverse()"
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
                  <v-col cols="12" class="pt-0 pl-0">
                    <v-btn depressed color="grey" class="ma-2">
                      Renew Reservation
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
          <div class="grey--text py-5 text-center">
            Cancelled reservations clear after 30 days
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  computed: {
    reservations() {
      return this.$store.state.user.profile.reservations
    },
    cancelled() {
      return this.reservations.filter((el) => el.current_status === 'CANCELED')
    },
  },
  head() {
    return {
      title: 'Cancelled Reservations',
    }
  },
}
</script>

<style></style>
