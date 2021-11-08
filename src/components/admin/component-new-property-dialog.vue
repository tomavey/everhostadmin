<template>
  <v-dialog 
    v-model="dialog"
    persistent
    max-width="600px"
  >

    <v-card
      class="pa-5"
    >
      <v-card-text v-html="instruction">
      </v-card-text>
      <v-card-actions>  
        <v-spacer/>  
        <v-btn icon @click="closeDialog('contentName')">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-icon v-if="userIsAdmin" @click="$router.push({name: 'InstructionsDialog', params: {contentName: contentName}})">mdi-pencil</v-icon>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-actions>
        <slot/>
      </v-card-actions>
      <v-card-subtitle>
        <slot name="footer"/>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn @click="dialogFalse()" block color="primary">Next</v-btn>
      </v-card-actions>  
    </v-card>

  </v-dialog>

</template>

<script>
import mixins from '@/mixins'

export default {
  props: ['dialog','instruction','contentName'],
  mixins: [mixins],
  methods: {
    dialogFalse() { this.$emit('dialogFalse',this.contentName) },
    closeDialog() { this.$emit('closeDialog',this.contentName) },
  }
  
}
</script>