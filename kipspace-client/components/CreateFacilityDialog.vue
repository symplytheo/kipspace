<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-toolbar color="transparent" dense flat>
        <v-toolbar-title class="font-weight-bold">
          Create New Facility
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon color="primary" @click.stop="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pt-0">
        <v-form v-model="addFacilityForm">
          <v-row>
            <v-col cols="12" class="pt-0">
              <v-text-field
                v-model="name"
                label="Name"
                counter="32"
                :rules="[(v) => !!v || 'Name is required']"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="short_description"
                label="Short Description"
                :rules="[(v) => !!v || 'Short description is required']"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="category"
                outlined
                :items="categories.items"
                item-text="name"
                item-value="_id"
                label="Category"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="address"
                outlined
                label="Address"
                :rules="[(v) => !!v || 'Facility Address is required']"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="city"
                outlined
                label="City"
                :rules="[(v) => !!v || 'City is required']"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="state"
                outlined
                label="State"
                :rules="[(v) => !!v || 'State is required']"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="country"
                outlined
                :items="countries.items"
                item-text="name"
                item-value="_id"
                label="Country"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="capacity"
                outlined
                label="Capacity"
                :rules="[
                  (v) => !!v || 'Facility City is required',
                  (v) => /^\d+$/.test(v) || 'Must be numbers only',
                ]"
              />
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                large
                depressed
                :loading="loading"
                :disabled="!addFacilityForm"
                color="secondary"
                @click="createFacility"
              >
                Create Facility
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CountriesGql from '~/graphql/queries/countries'
import CategoriesGql from '~/graphql/queries/categories'
import CreateFacilityGql from '~/graphql/mutations/CreateFacility'

export default {
  data() {
    return {
      name: '',
      short_description: '',
      address: '',
      state: '',
      city: '',
      country: '',
      category: '',
      capacity: '',
      addFacilityForm: false,
      categories: {
        items: [],
      },
      countries: {
        items: [],
      },
    }
  },
  apollo: {
    countries: {
      query: CountriesGql,
      prefetch: true,
    },
    categories: {
      query: CategoriesGql,
      prefetch: true,
    },
  },
  computed: {
    dialog() {
      return this.$store.state.facility.dialog
    },
  },
  method: {
    close() {
      this.$store.commit('facility/toggleDialog')
    },
    async createFacility() {
      this.loading = true
      const record = {
        name: this.name,
        short_description: this.short_description,
        location: {
          address: this.address,
          state: this.state,
          city: this.city,
          country: this.country,
        },
        category: this.category,
        capacity: this.country,
      }
      try {
        await this.$apollo.mutate({
          mutation: CreateFacilityGql,
          variables() {
            return { record }
          },
        })
        this.$store.commit('snackbar/show', {
          text: 'Facility was created successfully',
          icon: 'success',
        })
        this.$router.go(0)
      } catch (error) {
        // eslint-disable-next-line no-unused-vars
        console.log(error)
        this.$store.commit('snackbar/show', {
          text: error,
          icon: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
