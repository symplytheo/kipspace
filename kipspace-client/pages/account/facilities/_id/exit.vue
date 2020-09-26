<template>
  <v-row justify="center">
    <v-col cols="10" lg="4" md="6" sm="8">
      <div class="white--text">
        <qrcode-stream @decode="onDecode" @init="onInit" />

        <p class="my-10 white--text error--text font-weight-bold">
          {{ error }}
        </p>

        <p class="my-10 white--text decode-result">
          Reservation Code: <b>{{ result }}</b>
        </p>
        <v-btn
          block
          large
          color="secondary"
          dark
          :loading="loading"
          depressed
          @click="completeReservation()"
        >
          Complete Reservation
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import completeReservationGql from '~/graphql/mutations/CompleteReservation'

export default {
  layout: 'empty',
  middleware: ['authenticated'],
  components: { QrcodeStream },
  data() {
    return {
      result: '',
      error: '',
      loading: false,
    }
  },
  methods: {
    onDecode(result) {
      this.result = result
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permission'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported on this browser'
        } else {
          this.error = 'UNKNOWN ERROR: ' + error.message
        }
      }
    },
    async completeReservation() {
      this.loading = true
      const code = this.result
      const facility = this.$route.params.id
      try {
        await this.$apollo.mutate({
          mutation: completeReservationGql,
          variables: { code, facility },
        })
        this.$store.commit('snackbar/show', {
          text: 'Reservation was completed successfully',
          icon: 'success',
        })
        this.loading = false
        this.$router.replace(`/account/facilities/${facility}`)
        //
      } catch (error) {
        console.log(error)
        // eslint-disable-next-line no-unused-vars
        this.$store.commit('snackbar/show', {
          text: error,
          icon: 'error',
        })
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
