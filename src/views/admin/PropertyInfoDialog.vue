<template>
<div>
  <v-form @submit.prevent="submit">
    <v-container>
    <v-alert type="warning" v-if="htmlEdit">HTML edit is on - this will not show for normal users</v-alert>
      <v-expansion-panels>

      <v-expansion-panel v-for="(item,index) in basicMetaInfo" :key="index">    
        <v-expansion-panel-header>
          {{item.fieldName}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
        <v-row v-if="item.validType === 'binary'">
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="property[item.fieldName]"
              :label=item.fieldName
              required
              tabindex="2"
            ></v-text-field>
          </v-col>  
        </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>    
        <v-expansion-panel-header>
          Platform(s)
        </v-expansion-panel-header>
        <v-expansion-panel-content>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
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
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel v-for="section in subSections" :key=section.tabLabel>    
        <v-expansion-panel-header>
          {{section.tabLabel}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="htmlEdit">
            <v-col
              cols="12"
              md="4"
            >
              <v-textarea
                v-model="property[section.docid]"
                required
                tabindex="2"
              ></v-textarea>
            </v-col>  
          </v-row>
          <v-row v-if="!htmlEdit">
            <wysiwyg v-model="property[section.docid]" tabindex="5"/>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      </v-expansion-panels>

      <v-btn
        class="mr-4"
        color="primary"
        type="submit"
        block
      >
        submit
      </v-btn>
    </v-container>
  </v-form>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn icon @click="htmlEdit = !htmlEdit" class="pointer">
            <v-icon>mdi-nintendo-switch</v-icon>
          </v-btn>
        </v-col>
      </v-row>
  </div>
</template>  

<script>
import firebase from 'firebase'

const propertiesRef = firebase.firestore().collection('properties')

export default {
  data() {
    return {
      message: "welcome to property dialog",
      valid: true,
      invalid: false,
      property: {},
      htmlEdit: false
    }
  },
  computed: {
    propertyId: function() {
      return this.$store.getters.propertyId
    },
    subSections: function(){
      return this.$store.getters.subSections
    },
    basicMetaInfo: function(){
      return this.$store.getters.basicMetaInfo.filter( (el) => {
        if ( el.editable === true && el.validType !== 'binary' ) {
          return true
        } else {
          return false
        }
      })
    },
    platforms: function(){
      return this.$store.getters.basicMetaInfo.filter( (el) => {
        if ( el.editable === true && el.validType == 'binary' ) {
          return true
        } else {
          return false
        }
      })
    }
  },
  methods: {
    toggleHtml: function(){
      this.htmlEdit = !this.htmlEdit
    },
    submit: function() {
      let self = this
      let obj = {...this.property}
      propertiesRef.doc(obj.docId).set(obj)
      .then( () => {
        console.log("Property updated successfully")
        this.$store.dispatch('getProperty',this.propertyId)
      } )
      .catch( e => console.log(e) )
      this.$router.go(-1)
    },
  },
  created(){
    if ( this.propertyId ) {
      let docId = this.propertyId
      propertiesRef.doc(docId).get()
      .then( doc => {
        let obj = doc.data()
        obj = {...obj, docId: docId }
        this.property = obj
      })
    }
  }

}
</script>

<style scoped>
  .pointer {
    cursor:pointer
  }  
</style>

