<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <p>{{instructions.propertyId}}</p>
          <v-text-field
            v-model="property.propertyId"
            label="Property Code"
            required
          ></v-text-field>
        </v-col>  
        <v-btn
          class="mr-4"
          color="primary"
          type="submit"
          block
        >
          submit
        </v-btn>
      </v-row>
    </v-container>
  </v-form>

</template>

<script>
import firebase from 'firebase'
import mixins from '@/mixins'


const propertiesRef = firebase.firestore().collection('properties')

export default {
  mixins: [mixins],
  
}
</script>