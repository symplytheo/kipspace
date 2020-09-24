<template>
  <v-footer dark color="primary">
    <v-container class="py-5">
      <v-row justify="space-between">
        <v-col cols>
          <v-row>
            <v-col cols="12" md="4" class="px-0">
              <h5 class="ml-3">Facility Managers</h5>
              <div v-if="isLoggedIn">
                <!-- User Faciities' Link -->
                <v-list color="rgba(0,0,0,0)" dense flat>
                  <v-list-item
                    v-for="(item, f) in user.facilities"
                    v-show="user.facilities"
                    :key="f"
                    :to="`/account/facilities/${item._id}`"
                  >
                    <v-list-item-title class="subtitle-1 text-capitalize">
                      {{ item.name }}
                    </v-list-item-title>
                  </v-list-item>
                  <!-- <v-list-item link @click="openCreateFacility">
                    <v-list-item-title class="subtitle-1 text-capitalize">
                      Create Facility
                    </v-list-item-title>
                  </v-list-item> -->
                  <v-list-item link @click="signOut">
                    <v-list-item-title class="subtitle-1 text-capitalize">
                      Log out
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
              <div v-else>
                <v-list color="rgba(0,0,0,0)" dense flat>
                  <v-list-item to="/account/register">
                    <v-list-item-title>Log In</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/account/register">
                    <v-list-item-title>Register</v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </v-col>

            <v-col cols="12" md="4" class="px-0">
              <h5 class="ml-3">Company</h5>
              <v-list color="rgba(0,0,0,0)" dense flat>
                <v-list-item link>
                  <v-list-item-title>About us</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title>Contact us</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="auto">
          <h5>Have a Problem?</h5>
          <div id="sub" class="mt-2">
            <v-text-field solo-inverted placeholder="Enter your email..." flat>
              <v-btn
                slot="append"
                depressed
                color="secondary"
                large
                class="text-capitalize"
              >
                Send
              </v-btn>
            </v-text-field>
          </div>
          <div class="subtitle-2">No Queues. Easy Access. Saves Time</div>
        </v-col>
      </v-row>
      <v-row class="text-center pt-5">
        <v-col>
          <span class="subtitle-2">
            <a href="/" style="color: white">Kipspace</a> &copy; {{ getYear }}.
            All Rights Reserved.
          </span>
        </v-col>
      </v-row>
    </v-container>
    <CreateFacilityDialog />
  </v-footer>
</template>

<script>
export default {
  name: 'view-footer',
  computed: {
    isLoggedIn() {
      return this.$store.state.user.authenticated
    },
    getYear() {
      return new Date().getFullYear()
    },
    user() {
      return this.$store.state.user.profile
    },
  },
  methods: {
    openCreateFacility() {
      this.$store.commit('facility/openDialog')
    },
    async signOut() {
      await this.$apolloHelpers.onLogout().then(() => {
        this.$store.commit('user/setUser', null)
        this.$store.commit('snackbar/show', {
          text: 'Logged out successfully',
          icon: 'success',
        })
        this.$router.go(0)
      })
    },
  },
}
</script>

<style>
#sub .v-text-field__details {
  display: none;
}
#sub .v-input__control > .v-input__slot {
  padding-right: 2px;
}
</style>
