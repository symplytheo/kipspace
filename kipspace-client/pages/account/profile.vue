<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="7">
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
              <v-text-field
                v-model="user.firstname"
                label="First name"
                counter="32"
                outlined
                :rules="[
                  (v) => !!v || 'First name is required',
                  (v) =>
                    (!!v && v.length <= 32) || 'Not more than 32 characters',
                ]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.lastname"
                label="Last name"
                counter="32"
                outlined
                :rules="[
                  (v) => !!v || 'Last name is required',
                  (v) =>
                    (!!v && v.length <= 32) || 'Not more than 32 characters',
                ]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.email"
                label="Email"
                outlined
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) => (!!v && emailValidation(v)) || 'Email is invalid',
                ]"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.phone"
                label="Phone"
                outlined
                :rules="[(v) => /^\d+$/.test(v) || 'Must be digits (0-9)']"
              />
            </v-col>
          </v-row>
          <v-col cols="12" class="text-center">
            <v-btn
              large
              depressed
              :loading="loading"
              color="secondary"
              @click="updateProfile()"
            >
              Update Profile
            </v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileGql from '~/graphql/queries/profile'
import UpdateProfileGql from '~/graphql/mutations/UpdateProfile'
import { emailValidation } from '~/utils/validation'

export default {
  middleware: ['authenticated'],
  data() {
    return {
      profile: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
      },
      loading: false,
    }
  },
  apollo: {
    profile: {
      query: ProfileGql,
      prefetch: true,
    },
  },
  computed: {
    user() {
      const user = this.profile
      return user
    },
  },
  methods: {
    emailValidation,
    async updateProfile() {
      this.loading = true
      const record = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
      }
      try {
        await this.$apollo
          .mutate({
            mutation: UpdateProfileGql,
            variables: { record },
          })
          .then(() => {
            this.$store.commit('snackbar/show', {
              text: 'Profile was updated successfully',
              icon: 'success',
            })
            this.$router.go(0)
          })
      } catch (error) {
        // eslint-disable-next-line no-unused-vars
        const { response, message } = error
        this.$store.commit('snackbar/show', {
          text: response.data.message,
          icon: 'error',
        })
      } finally {
        this.loading = false
      }
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
