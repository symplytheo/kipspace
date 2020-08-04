<template>
  <div id="mgr-walk-ins">
    <v-card flat color="primary" tile dark class="py-10 mb-1">
      <v-card-text class="py-10">
        <v-row justify="center">
          <v-col cols="10" sm="8" md="5" lg="4">
              <v-row justify="center">
                
                <v-col cols="12" class="py-0">
                  <v-img src="/qr-code.png" height="180" contain></v-img>
                </v-col>
                <v-col cols="8">
                  <p class="text-center">
                    Scan Walk-in code
                  </p>
                  <v-btn 
                    to="/manager/dashboard"
                    block 
                    large 
                    color="secondary" 
                    dark
                    depressed  
                  >
                    Go to Dashboard
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
  layout: 'manager'
}
</script>

<style>

</style>