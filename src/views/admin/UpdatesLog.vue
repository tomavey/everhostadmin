<template>
  <v-container>
    <v-data-table
      :headers = headers
      :items = updatesLog
    >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="showProperty(item)"
      >
        mdi-file-find
      </v-icon>
    </template>

    </v-data-table>  
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
  methods: {
    showProperty: function(item){
      let link=`https://everhost.io/${item.propertyId}`
      window.open(link)
    },
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
            text: 'Property ID',
            align: 'start',
            sortable: true,
            value: 'propertyId',
          },
          {
            text: 'Updated By (ID)',
            value: 'uid',
          },
          { text: 'Updated', value: "updatedAtAsString", sortable: true },
          { text: 'View Property', value: 'actions', sortable: false },

        ]
    }
  },
  created(){
    this.$store.dispatch("getUpdateLogs")
  }

}
</script>