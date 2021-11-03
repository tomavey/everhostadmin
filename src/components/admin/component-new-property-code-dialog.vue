<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="propertyId"
            label="Set Property Code"
            required
          ></v-text-field>
        </v-col>
      </v-row>  
      <v-row>  
        <v-btn
          class="mr-4"
          color="primary"
          type="submit"
        >
          Set Property Code
        </v-btn>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>
import mixins from '@/mixins'

export default {
  mixins: [mixins],
  data(){
    return {
      propertyId: null,
    }
  },
  methods: {
    submit: function(){
      this.$store.commit("setPropertyId",this.propertyId)
      this.goToRoute("ImageGallery")
    }
  }
}
</script>