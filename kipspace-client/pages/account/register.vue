<template>
  <v-row justify="center">
    <v-col cols="12" class="text-right">
      <v-btn
        depressed
        color="secondary"
        class="text-capitalize"
        to="/account/login"
      >
        Log in
      </v-btn>
    </v-col>
    <v-col cols="10" lg="4" md="6" sm="8">
      <div class="headline white--text font-weight-bold mb-3">
        Create Account
      </div>
      <v-form v-model="regForm">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="email"
              placeholder="Email address"
              dark
              :rules="[
                (v) => !!v || 'Email address is required',
                (v) => (!!v && emailValidation(v)) || 'Email is invalid',
              ]"
            />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              v-model="password"
              placeholder="Password"
              dark
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[(v) => !!v || 'Password is required']"
              @click:append="showPassword = !showPassword"
            />
          </v-col>
          <v-col cols="12" class="py-0 text-center">
            <v-row
              justify="center"
              align="center"
              class="caption white--text my-3"
            >
              By continuing, you agree to our
              <v-btn
                text
                small
                class="text-capitalize"
                color="secondary"
                to="/terms"
              >
                Terms of Service
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-btn
              block
              large
              color="secondary"
              dark
              depressed
              :disabled="!regForm"
              :loading="loading"
              class="text-capitalize"
              @click="processRegister()"
            >
              Create Account
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { emailValidation } from '~/utils/validation'
import ProfileGql from '~/graphql/queries/profile'

export default {
  layout: 'user-auth',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      regForm: false,
      loading: false,
    }
  },
  methods: {
    emailValidation,
    async processRegister() {
      try {
        this.loading = true

        const { data } = await this.$axios.post('/v1/user', {
          email: this.email,
          password: this.password,
        })

        this.$apolloHelpers.onLogin(data.token)

        // hack to clear graphql store
        const client = this.$apollo.provider.defaultClient
        await client.queryManager.fetchQueryRejectFns
        await client.clearStore()

        const userData = await this.$apollo.query({ query: ProfileGql })

        this.$store.commit('user/setUser', userData.data.profile)
        this.$router.replace(this.$router.history.current.query.redirect || '/')
      } catch (error) {
        // process error
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
