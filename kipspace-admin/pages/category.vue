<template>
  <div>
    <v-toolbar
      color="transparent"
      dense
      class="primary--text my-2"
      elevation="0"
    >
      <v-icon large class="mr-2" color="primary">mdi-tag-multiple</v-icon>
      <v-toolbar-title class="font-weight-bold">
        Categories <span class="subtitle-2"> ({{ categories.count }}) </span>
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        color="primary"
        class="text-capitalize"
        @click.stop="dialog = !dialog"
      >
        Add <span class="hidden-sm-and-down">Category</span>
      </v-btn>
    </v-toolbar>
    <!-- Add category dialog -->
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-toolbar color="transparent" dense flat>
          <v-toolbar-title class="font-weight-bold">
            Add New Category
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon color="primary" @click.stop="dialog = !dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pt-0">
          <v-form v-model="addCategoryForm">
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-text-field
                  v-model="name"
                  label="Name"
                  counter="32"
                  :rules="[
                    (v) => !!v || 'Name is required',
                    (v) =>
                      (!!v && v.length <= 32) || 'Not more than 32 characters',
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Description"
                  counter="120"
                  rows="2"
                  :rules="[
                    (v) => !!v || 'Description is required',
                    (v) =>
                      (!!v && v.length <= 120) ||
                      'Not more than 120 characters',
                  ]"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model.trim="icon"
                  label="Icon"
                  counter="32"
                  :rules="[(v) => !!v || 'Icon is required']"
                />
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  large
                  depressed
                  :loading="loading"
                  :disabled="!addCategoryForm"
                  color="secondary"
                  @click="addCategory"
                >
                  Add Category
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="pa-2">
      <v-row>
        <v-col
          v-for="(item, i) in categories.items"
          :key="i"
          cols="12"
          sm="6"
          lg="4"
          class="py-5"
        >
          <v-card class="px-3">
            <v-row>
              <v-col cols="5" sm="4" class="pb-0">
                <v-card
                  class="mx-auto py-5 text-center v-sheet--offset"
                  color="primary"
                  elevation="1"
                >
                  <v-icon size="50" color="white">{{ item.icon }}</v-icon>
                </v-card>
              </v-col>
              <v-col cols="7" sm="8" class="text-right pa-5 pb-0 primary--text">
                <div class="subtitle-1 font-weight-bold pb-2 text-uppercase">
                  {{ item.name }}
                </div>
              </v-col>
            </v-row>
            <v-card-text class="pa-0 pb-2">
              <v-divider />
              <div class="pt-2">
                <!-- Update category dialogs -->
                <v-dialog v-model="menu[i]" max-width="600">
                  <template v-slot:activator="{ on }">
                    <v-btn text block color="primary" v-on="on"> Edit </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar color="transparent" dense flat>
                      <v-toolbar-title class="font-weight-bold">
                        Edit Category -
                        <span class="text-capitalize">{{ item.name }}</span>
                      </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text class="pt-0">
                      <v-form>
                        <v-row>
                          <v-col cols="12" class="pt-0">
                            <v-text-field
                              v-model="item.name"
                              label="Name"
                              counter="32"
                              :rules="[
                                (v) => !!v || 'Name is required',
                                (v) =>
                                  (!!v && v.length <= 32) ||
                                  'Not more than 32 characters',
                              ]"
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              v-model="item.description"
                              label="Description"
                              counter="120"
                              rows="2"
                              :rules="[
                                (v) => !!v || 'Description is required',
                                (v) =>
                                  (!!v && v.length <= 120) ||
                                  'Not more than 120 characters',
                              ]"
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model.trim="item.icon"
                              label="Icon"
                              counter="32"
                              :rules="[(v) => !!v || 'Icon is required']"
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-btn
                              block
                              large
                              depressed
                              :loading="loading"
                              color="secondary"
                              @click="updateCategory(item, i)"
                            >
                              Edit Category
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CreateCategoryGql from '~/graphql/mutations/CreateCategory'
import UpdateCategoryGql from '~/graphql/mutations/UpdateCategory'
import CategoriesGql from '~/graphql/queries/categories'

export default {
  layout: 'admin',
  data: () => ({
    categories: {
      count: 0,
      items: [],
    },
    dialog: false,
    name: '',
    description: '',
    icon: '',
    loading: false,
    addCategoryForm: false,
    menu: [],
  }),
  apollo: {
    categories: {
      query: CategoriesGql,
      prefetch: true,
    },
  },
  computed: {},
  methods: {
    async addCategory() {
      this.loading = true
      const record = {
        name: this.name,
        description: this.description,
        icon: this.icon,
      }
      try {
        await this.$apollo.mutate({
          mutation: CreateCategoryGql,
          variables() {
            return { record }
          },
        })
        this.$store.commit('snackbar/show', {
          text: 'Category was added successfully',
          icon: 'success',
        })
        this.dialog = false
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
    async updateCategory(item, i) {
      this.loading = true
      const record = {
        _id: item._id,
        name: item.name,
        description: item.description,
        icon: item.icon,
      }
      try {
        await this.$apollo.mutate({
          mutation: UpdateCategoryGql,
          variables: { record },
        })
        this.menu[i] = false
        this.$store.commit('snackbar/show', {
          text: 'Category was updated successfully',
          icon: 'success',
        })
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
  head() {
    return {
      title: 'Categories | Admin',
    }
  },
}
</script>

<style>
.v-sheet--offset {
  top: -30px;
  position: relative;
}
</style>
