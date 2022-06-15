<template>
  <v-card class="mx-auto text-center">
      <v-card-text v-for="(field, i) in fields" :key="i" class="text-h5">
        {{field.label}}: {{org[field.key]}}
      </v-card-text>
      <v-card-text class="text-subtitle-1">
        Members:
        <ul>
          <li v-for="memberId in org.members" :key="memberId">
            {{memberId}} 
            <v-icon
              small
              class="mr-2"
              @click="showThisUidProperties(memberId)"
            >
              mdi-file-find
            </v-icon>
          </li>
        </ul>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['org','fields'],
  data: function() {
    return {
    }
  },
  methods:{
    showThisUidProperties: function(memberId){
      console.log("showThisUidProperties",memberId)
      this.$router.push({name: "Properties", query: {search: memberId, showAll: true}})  
    },
  }
}
</script>

<style scoped>
  ul li {
    list-style: none;
  }
</style>