<template>
  <div id="exit">
    <v-card flat tile light class="py-10">
      <v-card-text class="py-10">
        <v-row justify="center">
          <v-col cols="10" sm="8" md="5" lg="4">
              <v-row justify="center">
                <v-col cols="12" class="py-0">
                  <v-img src="/qr-code-black.png" height="180" contain></v-img>
                </v-col>
                <v-col cols="8">
                  <v-btn 
                    block 
                    large 
                    color="secondary" 
                    dark  
                   depressed
                  >
                    Scan to Exit
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
}
</script>