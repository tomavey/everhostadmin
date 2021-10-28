<template>
  <div>
    <v-row v-if="htmlEdit">
      <v-col
        cols="12"
        md="4"
      >
        <v-textarea
          v-model="field"
          required
          tabindex="2"
        ></v-textarea>
      </v-col>  
    </v-row>
    <v-row v-if="!htmlEdit">
      <wysiwyg v-model="field" tabindex="5"/>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ['field','htmlEdit'],
  data: () => {
    return {
      pageTitle: "Property Info"
    }
  }
}
</script>