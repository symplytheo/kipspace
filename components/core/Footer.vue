<template>
  <v-footer dark color="primary">
    <v-container class="py-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="4">
          <v-row>
            <v-col cols="6">
              <h5 class="ml-3">Facility Managers</h5>
              <v-list color="rgba(0,0,0,0)" dense flat>
                <v-list-item link @click="openRegister">
                  <v-list-item-title>Register</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="openLogin">
                  <v-list-item-title>Log In</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="6">
              <h5 class="ml-3">Company</h5>
              <v-list color="rgba(0,0,0,0)" dense flat>
                <v-list-item>
                  <v-list-item-title>About us</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Contact us</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-none d-sm-flex" sm="1" md="4" ></v-col>
        <v-col cols="9" sm="4" md="4" lg="3" class="pt-6 pl-7 pl-sm-0">
          <h5>Have a Problem?</h5>
          <v-card outlined light class="pl-3 pa-0 my-2" height="40">
            <v-row id="sub">
              <v-col cols="9" class="pa-0">
                <v-text-field
                  solo
                  flat
                  dense
                  label="Your Email"
                ></v-text-field>
              </v-col>
              <v-col cols="3" class="pa-0">
                <v-btn 
                  dark
                  tile 
                  block
                  depressed
                  color="secondary"
                  style="border-radius: 0px 5px 5px 0px" 
                  class="py-5 ml-0 text-capitalize"
                >
                  Send
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
          <div class="py-0">
            <small>
              No Queues. Easy Access. Saves Time
            </small>
          </div>
        </v-col>
      </v-row>
      <v-row class="text-center pt-5">
        <v-col>
          <small>
            Kipspace &copy;{{ new Date().getFullYear() }}. 
            All Rights Reserved.
          </small>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  components: {
    SignIn: () => import('~/components/dialog/Login'),
    SignUp: () => import('~/components/dialog/Register')
  },
  data: () => ({
    //
  }),
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
  ...mapMutations({
      openLogin: 'openLoginDialog',
      openRegister: 'openRegDialog'
    })
  }
};
</script>

<style>
#sub {
  margin-top: -1px
}
#sub .v-input__control {
  height: 37px;
}
</style>
