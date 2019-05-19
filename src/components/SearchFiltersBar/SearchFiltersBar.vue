<template>
  <v-layout wrap class="px-3">
    <v-flex xs12 style="display: flex;">
      <div>
        <FiltersChips />
      </div>
      <v-btn icon dark color="primary" @click="toggleShow()" class="ml-auto">
        <v-fade-transition leave-absolute>
          <v-icon key="less" v-if="expand">expand_less</v-icon>
          <v-icon key="filter" v-else>filter_list</v-icon>
        </v-fade-transition>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-expand-transition>
        <v-form v-show="expand" v-model="valid">
          <v-container>
            <v-layout>
              <v-flex xs12 sm5 md3>
                <v-range-slider
                  label="$100"
                  v-model="price"
                  hide-details
                  thumb-label
                  step="100"
                  min="100"
                  max="9999"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-expand-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import FiltersChips from './FiltersChips'

export default {
  components: { FiltersChips },
  data: () => ({
    valid: true,
    expand: false,
    price: [100, 9999]
  }),
  methods: {
    toggleShow () {
      this.expand = !this.expand
    },
    applyFilters () {

    }
  }
}
</script>
