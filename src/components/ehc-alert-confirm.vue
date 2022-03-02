<template>
    <v-dialog
      v-model="showConfirm"
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
              @click="$emit('confirmAction')"
          >
              Confirm
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="showConfirm = false"
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
  props: ['item'],
  data() {
    return {
      show: true,
      dialog: false,
    }
  },
  computed: {
    showConfirm: {
      get() {return this.$store.getters.showConfirm},
      set(value) {this.$store.commit('setShowConfirm',value)}
    },
    message: function(){
      return this.$store.getters.confirmMessage
    }
  },
}
</script>