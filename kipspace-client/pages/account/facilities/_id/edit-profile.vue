<template>
  <div id="mgr-edit">
    <v-container>
      <v-card outlined flat class="my-5">
        <v-sheet tile height="150" color="grey lighten-3">
          <v-img height="100%" :src="item.cover && item.cover">
            <v-dialog v-model="coverDialog" persistent max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-row align="end" justify="end" class="fill-height">
                  <v-btn
                    color="rgba(255,255,255,0.35)"
                    class="mx-2"
                    depressed
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon large color="primary">mdi-camera</v-icon>
                  </v-btn>
                </v-row>
              </template>
              <v-card>
                <v-card-title>
                  <v-spacer />
                  <v-btn text small @click="coverDialog = false"> close </v-btn>
                </v-card-title>
                <v-card-text class="pl-1 pr-2">
                  <v-file-input
                    v-model="cover"
                    color="primary"
                    label="Facility Cover"
                    outlined
                    placeholder="upload jpeg or png file"
                    accept="image/*"
                    show-size
                    :clearable="false"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip small label color="primary">
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                  <v-btn
                    large
                    depressed
                    color="primary"
                    :loading="coverUploading"
                    :disabled="cover.length === 0"
                    class="ml-10 text-capitalize"
                    @click="uploadFacilityCover()"
                  >
                    upload facility cover
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-row align="end" justify="end" class="fill-height">
              <v-btn color="rgba(255,255,255,0.35)" class="mx-2" depressed>
                <v-icon large color="primary">mdi-camera</v-icon>
              </v-btn>
            </v-row>
          </v-img>
        </v-sheet>
        <v-row justify="center" class="text-center">
          <v-col cols="6">
            <v-dialog v-model="logoDialog" persistent max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon height="150" width="150" v-bind="attrs" v-on="on">
                  <v-avatar size="150" color="grey lighten-3">
                    <v-img :src="item.logo && item.logo">
                      <v-row align="end" justify="center" class="fill-height">
                        <v-btn
                          color="rgba(255,255,255,0.35)"
                          class="mb-5"
                          depressed
                        >
                          <v-icon large color="primary">mdi-camera</v-icon>
                        </v-btn>
                      </v-row>
                    </v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <v-spacer />
                  <v-btn text small @click="logoDialog = false"> close </v-btn>
                </v-card-title>
                <v-card-text class="pl-1 pr-2">
                  <v-file-input
                    v-model="logo"
                    color="primary"
                    label="Facility Logo"
                    outlined
                    placeholder="upload jpeg or png file"
                    accept="image/*"
                    show-size
                    :clearable="false"
                  >
                    <template v-slot:selection="{ text }">
                      <v-chip small label color="primary">
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                  <v-btn
                    large
                    depressed
                    color="primary"
                    :loading="logoUploading"
                    :disabled="logo.length === 0"
                    class="ml-10 text-capitalize"
                    @click="uploadFacilityLogo()"
                  >
                    upload facility logo
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row class="pa-3">
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
            <v-select
              v-model="item.category._id"
              outlined
              :items="categories.items"
              item-text="name"
              item-value="_id"
              label="Category"
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
              v-model="item.location.country._id"
              outlined
              :items="countries.items"
              item-text="name"
              item-value="_id"
              label="Country"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="item.capacity"
              outlined
              label="Capacity"
              :rules="[
                (v) => !!v || 'Capacity is required',
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
            <div class="subtitle-2 mb-1">Opening Hours</div>
            <v-card outlined>
              <div v-for="(open, p) in opening" :key="p">
                <v-row class="px-5" align="center">
                  <v-col cols="5" class="py-0 subtitle-2">
                    {{ open.day }}
                  </v-col>
                  <v-col cols="7" class="py-0">
                    <v-row>
                      <v-col cols="4 subtitle-2 pl-0">
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
                              {{
                                open.from
                                  ? open.from
                                  : item.opening_hours[p] &&
                                    item.opening_hours[p].from
                                  ? item.opening_hours[p].from
                                  : '---'
                              }}
                            </v-btn>
                          </template>
                          <v-time-picker
                            v-model="open.from"
                            color="primary"
                            ampm-in-title
                            @input="menu[p] = false"
                          />
                        </v-menu>
                      </v-col>
                      <v-col cols="4" class="text-center subtitle-2">to</v-col>
                      <v-col cols="4 subtitle-2 pl-0">
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
                              {{
                                open.to
                                  ? open.to
                                  : item.opening_hours[p] &&
                                    item.opening_hours[p].to
                                  ? item.opening_hours[p].to
                                  : '---'
                              }}
                            </v-btn>
                          </template>
                          <v-time-picker
                            v-model="open.to"
                            color="primary"
                            ampm-in-title
                            @input="menu2[p] = false"
                          />
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider />
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" class="text-center pt-5">
            <v-btn
              color="secondary"
              class="text-capitalize"
              depressed
              large
              width="75%"
              :loading="loading"
              @click="updateFacility()"
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
import CategoriesGql from '~/graphql/queries/categories'
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
        short_description: '',
        category: {
          _id: '',
          name: '',
        },
        location: {
          address: '',
          state: '',
          city: '',
          country: {
            _id: '',
            name: '',
          },
        },
        description: '',
        opening_hours: [],
        capacity: 0,
      },
      countries: {
        items: [],
      },
      categories: {
        items: [],
      },
      country: '',
      category: '',
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
      //
      logo: [],
      logoDialog: false,
      logoUploading: false,
      //
      //
      cover: [],
      coverDialog: false,
      coverUploading: false,
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
    categories: {
      query: CategoriesGql,
      prefetch: true,
    },
  },
  computed: {
    item() {
      const item = { ...this.facility }
      return item
    },
  },
  methods: {
    emailValidation,
    // upload facility logo
    async uploadFacilityLogo() {
      this.logoUploading = true
      const formData = new FormData()
      formData.append('file', this.logo)
      console.log('>> formData >> ', formData)
      await this.$axios
        .put(`/v1/facility/${this.id}/logo`, formData)
        .then(({ data }) => {
          this.logoUploading = false
          console.log(data)
          this.$store.commit('snackbar/show', {
            text: 'Logo was uploaded successfully',
            icon: 'success',
          })
          this.logoDialog = false
        })
        .catch((err) => {
          console.log(err)
          this.logoUploading = false
        })
    },
    // upload facility cover
    async uploadFacilityCover() {
      this.coverUploading = true
      const data = new FormData()
      data.append('file', this.cover)
      console.log(data)
      console.log(this.cover)
      await this.$axios
        .put(`/v1/facility/${this.id}/cover`, data)
        .then(({ data }) => {
          this.coverUploading = false
          console.log(data)
          this.$store.commit('snackbar/show', {
            text: data.message,
            icon: 'success',
          })
          this.logoDialog = true
        })
        .catch((err) => {
          console.log(err)
          this.coverUploading = false
        })
    },
    // update facility details
    async updateFacility() {
      this.loading = true
      const record = {
        _id: this.id,
        name: this.item.name,
        short_description: this.item.short_description,
        location: {
          address: this.item.location.address,
          city: this.item.location.city,
          state: this.item.location.state,
          country: this.item.location.country._id,
        },
        category: this.item.category._id,
        capacity: this.item.capacity,
        description: this.item.description,
        opening_hours: this.opening,
      }
      try {
        console.log(record)
        await this.$apollo.mutate({
          mutation: UpdateFacilityGql,
          variables: { record },
        })
        this.$store.commit('snackbar/show', {
          text: 'Facility was updated successfully',
          icon: 'success',
        })
        // this.$router.go(0)
        //
      } catch (error) {
        console.log(error)
        // eslint-disable-next-line no-unused-vars
        this.$store.commit('snackbar/show', {
          text: error,
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
