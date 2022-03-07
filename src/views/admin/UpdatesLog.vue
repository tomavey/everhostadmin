<template>
  <v-container>
    <v-data-table
      :headers = headers
      :items = updatesLog
    ></v-data-table>  
  </v-container>
</template>

<script>
import mixins from '@/mixins'

export default {
  mixins: [mixins],
  data() {
    return {
    }
  },
  computed: {
    updatesLog: function(){
      return this.$store.getters.updatesLog
      .map( el => {
        el.updatedAtAsString = this.dateFormat(el.updatedAt,"dateOnly")
        return el
      })
      .sort( (a,b) => {
          if ( a.updatedAt < b.updatedAt ) {return 1}
          else { return -1 }
      })

    },
    headers: function(){
      return [
          {
            text: 'City',
            align: 'start',
            sortable: true,
            value: 'propertyCity',
          },
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'propertyName',
          },
          {
            text: 'ID',
            align: 'start',
            sortable: true,
            value: 'propertyId',
          },
          {
            text: 'User Id',
            value: 'uid',
          },
          { text: 'Updated', value: "updatedAtAsString", sortable: true },
        ]
    }
  },
  created(){
    this.$store.dispatch("getUpdateLogs")
  }

}
</script>