<template>
  <div>
    <v-toolbar
      color="transparent"
      dense
      class="primary--text my-2"
      elevation="0"
    >
      <v-icon large class="mr-2" color="primary">mdi-tag-multiple</v-icon>
      <v-toolbar-title class="font-weight-bold">Categories</v-toolbar-title>

      <v-spacer />

      <v-btn
        color="primary"
        class="text-capitalize"
        @click.stop="dialog = !dialog"
      >
        Add <span class="hidden-sm-and-down">Category</span>
      </v-btn>
    </v-toolbar>
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
                <v-combobox
                  v-model="tags"
                  label="Tags"
                  multiple
                  chips
                  persistent-hint
                  hint="Press *Enter* or *Tabs* key to tag"
                  :rules="[
                    (v) => (!!v && v.length >= 1) || 'Enter at least one tag',
                  ]"
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
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(item, i) in categories"
          :key="i"
          cols="12"
          sm="6"
          lg="4"
          class="py-5"
        >
          <v-card class="px-3">
            <v-row>
              <v-col cols="5" sm="4">
                <v-card
                  class="mx-auto py-5 text-center"
                  color="primary"
                  elevation="1"
                >
                  <v-icon size="50" color="white">{{ item.icon }}</v-icon>
                </v-card>
              </v-col>
              <v-col cols="7" sm="8" class="text-right pa-5 primary--text">
                <div class="subtitle-1 font-weight-bold pb-2 text-uppercase">
                  {{ item.text }}
                </div>
                <div class="display-1 font-weight-bold">
                  75 <span class="subtitle-2">Facilities</span>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data: () => ({
    dialog: false,
    name: '',
    description: '',
    tags: [],
    loading: false,
    addCategoryForm: false,
  }),
  computed: {
    categories() {
      return this.$store.getters['category/categories']
    },
  },
  methods: {
    addCategory() {
      this.loading = true
    },
  },
  head() {
    return {
      title: 'Categories | Admin',
    }
  },
}
</script>

<style></style>
