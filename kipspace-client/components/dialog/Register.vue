<template>
  <v-dialog v-model="regDialog" fullscreen hide-overlay>
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
          @click="close() + openLogin()"
        >
          Login
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row justify="center">
          <v-col cols="10" sm="8" md="5" lg="4">
            <h2 class="white--text mb-10">Create an Account</h2>
            <v-form v-model="regForm" class="mt-10">
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
                    :disabled="!regForm"
                    @click="processRegister"
                  >
                    Sign Up
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center pb-0">
                  <h3 class="font-weight-medium">or sign up using</h3>
                  <div class="py-5">
                    <v-btn depressed fab color="transparent" class="mx-3">
                      <v-avatar size="40">
                        <v-img src="/img/google.png"></v-img>
                      </v-avatar> </v-btn
                    >or
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
                    >terms of service</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Dialog -->
    <Login />
  </v-dialog>
</template>

<script>
export default {
  name: 'sign-up',
  data() {
    return {
      email: '',
      password: '',
      showPwd: false,
      processing: false,
      regForm: false,
    }
  },
  computed: {
    regDialog() {
      return this.$store.state.dialog.register
    },
  },
  methods: {
    close() {
      this.$store.commit('dialog/closeRegister')
    },
    openLogin() {
      this.$store.commit('dialog/openLogin')
    },
    processRegister() {
      this.processing = true
      const user = {
        email: this.email,
        password: this.password,
      }
      this.$store
        .dispatch('user/register', user)
        .then(() => {
          this.close()
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>
<style>
.btn-term::before {
  background: transparent;
}
</style>
