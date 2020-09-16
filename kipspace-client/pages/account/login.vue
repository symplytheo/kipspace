<template>
  <v-row justify="center">
    <v-col cols="10" lg="4" md="6" sm="8">
      <h2 class="white--text mb-10">Log In</h2>
      <v-form ref="login" v-model="loginForm" class="mt-10">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field
              id="login-email"
              v-model="email"
              placeholder="someone@example.com"
              dark
              :rules="[
                (v) => !!v || 'Email address required',
                (v) => (!!v && emailValidation(v)) || 'Email is invalid',
              ]"
            />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              id="login-password"
              v-model="pwd"
              placeholder="password"
              dark
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              :rules="[(v) => !!v || 'Password is required']"
              @click:append="showPwd = !showPwd"
            ></v-text-field>
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
              :disabled="!loginForm"
              :loading="loading"
              class="text-capitalize"
              @click="processLogin()"
            >
              Log in
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- === -->

      <v-row class="mt-3">
        <v-col cols="12" class="text-center pb-0">
          <div class="font-weight-medium white--text">or sign in using</div>
          <v-row justify="center" align="center" class="py-5">
            <v-btn depressed fab color="transparent" class="mx-3">
              <v-avatar size="40">
                <v-img src="/img/google.png"></v-img>
              </v-avatar>
            </v-btn>
            <div class="white--text">or</div>
            <v-btn depressed fab color="transparent" class="mx-3">
              <v-avatar size="42">
                <v-img src="/img/facebook.png"></v-img>
              </v-avatar>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { emailValidation } from '~/utils/validation'
import ProfileGql from '~/graphql/queries/profile'

export default {
  layout: 'blank',
  data() {
    return {
      email: '',
      pwd: '',
      showPwd: false,
      loginForm: false,
      loading: false,
    }
  },
  methods: {
    emailValidation,
    async processLogin() {
      try {
        this.loading = true

        const { data } = await this.$axios.post('/v1/login', {
          email: this.email,
          password: this.pwd,
        })

        this.$apolloHelpers.onLogin(data.token)

        // hack to clear graphql store
        const client = this.$apollo.provider.defaultClient
        await client.queryManager.fetchQueryRejectFns
        await client.clearStore()

        const userData = await this.$apollo.query({ query: ProfileGql })

        console.log(userData)

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
