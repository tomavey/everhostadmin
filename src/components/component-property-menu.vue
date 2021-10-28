<template>
<div>
  <v-tabs
    background-color="white"
    color="black"
    light
    grow
    dense
    class="mx-n11 mx-md-0"
    center-active
  >
    <v-tab v-for="(tab, i) in subSections" :key=i @click="setPropertyTab(tab)">{{tab.tabLabel}}</v-tab>
    
  </v-tabs>
</div>
</template>

<script>
import mixins from "@/mixins"

export default {
  mixins: [mixins],
  data(){
    return {
    }
  },
  computed:{
    subSections: function(){
      return this.$store.getters.subSections
    },
  },
  methods: {
    setPropertyTab: function(tab){
      console.log(tab.routeName)
      if ( tab.routeName ) { this.goToRoute(tab.routeName) }
      this.$store.commit("setPropertyTab", tab.tabLabel)
    },
    goToDialog: function() {
      this.$router.push({name: "PropertyInfoDialog"})
    },
  }
}
</script>

<style scoped>
.v-tab {
  padding: 0px 5px;
}

.v-tabs {
  padding: 0px 0px;
  border-bottom:1px solid #f2f2f2;
}

.v-tab{
  font-size: 0.95rem;
  text-transform:initial;
}
.v-tab.v-tab--active{
  color:#1B98FF;
}


</style>