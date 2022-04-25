<template>
<v-container fluid>
  <v-data-table
    :headers="headers"
    :items="properties"
    :items-per-page="30"
    class="elevation-1"
    :single-expand="singleExpand"
    :expanded.sync="expanded"    
    :show-expand = userIsAdmin  
    item-key="createdAt"   
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
    <template v-slot:item.copy="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="copyProperty(item)"
      >
        mdi-content-copy
      </v-icon>
      <!-- <span v-if="item.copiedFrom">*</span> -->
    </template>
    <template v-slot:item.guestinfo="{ item }">
      <v-icon
        v-if="!item.noguestinfo"
        small
        class="mr-2"
        @click="setGuestInfo(item)"
      >
        mdi-check-outline
      </v-icon>
      <v-icon
        v-if="item.noguestinfo"
        small
        class="mr-2"
        @click="setGuestInfo(item)"
      >
        mdi-close-box-outline
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

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <span style="font-size: .8em;">This feature is in 'beta'. Be sure you enter a valid uid<br/></span>
        Change User ID for Property ID: {{item.propertyId}}:&nbsp;
        <v-col cols="4">
        <v-text-field
          v-if="!newUidMessage"
          v-model="newUid"
          label="New User Id"
          :append-outer-icon="newUid ? 'mdi-send' : ''"
          @click:append-outer="transferProperty({propertyId: item.propertyId, uid: newUid})"
          >
        </v-text-field>
        <v-checkbox
          v-if="!newUidMessage"
          v-model="moveGuestInfo"
          label="Transfer guest data also"
          :value=moveGuestInfo
          class="my-1"
        ></v-checkbox>
        <p v-if="newUidMessage">{{newUidMessage}}</p>
        </v-col>
      </td>
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
      propertyId: null,
      expanded: [],
      singleExpand: false,
      newUid: null,
      newUidMessage: null,
      moveGuestInfo: true,
      item: {},
    }
  },
  methods: {
    goToProperty(item) {
        const url = this.appSite + "login/" + item.propertyId
        console.log("opening property URL", url)
        window.open(url,"", "width=900, height=812");
    },
    copyProperty(item){
      this.$store.dispatch("copyProperty", item)
      // this.$store.commit("setShowAlert", true)
      // this.$store.commit("setAlertMessage", "Copy property is not working yet")
      // setTimeout(() => {
      //   this.$store.commit("setShowAlert", false)
      // }, 3000)
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
    async confirmAction(){
      if ( this.newUid ) { await this.updatePropertyUid(this.item) }
      else { await this.$store.dispatch("markPropertyDeletedAt", this.propertyId) }
      this.$store.commit("setShowConfirm",false)
      this.$store.commit("setConfirmMessage",'')
    },
    setGuestInfo(item){
      this.$store.dispatch("setGuestInfoSwitchOnProperty", item)
    },
    transferProperty(item){
      this.item = item
      this.$store.commit("setShowConfirm",true)
      let message = "Are you sure that you want to transfer this property"
      if ( this.moveGuestInfo ) { message += " and guest data" } else { message += " without guest data" }
      message = message + " to " + this.newUid + "?"
      this.$store.commit("setConfirmMessage", message)
    },
    updatePropertyUid(item){
      console.log("updating property uid", item)
      this.newUidMessage = "Updating..."
      this.$store.dispatch("doesUserExist", item.uid).then( (response) => {
        if(!response){
          this.newUidMessage = "Not a valid user id"
          setTimeout( () => {
            this.expanded = []
            this.newUidMessage = ""
            this.newUid = null
          }, 3000)
        } else {
          this.$store.dispatch("updatePropertyUid", item).then( () => {
            this.newUidMessage = "Updated"
            if ( this.moveGuestInfo ) { this.$store.dispatch("moveGuestDataToUser", {uid: item.uid, propertyId: item.propertyId}) }
            setTimeout( () => {
              this.expanded = []
              this.newUidMessage = ""
              this.newUid = null
            }, 3000)
          })
        }
      })
    },
  },
  computed: {
    appSite() {return this.$store.getters.appSite},
    headers(){
      let headers
      let userHeaders = [
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'State', value: 'state' },
        { text: 'Id', value: 'propertyId' },
        { text: 'Published', value: 'publishedAtAsString' },
        { text: 'Created', value: 'createdAtAsString' },
        { text: 'Updated', value: 'updatedAtAsString' },
        { text: 'Edit', value: 'edit', sortable: false },
        { text: 'Publish', value: 'publish', sortable: false },
        { text: 'Copy', value: 'copy', sortable: false, admin: true },
        { text: 'Ask for Guest Info', value: 'guestinfo', sortable: false, admin: true },
      ]
      let adminHeaders = [
        { text: 'Delete', value: 'delete', sortable: false, admin:true },
        { text: '', value: 'data-table-expand' },
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