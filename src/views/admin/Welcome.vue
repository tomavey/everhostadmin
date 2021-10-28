<template>
  <v-container>
      <v-chip
        class="mr-2 pa-3 halfWide"
        @click="goToRoute('NewPropertyCreateDialog')"
        x-large
        color="primary"
        dark
        outlined
      >
        <v-icon left>
          mdi-brightness-5
        </v-icon>
        Create a new property
      </v-chip>  
      <v-chip
        class="mr-2 pa-3 halfWide"
        @click="goToRoute('PropertiesList')"
        x-large
        color="primary"
        dark
        outlined
      >
        <v-icon left>
          mdi-brightness-5
        </v-icon>
        List my properties
      </v-chip>  

      <v-card
        
      >
        <v-card-text class=text-center>
          <v-container>
            <v-row
            >
              <v-col cols="4" class="mx-auto my-12">
                <v-chip
                  class="ma-2 pa-3 wide"
                  @click="goToRoute('NewPropertyCreateDialog')"
                  x-large
                  color="primary"
                  dark
                  outlined
                >
                  <v-icon left>
                    mdi-brightness-5
                  </v-icon>
                  Create a new property
                </v-chip>  
              </v-col>

              <v-col cols="4" class="mx-auto my-12">
                <v-chip
                  class="mr-2 pa-3 wide"
                  @click="goToRoute('PropertiesList')"
                  x-large
                  color="primary"
                  dark
                  outlined
                >
                  <v-icon left>
                    mdi-brightness-5
                  </v-icon>
                  List my properties
                </v-chip>  
              </v-col>

              <v-col cols="4" class="mx-auto my-12">
                <v-chip
                  class="mr-2 pa-3 wide"
                  @click="goToRoute('PropertiesList')"
                  x-large
                  color="primary"
                  dark
                  outlined
                >
                  <v-icon left>
                    mdi-brightness-5
                  </v-icon>
                  List my properties
                </v-chip>  
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import mixins from '@/mixins'

export default {
  mixins: [ mixins ],
  data () {
    return {
      message: "admin Home"
    }
  }
}
</script>

<style scoped>
  .halfWide {
    min-width:50%;
  }

</style>