<template>
  <v-card class="mx-auto text-center">
      <v-card-text v-for="(field, i) in fields" :key="i" class="text-h5">
        {{field.label}}: {{org[field.key]}}
      </v-card-text>
      <v-card-text class="text-h5">
        Members:
        <v-data-table
          :headers="headers"
          :items = "org.members"
          class="mx-10"
          >
          <template v-slot:item.uid="{ item }">
            <td>
              {{ item.uid }}
              <v-icon
                small
                class="mr-2"
                @click="showThisUidProperties(item.uid)"
              >
                mdi-file-find
              </v-icon>
            </td>
          </template>

        </v-data-table>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['org','fields'],
  data: function() {
    return {
      headers: [
        { text: 'Display Name', value: 'displayName' },
        { text: 'Email', value: 'email' },
        { text: 'ID', value: 'uid' },
      ]
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