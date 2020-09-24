<template>
  <div id="mgr-edit">
    <v-container>
      <v-card outlined flat class="my-5">
        <v-sheet tile height="150" color="grey lighten-4">
          <v-img height="100%" src="/img/chips.png">
            <v-row align="end" justify="end" class="fill-height">
              <v-btn color="rgba(255,255,255,0.35)" class="mx-2" depressed>
                <v-icon large color="primary">mdi-camera</v-icon>
              </v-btn>
            </v-row>
          </v-img>
        </v-sheet>
        <v-row justify="center" class="text-center">
          <v-col cols="6">
            <v-avatar size="160" class="biz-logo">
              <v-img src="/img/pizza.png" alt="alt">
                <v-row align="end" justify="center" class="fill-height">
                  <v-btn
                    color="rgba(255,255,255,0.35)"
                    class="my-3 mx-2"
                    depressed
                    small
                    block
                  >
                    <v-icon size="30" color="primary">mdi-camera</v-icon>
                  </v-btn>
                </v-row>
              </v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row class="px-10 py-5">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="item.name"
              outlined
              label="Name"
              :rules="[(v) => !!v || 'Facility Name is required']"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="item.short_description"
              outlined
              label="Short Description"
              :rules="[(v) => !!v || 'Short description is required']"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="item.location.address"
              outlined
              label="Address"
              :rules="[(v) => !!v || 'Facility Address is required']"
            />
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field
              v-model="item.location.city"
              outlined
              label="City"
              :rules="[(v) => !!v || 'City is required']"
            />
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field
              v-model="item.location.state"
              outlined
              label="State"
              :rules="[(v) => !!v || 'State is required']"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="country"
              outlined
              :items="countries.items"
              item-text="name"
              item-value="_id"
              label="Country"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="item.capacity"
              outlined
              label="Capacity"
              :rules="[
                (v) => !!v || 'Facility City is required',
                (v) => /^\d+$/.test(v) || 'Must be numbers only',
              ]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-textarea
              v-model="item.description"
              label="Full Description"
              outlined
              counter="200"
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="subtitle-2">Opening Hours</div>
            <v-card outlined>
              <div v-for="(open, p) in opening" :key="p">
                <v-row class="px-5" align="center">
                  <v-col cols="5" class="py-0">
                    {{ open.day }}
                  </v-col>
                  <v-col cols="7" class="py-0">
                    <v-row>
                      <v-col cols="4">
                        <v-menu
                          v-model="menu[p]"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn
                              text
                              small
                              depressed
                              block
                              class="time-btn"
                              color="black"
                              v-on="on"
                            >
                              {{ open.from ? open.from : '----' }}
                            </v-btn>
                          </template>
                          <v-time-picker
                            v-model="open.from"
                            color="primary"
                            ampm-in-title
                            @input="menu[p] = false"
                          >
                          </v-time-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="4" class="text-center">to</v-col>
                      <v-col cols="4">
                        <v-menu
                          v-model="menu2[p]"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn
                              text
                              small
                              depressed
                              block
                              class="time-btn"
                              color="black"
                              v-on="on"
                            >
                              {{ open.to ? open.to : '----' }}
                            </v-btn>
                          </template>
                          <v-time-picker
                            v-model="open.to"
                            color="primary"
                            ampm-in-title
                            @input="menu2[p] = false"
                          >
                          </v-time-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center pt-5">
            <v-btn
              color="secondary"
              class="text-capitalize"
              depressed
              large
              :loading="loading"
              @click="updateFacility(item)"
            >
              Update facility
            </v-btn>
          </v-col>
        </v-row>
        <div class="text-center pb-10"></div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import UserFacilityGql from '~/graphql/queries/user-facility'
import CountriesGql from '~/graphql/queries/countries'
import UpdateFacilityGql from '~/graphql/mutations/UpdateFacility'
import { emailValidation } from '~/utils/validation'

export default {
  layout: 'manager',
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      facility: {
        _id: '',
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
      countries: {
        items: [],
      },
      opening: [
        { day: 'Monday', from: '', to: '' },
        { day: 'Tuesday', from: '', to: '' },
        { day: 'Wednesday', from: '', to: '' },
        { day: 'Thursday', from: '', to: '' },
        { day: 'Friday', from: '', to: '' },
        { day: 'Saturday', from: '', to: '' },
        { day: 'Sunday', from: '', to: '' },
      ],
      menu: [],
      menu2: [],
      country: '',
    }
  },
  apollo: {
    facility: {
      query: UserFacilityGql,
      variables() {
        return {
          _id: this.$route.params.id,
        }
      },
    },
    countries: {
      query: CountriesGql,
      prefetch: true,
    },
  },
  computed: {
    item() {
      const item = this.facility
      return item
    },
  },
  methods: {
    emailValidation,
    async updateFacility(item) {
      this.loading = true
      const record = {
        _id: item._id,
        name: item.name,
        short_description: item.short_description,
        // location: {
        //   address: item.address,
        //   city: item.city,
        //   state: item.state,
        // },
        // country: item.country,
        capacity: item.capacity,
        description: item.description,
      }
      try {
        console.log(record.country)
        await this.$apollo.mutate({
          mutation: UpdateFacilityGql,
          variables: { record },
        })
        this.$store.commit('snackbar/show', {
          text: 'Facility was updated successfully',
          icon: 'success',
        })
      } catch (error) {
        console.log('Error ' + error.message)
        // eslint-disable-next-line no-unused-vars
        const { response, message } = error
        this.$store.commit('snackbar/show', {
          text: response.data.message,
          icon: 'error',
        })
      } finally {
        this.loading = false
      }
    },
  },
  head() {
    const text = this.facility.name + ' | Edit Profile'
    const title = text.replace(/^\w|\s\w/g, (w) => w.toUpperCase())
    return {
      title,
    }
  },
}
</script>

<style>
#mgr-edit .biz-logo {
  margin-top: -65px;
  border: 10px solid white;
  border-radius: 50%;
}
</style>
