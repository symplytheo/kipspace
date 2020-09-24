<template>
  <v-dialog v-model="show" max-width="600">
    <v-card>
      <v-toolbar color="transparent" dense flat>
        <v-toolbar-title class="font-weight-bold">
          Create New Facility
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon color="primary" @click.stop="show = false">
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
                outlined
                counter="32"
                :rules="[(v) => !!v || 'Name is required']"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                v-model="short_description"
                label="Short Description"
                outlined
                :rules="[(v) => !!v || 'Short description is required']"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-select
                v-model="category"
                outlined
                :items="categories.items"
                item-text="name"
                item-value="_id"
                label="Category"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                v-model="address"
                outlined
                label="Address"
                :rules="[(v) => !!v || 'Facility Address is required']"
              />
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-text-field
                v-model="city"
                outlined
                label="City"
                :rules="[(v) => !!v || 'City is required']"
              />
            </v-col>
            <v-col cols="6" class="pt-0">
              <v-text-field
                v-model="state"
                outlined
                label="State"
                :rules="[(v) => !!v || 'State is required']"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-select
                v-model="country"
                outlined
                :items="countries.items"
                item-text="name"
                item-value="_id"
                label="Country"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-text-field
                v-model.number="capacity"
                outlined
                label="Capacity"
                :rules="[
                  (v) => !!v || 'Facility City is required',
                  (v) => /^\d+$/.test(v) || 'Must be numbers only',
                ]"
              />
            </v-col>
            <v-col cols="12" class="pt-0">
              <v-btn
                block
                large
                depressed
                :loading="loading"
                :disabled="!addFacilityForm"
                color="secondary"
                @click="createFacility()"
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
  props: ['visible'],
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
      loading: false,
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
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      },
    },
  },
  methods: {
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
        capacity: Number(this.capacity),
      }
      try {
        const { data } = await this.$apollo.mutate({
          mutation: CreateFacilityGql,
          variables: { record },
        })
        console.log(data)
        //
        this.show = false
        this.$store.commit('snackbar/show', {
          text: 'Facility was created successfully',
          icon: 'success',
        })
        this.$router.push(
          `/account/facilities/${data.createFacility.record._id}`
        )
        //
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
