<template>
<!-- <v-container>
    <v-toolbar
      color="primary"
      dark
      >
      <v-toolbar-title>{{org.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="showInfo = !showInfo; showForm=!showForm" class="mx-auto text-center"><v-icon>mdi-pencil</v-icon></v-btn>
     </v-toolbar>
    <ehc-organization-card :fields="fieldsForCard" v-if="showInfo" />
    <ehc-organization-add-member :org="org" />
    <v-container v-if="showForm">
        <ehc-form 
            v-model="formData" 
            :meta="meta" 
            :shakeInvalid="shakeVariable"
            @submit="updateOrg()"
            @valid="isValid = $event"
            />
    </v-container>
  </v-container> -->

  <ehc-page>
    <ehc-organization v-model="orgID">

    </ehc-organization>
  </ehc-page>
</template>

<script>
import EhcOrganizationAddMember from '../../components/ehc-organization-add-member.vue'
import ehcOrganizationCard from '../../components/ehc-organization-card.vue'
import ehcOrganization from '../../components/ehc-organization.vue'


export default {
  components: { ehcOrganizationCard, EhcOrganizationAddMember, ehcOrganization },
  data: function() {
    return {
      formData: {},
      meta: [
        {type: "text",            label: "Organization Name",             key: "name"},
        {type: "text",            label: "Company White Label",           key: "companyLabel"},
        {type: "link",            label: "Web Site",                      key: "webSite"},
        {type: "intPhoneNumber",  label: "Phone",                         key: "phone"},
        {type: "number",          label: "Property Limit",                key: "propertyLimit"},
        {type: "button",          label: "submit",                        key: "submit",          emitOnClick: "submit",  hideInCard: true},
      ],
      shakeVariable: true,
      isValid: false,
      showInfo: true,
      showForm: false,
    }
  },
  computed: {
    orgID() {
      return this.$route.params.id
    },
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
      this.apiUpdateOrg(this.formData.orgId, this.formData)
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
    // prependHttp(url, {https = true} = {}) {
    //   if (!url.length) {return null}
    //   if (typeof url !== 'string') {
    //       throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof url}\``);
    //   }

    //   url = url.trim();

    //   if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
    //       return url;
    //   }

    //   return url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? 'https://' : 'http://');
    // },

  },
  watch: {
    org: function(){
      this.formData = this.org
    },
  },
  created(){
    this.$store.dispatch('getOrganization',this.$route.params.id)
    this.$store.dispatch('getMembers',this.$route.params.id)
  },
}
</script>

