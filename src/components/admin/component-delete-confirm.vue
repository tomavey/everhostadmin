<template>
  <v-container>
    <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-text class="text-h5">
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="confirmedAction">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  props: ['dialogDelete'],
  data() {
    return {
      pageTitle: "Delete confirm"
    }
  },
  methods: {
    confirmedAction: function(){
      this.$emit("confirmedAction",this.docId)
    },
    close: function(){
      this.$emit("close")
    }
  }  
}
</script>
