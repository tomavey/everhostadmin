<template>
  <v-container>
    <v-dialog v-model="dialogCopy" max-width="500px">
    <v-card>
      <v-card-title class="text-h5 text-center">
        <slot name="header"></slot>
      </v-card-title>
      <v-card-actions>
        <slot name="default"></slot>
      </v-card-actions>
      <v-card-text class="text-h6">
        <slot name="footer"></slot>
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
  props: ['dialogCopy'],
  data() {
    return {
      pageTitle: "Copy confirm"
    }
  },
  methods: {
    confirmedAction: function(){
      this.$emit("confirmedAction")
    },
    close: function(){
      this.$emit("close")
    }
  }  
}
</script>
