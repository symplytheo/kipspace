<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="8" lg="7">
        <v-card outlined flat class="pa-10">
          <div class="text-center pb-5 pt-3">
            <h3>Change Password</h3>
          </div>
          <v-row>
            <v-col cols="12">
              <label for="oldPassword">
                <b>Old password</b>
                <v-text-field
                  v-model="oldPassword"
                  placeholder="Enter old password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[
                    (v) => !!v || 'Old password is required',
                    (v) => v !== profile.password || 'Password is incorrect',
                  ]"
                  @click:append="showPassword = !showPassword"
                />
              </label>
            </v-col>
            <v-col cols="12">
              <label for="newPassword">
                <b>New password</b>
                <v-text-field
                  v-model="newPassword"
                  placeholder="Enter old password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[(v) => !!v || 'New password is required']"
                  @click:append="showPassword = !showPassword"
                />
              </label>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn
                block
                large
                color="secondary"
                dark
                depressed
                :loading="loading"
                class="text-capitalize"
                @click="changePassword()"
              >
                Change Password
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileGql from '~/graphql/queries/profile'
import UpdateUserPasswordGql from '~/graphql/mutations/UpdatePassword'

export default {
  data: () => ({
    lodaing: false,
    oldPassword: '',
    newPassword: '',
    showPassword: false,
    profile: {
      password: '',
    },
  }),
  apollo: {
    profile: {
      query: ProfileGql,
    },
  },
  methods: {
    async changePassword() {
      this.loading = true
      const record = {
        password: this.newPassword,
      }
      try {
        await this.$apollo
          .mutate({
            mutation: UpdateUserPasswordGql,
            variables: { record },
          })
          .then(() => {
            this.$store.commit('snackbar/show', {
              text: 'Password was updated successfully',
              icon: 'success',
            })
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
}
</script>

<style></style>
