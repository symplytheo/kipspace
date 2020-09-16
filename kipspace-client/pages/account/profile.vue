<template>
  <div id="profile">
    <v-container>
      <v-card outlined flat class="pa-10">
        <v-row justify="center" class="text-center">
          <v-col cols="6">
            <v-avatar size="160">
              <v-img src="/img/lamp.jpg" alt="alt">
                <v-row align="end" justify="center" class="fill-height">
                  <v-btn
                    color="rgba(255,255,255,0.35)"
                    class="mx-2"
                    depressed
                    block
                  >
                    <v-icon size="30" color="primary">mdi-camera</v-icon>
                  </v-btn>
                </v-row>
              </v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row class="pt-5">
          <v-col cols="12" sm="6">
            <label for="firstname">
              <b>First name</b>
              <v-text-field
                v-model="firstname"
                outlined
                placeholder="enter first name"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="lastname">
              <b>Last name</b>
              <v-text-field
                v-model="lastname"
                outlined
                placeholder="enter last name"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="email">
              <b>Email</b>
              <v-text-field
                v-model="email"
                outlined
                placeholder="someone@exmaple.com"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="location">
              <b>Location</b>
              <v-text-field
                v-model="location"
                outlined
                placeholder="enter location"
              ></v-text-field>
            </label>
          </v-col>
        </v-row>
        <div class="text-center pb-5 pt-3">
          <h3>Change password?</h3>
        </div>
        <v-row>
          <v-col cols="12" sm="6">
            <label for="pwd">
              <b>Old password</b>
              <v-text-field
                v-model="pwd"
                outlined
                placeholder="enter old password"
              ></v-text-field>
            </label>
          </v-col>
          <v-col cols="12" sm="6">
            <label for="pwd2">
              <b>New password</b>
              <v-text-field
                v-model="pwd2"
                outlined
                placeholder="enter new password"
              ></v-text-field>
            </label>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn color="secondary" class="text-capitalize" depressed large>
            Save Profile
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ProfileGql from '~/graphql/queries/profile'

export default {
  middleware: ['authenticated'],
  data() {
    return {
      profile: {
        firstname: '',
        lastname: '',
        email: '',
        location: '',
        pwd: '',
        pwd2: '',
      },
    }
  },
  apollo: {
    profile: {
      query: ProfileGql,
      prefetch: true,
    },
  },
  head() {
    return {
      title: 'My profile',
    }
  },
}
</script>

<style></style>
