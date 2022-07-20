<template>
  <ehc-page>
    <v-card-text class="text-center text-h4">{{pageTitle}}</v-card-text>

    <!-- <v-data-table
      :headers = headers
      :items = updatesLog
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [50,100,150,-1]
      }"

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

    </v-data-table> -->
    
    <ehc-table
      :headers="headers"
      :items = "updatesLog"
      :selectable="true">
      
    </ehc-table>
  </ehc-page>
</template>

<script>
import mixins from '@/mixins'

export default {
  mixins: [mixins],
  data() {
    return {
      pageTitle: 'Updates Log',
      updatesLog: [],
    }
  },
  methods: {
    showProperty: function(item){
      let link=`https://everhost.io/${item.propertyId}`
      window.open(link)
    },
    getLogs() {
      this.apiGetDocs('updateslog').then((data) => {
        this.updatesLog = data
      })
    },
  },
  computed: {

    // updatesLog: function(){
    //   return this.$store.getters.updatesLog
    //   .map( el => {
    //     el.updatedAtAsString = this.dateFormat(el.updatedAt,"dateOnly")
    //     el.searchAble = `${el.updatedAtAsString} ${el.propertyId} ${el.propertyCity} ${el.propertyName} ${el.uid}`
    //     return el
    //   })
    //   .filter( el => {
    //     if ( this.searchString ) {
    //       return el.searchAble.toLowerCase().includes(this.searchString.toLowerCase())
    //     } else {
    //       return true
    //     }
    //   })
    //   .sort( (a,b) => {
    //       if ( a.updatedAt < b.updatedAt ) {return 1}
    //       else { return -1 }
    //   })

    // },
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
    },
    searchString: function(){
      return this.$store.getters.searchString
    },
  },
  created(){
    // this.$store.dispatch("getUpdateLogs")
    this.getLogs()
  }

}
</script>