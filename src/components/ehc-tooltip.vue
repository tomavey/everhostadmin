<template>
  <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <slot/>
      </template>
      <span>{{popupMessage}}</span>
  </v-tooltip>

</template>

<script>
export default {
  props: {
    popupMessage: {type: String, default: "Edit this property"},
  }
}
</script>