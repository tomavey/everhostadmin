<template>
  <v-file-input
    v-model="files"
    :color="color" 
    counter
    :label="props.label"   
    :multiple="props.multiple" 
    placeholder="Select your files"
    prepend-icon="mdi-paperclip"
    outlined
    :show-size="1000"
  >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        :color="color" 
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
</template>

<script>

  export default {
    mixins: [],
    props: ['props', 'value', 'color'],
    data: () => ({
        files: []
    }),
    created () {
        this.files = this.value
    },  
    watch: {
        value() {
            this.files = this.value
        },
        files(val) {
            this.$emit('input', val)
        }
    },
    computed: {

    },
    methods: {
    },
  }
</script>

<style scoped>
</style>


