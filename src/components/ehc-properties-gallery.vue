<template>
          <v-container fluid>
            <v-row>
                <v-col 
                    cols="12" 
                    xs="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="2"
                    v-for="(property, index) in properties" 
                    :key="index">
                    <ehc-property-card :property="property"></ehc-property-card>
                </v-col>
            </v-row>
        </v-container>

</template>

<script>
import EhcPropertyCard from './ehc-property-card.vue'

export default {
  components: {EhcPropertyCard},
  props: ['properties'],
  data() {
    return {

    }
  }
}
</script>