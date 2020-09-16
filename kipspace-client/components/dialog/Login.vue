<template>
  <v-dialog v-model="loginDialog" fullscreen hide-overlay>
    <v-card flat color="primary" tile dark>
      <v-toolbar color="transparent" flat>
        <v-btn icon color="white">
          <v-icon size="30" @click="close">mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="secondary"
          class="text-capitalize"
          @click="close() + openRegister()"
        >
          Create Account
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row justify="center">
          <v-col cols="10" sm="8" md="5" lg="4">
            <h2 class="white--text mb-10">Log In</h2>
            <v-form v-model="loginForm" class="mt-10">
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="email"
                    placeholder="someone@example.com"
                    :rules="[(v) => !!v || 'Email is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="password"
                    placeholder="password"
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPwd ? 'text' : 'password'"
                    :rules="[(v) => !!v || 'Password is required']"
                    @click:append="showPwd = !showPwd"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    large
                    color="secondary"
                    dark
                    class="text-capitalize"
                    :loading="processing"
                    :disabled="!loginForm"
                    @click="processLogin"
                  >
                    Log in
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center pb-0">
                  <h3 class="font-weight-medium">or sign in using</h3>
                  <div class="py-5">
                    <v-btn depressed fab color="transparent" class="mx-3">
                      <v-avatar size="40">
                        <v-img src="/img/google.png"></v-img>
                      </v-avatar>
                    </v-btn>
                    or
                    <v-btn depressed fab color="transparent" class="mx-3">
                      <v-avatar size="42">
                        <v-img src="/img/facebook.png"></v-img>
                      </v-avatar>
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" class="py-0 text-center">
                  by continuing, you agree to our
                  <v-btn
                    color="grey lighten-1"
                    text
                    class="pl-0 btn-term text-capitalize"
                    style="font-size: 14px"
                    to="/terms"
                    @click="close"
                  >
                    terms of service
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- dialog -->
    <Register />
  </v-dialog>
</template>

<script>
export default {
  name: 'sign-in',
  data() {
    return {
      email: '',
      password: '',
      showPwd: false,
      processing: false,
      loginForm: false,
    }
  },
  computed: {
    loginDialog() {
      return this.$store.state.dialog.login
    },
  },
  methods: {
    close() {
      this.$store.commit('dialog/closeLogin')
    },
    openRegister() {
      this.$store.commit('dialog/openRegister')
    },
    processLogin() {
      this.processing = true
      const user = {
        email: this.email,
        password: this.password,
      }
      this.$store
        .dispatch('user/login', { user })
        .then((res) => {
          this.close()
        })
        .catch((err) => {
          console.log(err.data.message)
        })
        .finally(() => {
          this.processing = false
        })
    },
  },
}
</script>
