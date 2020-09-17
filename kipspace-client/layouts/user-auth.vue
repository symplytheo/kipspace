<template>
  <v-app>
    <v-row
      justify="center"
      align="center"
      class="fill-height primary pa-0 ma-0"
    >
      <v-container>
        <nuxt />

        <!-- Continue with Social Media -->
        <v-row class="mt-3">
          <v-col cols="12" class="text-center pb-0">
            <div class="font-weight-medium white--text">or continue with</div>
            <v-row justify="center" align="center" class="py-5">
              <v-btn icon height="42" width="42" color="primary" class="mx-3">
                <v-avatar size="42">
                  <v-img src="/img/google.png"></v-img>
                </v-avatar>
              </v-btn>
              <div class="white--text">or</div>
              <v-btn icon height="42" width="42" color="primary" class="mx-3">
                <v-avatar size="42">
                  <v-img src="/img/facebook.png" />
                </v-avatar>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-app>
</template>

<script>
export default {}
</script>

<style></style>
