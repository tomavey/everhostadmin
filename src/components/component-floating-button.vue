<template>
<div>
  <v-scroll-y-reverse-transition>
    <v-tooltip bottom>    
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-show="!hideNext"
          :color=color
          elevation="8"
          small
          dark
          fixed
          :width=width
          :right=right
          :block=block
          :text=block
          :fab=fab
          v-bind="attrs"
          v-on="on"
          @click='goToRoute("PropertyInfoDialog")'
        >
        <v-icon v-if="fab">mdi-pencil</v-icon>
        <span v-if="block">Next: {{nextRouteName}}</span>
        </v-btn>
      </template>
    <span class="text-md-h4">Edit</span>
    </v-tooltip>
  </v-scroll-y-reverse-transition>
</div>
</template>

<script>
import mixins from '@/mixins'

export default {
  props: {
    nextRouteName: {
      type: String
    },
    buttonType: {
      type: String,
      default: "fab"
    }
  },
  mixins: [mixins],
  data(){
    return {
      hideNext: true,
    }
  },
  computed: {
    fab: function(){ 
      if (this.buttonType === "fab") {
      return true 
      } else { 
        return false 
      }
    },  
    block: function(){ 
        if (this.buttonType === "block") {
        return true 
      } else { 
        return false 
      }
    },  
    color: function(){ 
        if (this.buttonType === "block") {
        return "blue"
      } else { 
        return "primary" 
      }
    },  
    right: function(){ 
        if (this.buttonType === "block") {
        return false
      } else { 
        return true 
      }
    },  
    width: function(){ 
        if (this.buttonType === "block") {
        return "300"
      } else { 
        return "" 
      }
    },  
  },
  created(){
    this.hideNext = false
  }
}
</script>