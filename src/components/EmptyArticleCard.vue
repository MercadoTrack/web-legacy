<template>
  <v-card>
    <v-container fluid class="pa-0">
      <v-img aspect-ratio="1.3"></v-img>
      <v-divider light></v-divider>
      <v-card-text class="relative">
        <v-chip dark label color="grey lighten-2" class="status"></v-chip>
        <v-card-title class="pa-0 pt-3" primary-title>
          <v-flex xs12>
            <div class="subheading mb-1">
              <div class="gray-bar" style="width: 200px;"></div>
              <div class="gray-bar" style="width: 70px"></div>
            </div>
          </v-flex>
          <v-flex xs12>
            <h4 class="headline mb-0">
              <div class="gray-bar big grey lighten-2" style="width: 175px"></div>
            </h4>
          </v-flex>
        </v-card-title>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<style lang="scss" scoped>
.v-image {
  background-color: lightgray;
}

.subheading {
  height: 48px; // magic number for 2 lines
}

.gray-bar {
  height: 14px;
  max-width: 90%;
  border-radius: 3px;
  margin-bottom: 4px;
  background-color: lightgray;
  &.big {
    height: 32px;
    margin: 0;
  }
}

.v-chip.status {
  width: 60px;
  text-transform: capitalize;
  position: absolute;
  top: -1.5rem;
  right: 0.5rem;
}
</style>
