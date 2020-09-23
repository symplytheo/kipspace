<template>
  <div>
    <MkrDesktopView :facility="facilityOverview" />
    <MkrMobileView :facility="facilityOverview" />
  </div>
</template>

<script>
import FacilityGql from '~/graphql/queries/facility'

export default {
  data: () => ({
    facilityOverview: {
      name: '',
      location: {
        address: '',
        state: '',
        city: '',
        country: {
          name: '',
        },
      },
      opening_hours: [],
      capacity: 0,
      reviews: [],
    },
  }),
  apollo: {
    facilityOverview: {
      query: FacilityGql,
      variables() {
        return {
          filter: {
            _id: this.$route.params.id,
          },
        }
      },
    },
  },
  head() {
    const text = this.facilityOverview.name
    const title = text.replace(/^\w|\s\w/g, (w) => w.toUpperCase())
    return {
      title,
    }
  },
}
</script>

<style></style>
