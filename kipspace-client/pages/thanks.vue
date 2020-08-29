<template>
  <div id="thanks">
    <v-container>
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" sm="9" md="8" lg="6">
          <v-card outlined class="py-5 text-center">
            <div class="title font-weight-bold">Thank you for coming!</div>
            <v-row justify="center" class="py-5">
              <v-card 
                flat
                tile 
                color="grey lighten-2" 
                height="180" 
                width="180"
              />
            </v-row>
            <div class="py-5">
              <div class="mb-2 font-weight-bold">Rate and review</div>
              <div class="mb-5 subtitle-2">Share your experience with us</div>
              <v-rating
                size="46"
                dense
                color="primary"
                background-color="primary"
              ></v-rating>
            </div>
            <v-divider></v-divider>
            <div class="py-5">
              <v-row justify="center">
                <v-col cols="2">
                  <v-avatar
                    size="50"
                    color="grey lighten-2"
                  >
                    
                  </v-avatar>
                </v-col>
                <v-col cols="8" class="pb-0">
                  <v-textarea
                    placeholder="type a comment"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col cols="10" class="text-right py-0">
                  <v-btn depressed color="secondary" class="text-capitalize">
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Thanks for Coming'
    };
  }
}
</script>

<style>

</style>