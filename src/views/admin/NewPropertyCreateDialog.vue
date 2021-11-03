<template>
<div>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-icon v-if="userIsAdmin" @click="$router.push({name: 'InstructionsDialog', params: {contentName: 'description'}})">mdi-pencil</v-icon>
      <p v-if="property.propertyId">New Property Code: {{property.propertyId}}</p>

      <component-new-property-dialog
        :dialog=showDialog.propertyId
        :instruction="getInstruction('propertyId')"
        :contentName="'propertyId'"
        @dialogFalse="dialogFalse"
        @closeDialog="closeDialog"
      >
        <v-text-field
          v-model="property.propertyId"
          label="Property Code"
          required
        ></v-text-field>
      </component-new-property-dialog>

      <component-new-property-dialog
        :dialog=showDialog.name
        :instruction="getInstruction('name')"
        :contentName="'name'"
        @dialogFalse="dialogFalse"
        @closeDialog="closeDialog"
      >
        <v-text-field
          v-model="property.name"
          label="Property Name"
          required
        ></v-text-field>
      </component-new-property-dialog>

      <component-new-property-dialog
        :dialog=showDialog.address
        :instruction="getInstruction('address')"
        :contentName="'address'"
        @dialogFalse="dialogFalse"
        @closeDialog="closeDialog"
      >
        <v-text-field
          v-model="property.address"
          label="Address"
          required
        ></v-text-field>
      </component-new-property-dialog>

      <component-new-property-dialog
        :dialog=showDialog.telephone
        :instruction="getInstruction('telephone')"
        :contentName="'telephone'"
        @dialogFalse="dialogFalse"
        @closeDialog="closeDialog"
      >
        <v-text-field
          v-model="property.telephone"
          label="Telephone"
          required
        ></v-text-field>
      </component-new-property-dialog>

      <component-new-property-dialog
        :dialog=showDialog.platform
        :instruction="getInstruction('platform')"
        :contentName="'platform'"
        @dialogFalse="dialogFalse"
      >
        <v-checkbox
          v-model="property.airbnb"
          :label="`AirBnb: ${property.platform.toString()}`"
        ></v-checkbox>
        <v-checkbox
          v-model="property.vrbo"
          :label="`Verbo: ${property.platform.toString()}`"
        ></v-checkbox>
      </component-new-property-dialog>

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <p>{{instructions.name}}</p>
          <v-text-field
            v-model="property.name"
            label="Property Name"
          ></v-text-field>
        </v-col>  
       </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <p>{{instructions.address}}</p>
          <v-text-field
            v-model="property.address"
            label="Address"
            required
          ></v-text-field>
        </v-col>  
       </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <p>{{instructions.telephone}}</p>
          <v-text-field
            v-model="property.telephone"
            label="Telephone"
            required
          ></v-text-field>
        </v-col>  
       </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <p>{{instructions.platform}}</p>
          <v-checkbox
            v-model="property.airbnb"
            :label="`AirBnb: ${property.platform.toString()}`"
          ></v-checkbox>
          <v-checkbox
            v-model="property.vrbo"
            :label="`Verbo: ${property.platform.toString()}`"
          ></v-checkbox>
        </v-col>  
       </v-row>
      <v-btn
        class="mr-4"
        color="primary"
        type="submit"
        block
        v-if="showSubmit"
      >
         Does this all look correct?  Click to submit.
      </v-btn>
    </v-container>
  </v-form>
  </div>
</template>  

<script>
import firebase from 'firebase'
import mixins from '@/mixins'
import componentNewPropertyDialog from '../../components/admin/component-new-property-dialog.vue'


const propertiesRef = firebase.firestore().collection('properties')

export default {
  components: { componentNewPropertyDialog },
  mixins: [mixins],
  data() {
    return {
      pageTitle: "welcome to property dialog",
      property: {},
      fieldsObj: {},
      fieldsArray: [],
      showDialog: {},
      showSubmit: true,
    }
  },
  computed: {
    instructions: function() {
      return this.$store.getters.instructions
    },
  },
  methods: {
    dialogFalse: function(contentName) { 
      this.showDialog[contentName] = false
      let nextContentName = this.nextContentName(contentName)
      this.showDialog[nextContentName] = true 
      },
    closeDialog: function(nextContentName) {
      this.showDialog[nextContentName] = false 
    },  
    submit: async function() {
      let obj = this.property
      let docId = obj.propertyId
      console.log(obj)
      await propertiesRef.doc(docId).set(obj, {merge: true})
      await this.$store.commit("setPropertyId", docId)
      console.log(`New Property ${docId} was created!`)
      await this.$store.dispatch('getProperty', docId)
      this.$store.commit("setPropertyId", docId)
      await this.goToContentDialog('description')
    },
    goToContentDialog: function(contentName){
      this.$router.push({name:'NewPropertyInfoDialog', params: {contentName:'description'}})
    },
    buildPropertyBasicObj: function(){
      let basicMetaInfoObj = {}
      let basicMetaInfoArray = this.$store.getters.basicMetaInfo
      basicMetaInfoArray.forEach((el) => {
        basicMetaInfoObj[el.fieldName] = ""
      })
      basicMetaInfoObj.uid = this.user.data.uid
      basicMetaInfoObj.email = this.user.data.email
      basicMetaInfoObj.createdAt = Date.now()
      basicMetaInfoObj.updatedAt = Date.now()
      basicMetaInfoObj.deletedAt = null
      this.property = basicMetaInfoObj
    },
    buildShowDialog: function(){
      let showDialog = {}
      let basicMetaInfoFieldNamesArray = this.$store.getters.basicMetaInfoFieldNamesArray
      basicMetaInfoFieldNamesArray.forEach((el) => showDialog[el] = false )
      let first = "propertyId"
      showDialog[first] = true
      this.showDialog = showDialog
    },
    nextContentName: function(contentName){
      let basicMetaInfoFieldNamesArray = this.$store.getters.basicMetaInfoFieldNamesArray
      let i = basicMetaInfoFieldNamesArray.indexOf(contentName)
      if ( i === basicMetaInfoFieldNamesArray.length ) { return "" }
      return basicMetaInfoFieldNamesArray[i + 1] 
    },
    addPropertySectionsToObj: function(){
      let fieldsObj = {}
      let fieldsArray = this.$store.getters.subSections
      fieldsArray.forEach( (el) => {
        fieldsObj[el.docid] = "" 
      })
      this.property = {...this.property,...fieldsObj}
    },
    getInstruction: function(contentName) {
      let instructionArrayItem = this.$store.getters.instructions.filter( (el) => el.docId === contentName )
      if ( instructionArrayItem.length ) { return instructionArrayItem[0].content }      
      return "-"
    },
    validateFieldLengths: function(){
      let testsPassed = 0
      let testArray = ['propertyId', 'name', 'address', 'platform']
      testArray.forEach( (el) => { 
        if( this.property[el].length > 3 ) { 
          testsPassed++
          console.log(this.property[el],testsPassed) 
          }
      })
      return testsPassed
      if ( testsPassed === testArray.length ) {
        return testsPassed
      } else {
        return testsPassed
      }
    }
  },
  created(){
    this.buildPropertyBasicObj()
    if ( this.$route.params.propertyId ) { alert(this.$route.params.propertyId) }
    this.buildShowDialog()
    this.addPropertySectionsToObj()
  }

}
</script>

<style scoped>
  .pointer {
    cursor:pointer
  }  
</style>

