<template>
  <v-app>
    <div id="error-page" style="margin-top: 120px">
      <v-row justify="center" align="center" class="text-center">
        <v-col cols="12" class="my-10">
          <h1
            class="display-4 font-weight-bold"
            v-if="error.statusCode === 404"
          >
            {{ pageNotFound }}
          </h1>
          <h1 
            class="display-4 font-weight-bold"
            v-else
          >
            {{ otherError }}
          </h1>
          <v-btn
            color="primary"
            x-large
            class="my-10"
            to="/"
            style="text-transform: none"
          >
            Back to Homepage
          </v-btn>
        </v-col>
      </v-row>
      
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
   components: {
  
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Error: Page Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
</style>
