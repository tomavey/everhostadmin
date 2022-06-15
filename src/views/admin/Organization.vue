<template>
<v-container>
    <v-toolbar
      color="primary"
      dark
      >
      <v-toolbar-title>{{org.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showInfo = !showInfo; showForm=!showForm" class="mx-auto text-center"><v-icon>mdi-pencil</v-icon></v-btn>
     </v-toolbar>
    <ehc-organization-card :fields="fieldsForCard" :org="org" v-if="showInfo" />
    <v-container v-if="showForm">
        <ehc-form 
            v-model="formData" 
            :meta="meta" 
            :shakeInvalid="shakeVariable"
            @submit="updateOrg(org)"
            @valid="isValid = $event"
            />
    </v-container>
  </v-container>
</template>

<script>
import ehcOrganizationCard from '../../components/ehc-organization-card.vue'
export default {
  components: { ehcOrganizationCard },
  data: function() {
    return {
      formData: {},
      meta: [
        {type: "text",            label: "Organization Name",             key: "name"},
        {type: "text",            label: "Company White Label",           key: "companyLabel"},
        {type: "link",            label: "Web Site",                      key: "webSite"},
        {type: "intPhoneNumber",  label: "Phone",                         key: "phone"},
        {type: "button",          label: "submit",                        key: "submit",          emitOnClick: "submit",  hideInCard: true},
      ],
      shakeVariable: true,
      isValid: false,
      showInfo: true,
      showForm: false,
    }
  },
  computed: {
    org: function(){
      let org = this.$store.getters.org
      return org
    },
    fieldsForCard: function(){
      let fields = this.meta.filter(field => field.hideInCard !== true)
      return fields
    },
  },
  methods: {
    updateOrg: function(){
      if ( this.formData.webSite ) {
        this.formData.webSite = this.prependHttp(this.formData.webSite)
      }
      this.$store.dispatch('updateOrg',this.formData)
      this.showInfo = true
      this.showForm = false
    },
    updateLabel: function(item) {
      console.log("updateLabel",item.companyLabel, item.orgId)
      this.$store.dispatch('addWhiteLabel',{orgId: item.orgId, label: item.companyLabel})
    },
    showThisUidProperties: function(memberId){
      console.log("showThisUidProperties",memberId)
      this.$router.push({name: "Properties", query: {search: memberId, showAll: true}})  
    },
    prependHttp(url, {https = true} = {}) {
      if (!url.length) {return null}
      if (typeof url !== 'string') {
          throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof url}\``);
      }

      url = url.trim();

      if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
          return url;
      }

      return url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? 'https://' : 'http://');
    },

  },
  watch: {
    org: function(){
      this.formData = this.org
    },
  },
  created(){
    this.$store.dispatch('getOrganization',this.$route.params.id)
  },
}
</script>

