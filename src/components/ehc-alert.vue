<template>
    <v-dialog
      v-model="showAlert"
      width="500"
    >
      <v-card>
        <v-card-text class="text-h4 grey lighten-2 text-center">
        </v-card-text>

        <v-card-text class="text-h5 grey lighten-2 text-center">
          {{message}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="showAlert = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import ehcDialog from './ehc-dialog.vue'
export default {
  components: { ehcDialog },
  data() {
    return {
      show: true,
      dialog: false,
    }
  },
  computed: {
    showAlert: {
      get() {return this.$store.getters.showAlert},
      set(value) {this.$store.commit('setShowAlert',value)}
    },
    message: function(){
      return this.$store.getters.alertMessage
    }
  },
 
}
</script>