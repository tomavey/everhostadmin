<template>
  <v-card class="mx-auto text-center">

      <!-- LIST FIELDS AND VALUES -->
      <v-card-text v-for="(field, i) in fields" :key="i" class="text-h5">
        {{field.label}}: {{org[field.key]}}
      </v-card-text>

      <!-- LIST MEMBERS IN A TABLE -->
      <v-card-text class="text-h5">
        Members:
        <v-data-table
          :headers="headers"
          :items = "org.members"
          class="mx-10"
          v-if="org.members && org.members[0] && org.members[0].uid"
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
  props: ['fields'],
  data: function() {
    return {
      headers: [
        { text: 'Display Name', value: 'displayName' },
        { text: 'Email', value: 'email' },
        { text: 'ID', value: 'uid' },
      ]
    }
  },
  computed: {
    org() {
      //return org from store
      return this.$store.getters.org
    },
  },
  methods:{
    showThisUidProperties: function(memberId){
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