<template>
  <div>
    <v-card flat tile class="py-10 mb-1">
      <v-card-text class="py-10">
        <v-row justify="center">
          <v-col cols="10" sm="8" md="5" lg="4">
            <v-row justify="center">
              <v-col cols="12" class="py-0">
                <v-img src="/img/qr-code-black.png" height="150" contain />
              </v-col>
              <v-col cols="10">
                <v-btn
                  block
                  large
                  color="secondary"
                  dark
                  depressed
                  style="text-transform: none"
                >
                  Scan Exit Code
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'manager',
}
</script>

<style></style>
