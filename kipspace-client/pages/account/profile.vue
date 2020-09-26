<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card outlined flat class="pa-5 my-10">
          <v-row justify="center" class="text-center">
            <v-col cols="6">
              <v-avatar
                size="140"
                color="primary"
                class="headline white--text font-weight-bold text-uppercase"
              >
                <v-img v-if="user.avatar" :src="user.avatar" />
                <span v-else>
                  {{
                    getInitials(user.firstname ? user.firstname : user.email)
                  }}
                </span>
              </v-avatar>
              <v-btn
                text
                color="primary"
                class="subtitle-2 text-lowercase font-weight-bold"
              >
                <v-icon size="16" color="primary" class="mr-1">
                  mdi-cloud-upload
                </v-icon>
                upload
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="pt-5">
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
            <v-col cols="12">
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
              width="75%"
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
import getInitials from '~/utils/getInitials'

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
      const user = { ...this.profile }
      return user
    },
  },
  methods: {
    getInitials,
    emailValidation,
    async updateProfile() {
      this.loading = true
      //
      const record = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        email: this.user.email,
        phone: this.user.phone,
      }
      try {
        await this.$apollo.mutate({
          mutation: UpdateProfileGql,
          variables: { record },
        })
        //
        this.$store.commit('snackbar/show', {
          text: 'Profile was updated successfully',
          icon: 'success',
        })
        this.loading = false
        this.$router.go(0)
        //
      } catch (error) {
        // eslint-disable-next-line no-unused-vars
        console.log(error)
        this.$store.commit('snackbar/show', {
          text: error,
          icon: 'error',
        })
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
