<template>
  <div>
    <v-snackbar v-model="show" bottom right :timeout="3000" color="secondary">
      <div v-if="$store.state.snackbar.icon === 'loading'" class="mr-1">
        <v-progress-circular indeterminate size="28" color="accent" />
      </div>
      <div v-else class="mr-1">
        <v-icon v-if="$store.state.snackbar.icon === 'success'" color="primary">
          mdi-check-circle
        </v-icon>
        <v-icon
          v-else-if="$store.state.snackbar.icon === 'error'"
          color="primary"
        >
          mdi-close-circle
        </v-icon>
        <v-icon
          v-else-if="$store.state.snackbar.icon === 'warning'"
          color="yellow lighten-2"
        >
          mdi-minus-circle
        </v-icon>
      </div>
      {{ $store.state.snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  computed: {
    show: {
      get() {
        return this.$store.state.snackbar.show
      },
      set(newVal) {
        this.$store.commit('snackbar/show')
      },
    },
  },
}
</script>

<style></style>
