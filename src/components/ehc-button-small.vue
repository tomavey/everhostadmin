<template>
  <v-btn
    rounded
    :color="color"
    dark
    x-small
    @click="submit" 
    class='mb-1 ehc-button-small'
    v-bind="$attrs"
  >
  <v-icon left>
    {{icon}}
  </v-icon>
    {{text}}
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    color: {type: String, default: 'button'}
  },
  methods: {
    submit: function(){
      this.$emit('submit')
    }
  }
}
</script>

<style>

.ehc-button-small .v-progress-circular {
  height: 15px !important;
  width: 15px !important;
}




</style>