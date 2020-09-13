<template>
  <div>
    <v-toolbar
      color="transparent"
      dense
      class="primary--text my-2"
      elevation="0"
    >
      <v-icon large class="mr-2" color="primary">mdi-office-building</v-icon>
      <v-toolbar-title class="font-weight-bold">Facilities</v-toolbar-title>
    </v-toolbar>
    <div>
      <v-row justify="center">
        <v-col cols="11" md="12" class="py-0">
          <v-row>
            <v-col v-for="v in 12" :key="v" cols="12" sm="6" md="4" lg="3">
              <v-card outlined>
                <v-img src="/img/burger.png" height="200">
                  <template v-slot:placeholder>
                    <v-row justify="center" align="center" class="fill-height">
                      <v-progress-circular indeterminate color="primary" />
                    </v-row>
                  </template>
                </v-img>
                <v-card-text class="text--primary">
                  <div class="subtitle-1 font-weight-bold">Dominos Pizza</div>
                  <div>
                    <v-rating
                      :value="4.2"
                      color="primary"
                      background-color="primary"
                      half-increments
                      dense
                      size="20"
                    />
                  </div>
                  <div class="py-1">
                    23 Adesanya Street, Ibara-expressway, Lagos State.
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-pagination
                :value="1"
                :length="10"
                :total-visible="5"
                class="pagination"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  head() {
    return {
      title: 'Facilities | Admin',
    }
  },
}
</script>

<style></style>
