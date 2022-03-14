<template>
<v-container fluid>
  <v-data-table
    :headers="headers"
    :items="properties"
    :items-per-page="30"
    class="elevation-1"
    :footer-props="{
      showFirstLastPage: true,
      itemsPerPageOptions: [50,100,150.-1]
    }"
  >

    <template v-slot:item.edit="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="goToProperty(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-if="userIsAdmin" v-slot:item.copy="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="copyProperty(item)"
      >
        mdi-content-copy
      </v-icon>
      <!-- <span v-if="item.copiedFrom">*</span> -->
    </template>
    <template v-slot:item.publish="{ item }">
      <v-icon
        v-if="!item.publishedAt"
        small
        class="mr-2"
        @click="publishProperty({propertyId: item.propertyId, publishedAt: true})"
      >
        mdi-publish
      </v-icon>
      <v-icon
        v-else
        small
        class="mr-2"
        @click="publishProperty({propertyId: item.propertyId, publishedAt: false})"
      >
        mdi-publish-off
      </v-icon>
    </template>
    <template v-slot:item.delete="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="deleteProperty(item.propertyId)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
    <span>* = not updated after 3/14/22</span>
    <ehc-alert-confirm @confirmAction="confirmAction" ></ehc-alert-confirm>
</v-container>
</template>

<script>
import PropertyActions from '@/mixins/propertyActions'
import Auth from '@/mixins/auth'
import ehcAlertConfirm from './ehc-alert-confirm.vue'

export default {
  components: { ehcAlertConfirm },
  mixins: [PropertyActions,Auth],
  props: ['properties'],
  data() {
    return {
      propertyId: null
    }
  },
  methods: {
    goToProperty(item) {
        const url = this.appSite + "login/" + item.propertyId
        console.log("opening property URL", url)
        window.open(url,"", "width=900, height=812");
    },
    copyProperty(item){
      this.$store.dispatch('copyProperty',item)
    },
    publishProperty(publishObj) {
        this.$store.dispatch("markPropertyPublishedAt", publishObj).then(() => {
          console.log("published")
        })
    },
    deleteProperty(propertyId){
      this.propertyId = propertyId
      this.$store.commit("setShowConfirm",true)
      this.$store.commit("setConfirmMessage",'Are you sure?')
    },
    confirmAction(){
      this.$store.dispatch("markPropertyDeletedAt", this.propertyId)
      .then( () => {
        this.$store.commit("setShowConfirm",false)
        this.$store.commit("setConfirmMessage",'')
      })
    }
  },
  computed: {
    appSite() {return this.$store.getters.appSite},
    headers(){
      let headers
      let userHeaders = [
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'State', value: 'state' },
        { text: 'Property Id', value: 'propertyId' },
        { text: 'Published', value: 'publishedAtAsString' },
        { text: 'Created', value: 'createdAtAsString' },
        { text: 'Updated', value: 'updatedAtAsString' },
        { text: 'Edit', value: 'edit', sortable: false },
        { text: 'Publish', value: 'publish', sortable: false },
        { text: 'Copy', value: 'copy', sortable: false, admin: true },
      ]
      let adminHeaders = [
        { text: 'Delete', value: 'delete', sortable: false, admin:true },
      ]
      if ( this.userIsAdmin ) {
        headers = [...userHeaders, ...adminHeaders]
      } else {
        headers = userHeaders
      }
      return  headers
    }
  }
}
</script>