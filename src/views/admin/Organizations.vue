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
      :search="search"
      :single-expand="singleExpand"
      show-expand
      :expanded.sync="expanded"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [50,100,150.-1]
      }"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="alert('?')"
      >
        mdi-file-find
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        Members of {{ item.membersList }}
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
      search: null,
      expanded: [],
      singleExpand: false,
    }
  },
  methods: {
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
          { text: '', value: 'data-table-expand' },
        ]
    }
  },
  created(){
    this.$store.dispatch('getOrgs')
  }
}
</script>

