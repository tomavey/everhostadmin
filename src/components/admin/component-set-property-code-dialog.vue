<template>
<v-card>
  <v-card-actions>
  <v-container>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
          <v-text-field
            v-model="propertyId"
            label="Set Property Code"
            full-width
          ></v-text-field>
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
  </v-container>

  </v-card-actions>

</v-card>

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
      this.$store.commit("setPropertyId", this.propertyId)
      localStorage.setItem("EHPropertyId", this.propertyId)
      this.$store.commit("toggleShowSetPropertyCodeDialog")
      this.goToRoute("ImageGallery")
    }
  }
}
</script>