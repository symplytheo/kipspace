<template>
  <div id="active">
    <v-container>
      <v-row justify="center">
        <v-col sm="10" md="12" lg="10">
          <div class="my-3">
            <h3>Active Reservations</h3>
          </div>
          <v-card outlined>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr
                    v-for="(item, m) in active.slice().reverse()"
                    :key="m"
                    class="tablerow"
                  >
                    <td class="py-2">
                      <div class="text-capitalize">
                        {{ item.facility.name }}
                      </div>
                      <div>
                        {{
                          item.facility.location.address +
                          ', ' +
                          item.facility.location.city +
                          ', ' +
                          item.facility.location.state
                        }}
                      </div>
                    </td>
                    <td>
                      <v-icon right color="primary">
                        mdi-account-multiple </v-icon
                      >{{ item.seats }}
                    </td>
                    <td>{{ item.date_reserved.substr(0, 10) }}</td>
                    <td>{{ item.time_reserved }}</td>
                    <td class="py-2">
                      <v-img
                        src="/img/qr-code-black.png"
                        height="100"
                        contain
                      />
                    </td>
                    <td>
                      <v-btn text small color="secondary"> CANCEL </v-btn>
                    </td>
                  </tr>
                  <tr />
                </tbody>
              </template>
            </v-simple-table>
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
export default {
  computed: {
    reservations() {
      return this.$store.state.user.profile.reservations
    },
    active() {
      return this.reservations.filter((el) => el.current_status === 'PENDING')
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
