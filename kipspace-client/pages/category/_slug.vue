<template>
  <div id="category">
    <v-sheet tile width="100%" elevation="3">
      <v-container>
        <v-row justify="center">
          <v-col cols="10" sm="8" lg="6" class="pt-5">
            <v-text-field
              outlined
              rounded
              placeholder="Search or type location"
              append-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-slide-group 
              :mobile-break-point="900"
            >
              <v-slide-item v-for="(item, i) in categories" :key="i">
                <v-card flat class="pa-0 mx-5" style="border-radius: 50px" :to="`/category/${item.slug}`">
                  <div class="category-box d-flex align-center pr-5">
                    <div 
                      class="icon-box"
                      :class="[item === category?'greyBd':'pryBd']"
                    >
                      <v-icon color="primary" large :disabled="item === category">
                        {{item.icon}}
                      </v-icon>
                    </div>
                    <h4 class="d-inline ml-3" :class="item === category? 'grey--text': 'primary--text'">
                      {{item.text}}
                    </h4>
                  </div>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-container class="py-10">
      <h3>{{category.text}}</h3>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="12">
          <v-row>
            <v-col cols="6" md="3" v-for="g in 8" :key="g">
              <v-card flat link>
                <v-img src="/img/burger.png" :aspect-ratio="17/12"/>
              </v-card>
              <v-row>
                <v-col cols="7">
                  <h4>Dominos Pizza</h4>
                </v-col>
                <v-col cols="5" class="text-right">
                  <v-rating
                    :value=3
                    half-increments
                    background-color="primary"
                    color="primary"
                    dense
                    size="14"
                  ></v-rating>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="my-2">
              <v-pagination 
                :length="6" 
                :value=1
                color="primary"
                class="pagination"
              >
              </v-pagination>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = await params.slug;
    return { slug }
  },
  computed: {
    categories() {
      return this.$store.getters['category/categories'];
    },
    category(){
      return this.categories.find(el => (el.slug === this.slug));
    }
  },
  head() {
    const text = this.category.text;
    const title = text.replace(/^\w|(\s\w)/g, str => str.toUpperCase())
    return {
      title
    };
  }
}
</script>

<style>
#category .category-box {
  border: 1px solid #D1D1D1;
  border-radius: 50px;
  height: 60px;
}
#category .icon-box {
  height: 59px;
  width: 59px;
  display: inline-flex;
  border-radius: 50%;
  background-color: white;
  justify-content: center;
  align-content: center;
}
.pryBd {
  border: 5px solid #360F4F
}
.greyBd{
  border: 5px solid grey
}
</style>