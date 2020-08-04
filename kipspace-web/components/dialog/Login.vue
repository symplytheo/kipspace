<template>
  <v-dialog
    v-model="loginDialog" 
    fullscreen 
    hide-overlay
    transition="slide-y-reverse-transition"
  >
    <v-card flat color="primary" tile dark>
      <v-toolbar color="transparent" flat>
        <v-btn icon color="white">
          <v-icon size="30"  @click="close">mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          @click="openRegister"
          v-on:click="close"
          depressed 
          color="secondary" 
          class="text-capitalize"
        >Create Account</v-btn>
      </v-toolbar>

      <v-card-text>
        <v-row justify="center">
          <v-col cols="10" sm="8" md="5" lg="4">
            <h2 class="white--text mb-10">Log In</h2>
            <v-form ref="login" class="mt-10">
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    placeholder="someone@example.com"
                    v-model="login.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    placeholder="password"
                    :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="login.pwd"
                    :type="showPwd ? 'text' : 'password'"
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
                  >
                    Log in
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center pb-0">
                  <h3 class="font-weight-medium">or sign in using</h3> 
                  <div class="py-5">
                    <v-btn depressed fab color="transparent" class="mx-3">
                      <v-avatar size="64">
                        <v-img src="/google-icon.png"></v-img>
                      </v-avatar>
                    </v-btn>
                    or
                    <v-btn depressed fab color="white" class="mx-3">
                      <v-icon size="68" color="blue darken-3">mdi-facebook</v-icon>
                    </v-btn>
                  </div>
                </v-col>
                <v-col cols="12" class="py-0 text-center">
                  by continuing, you agree to our
                  <v-btn
                    @click="close" 
                    color="grey lighten-2"
                    text
                    class="pl-0 btn-term text-capitalize"
                    style="font-size: 14px"
                    to="/terms"
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
    <SignUp />
  </v-dialog>
</template>

<script>
export default {
  components: {
    SignUp: () => import('~/components/dialog/Register')
  },
  data (){
    return {
      login: {
        email: '',
        pwd: '',
        rem: true
      },
      showPwd: false,
    }
  },
  computed: {
    loginDialog () {
      return this.$store.state.loginDialog
    },
  },
  methods: {
    close () {
      this.$store.commit('closeLoginDialog')
    },
    openRegister () {
      this.$store.commit('openRegDialog')
    }
  }
}
</script>