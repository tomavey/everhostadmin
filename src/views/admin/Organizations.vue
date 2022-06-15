<template>
<v-container>
  <p style="text-align: center; font-weight: bold; font-size: 1.3em">{{pageTitle}}</p>
  Count: {{orgs.length}}
  <div>
    <v-data-table
      :headers="headers"
      :items="orgs"
      item-key="creator"
      class="elevation-1"
      :search="searchString"
      :single-expand="singleExpand"
      show-expand
      :expanded.sync="expanded"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [50,100,150.-1]
      }"
    >
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$router.push(`/organization/${item.orgId}`)"
      >
        mdi-file-find
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-card>
          <v-card-text>
            Members:
              <ul>
                <li v-for="memberId in item.members" :key="memberId">
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
        <v-card>
          <v-card-text>
            Add a company white label (displays above footer):<v-text-field v-model="item.companyLabel" @change="updateLabel(item)"></v-text-field>
          </v-card-text>
        </v-card>
      </td>
    </template>
    </v-data-table>
  </div>
</v-container>  
</template>

<script>
import mixins from '@/mixins'
import auth from '@/mixins/auth'

export default {
  mixins: [mixins,auth],
  data: function() {
    return {
      pageTitle: "Organizations",
      expanded: [],
      singleExpand: true,
      whiteLabel: "",
    }
  },
  methods: {
    updateLabel: function(item) {
      console.log("updateLabel",item.companyLabel, item.orgId)
      this.$store.dispatch('addWhiteLabel',{orgId: item.orgId, label: item.companyLabel})
    },
    showThisUidProperties: function(memberId){
      console.log("showThisUidProperties",memberId)
      this.$router.push({name: "Properties", query: {search: memberId, showAll: true}})  
    },
  },
  computed: {
    orgs: function(){
      return this.$store.getters.orgs
      .map(org => {
        org.membersList = org.members[0]
        return org
      })
      .sort( (a,b) => {
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
      })
    },
    headers: function(){
      return [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Organization Id',
            sortable: true,
            value: 'orgId',
          },
          {
            text: 'Created By',
            sortable: true,
            value: 'creator',
          },
          { text: 'View', value: 'actions', sortable: false },
          { text: '', value: 'data-table-expand' },
        ]
    },
    searchString: function(){
      return this.$store.getters.searchString
    },  
  },
  created(){
    this.$store.dispatch('getOrgs')
  }
}
</script>

