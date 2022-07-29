<template>
    <ehc-page>
    <ehc-header text="Guest Data" :actions="headerActions"></ehc-header>

    <ehc-sheet>
        <ehc-table
            :headers="headers"
            :items="guests">
        
        </ehc-table>
    
    </ehc-sheet>

  <!--  <v-card class="mx-auto">
        <v-card-text>
           <ehc-download-button 
                :data="guestsForDownload" 
                :label="'Download as Excel'" 
                :fileName="'MY_GUESTS'" 
                :header="'EVERHOST GUEST DATA'"
                />
        </v-card-text>
        <v-card-title>{{pageTitle}}</v-card-title>

        <v-data-table
            :headers="headers"
            :items="guests"
            :items-per-page="20"
            :search='searchString' 
            class="elevation-1"
        ></v-data-table> -->
    </v-card>
    </ehc-page>
</template>

<script>
import auth from "@/mixins/auth.vue"
import mixins from '@/mixins'
import EhcDownloadButton from '@/components/ehc-download-button.vue'

export default {
    mixins: [auth, mixins],
    components: {EhcDownloadButton}, 
    data() {
        return {
            pageTitle: "Guest Data",
            search: '',
            headers: [
                {
                    text: 'Last Name',
                    align: 'start',
                    sortable: true,
                    value: 'lname',
                    filterable: true,
                },
                {
                    text: 'First Name',
                    align: 'start',
                    sortable: true,
                    value: 'fname',
                    filterable: true,
                },
                {
                    text: 'Email',
                    align: 'start',
                    sortable: true,
                    value: 'email',
                    filterable: true,
                },
                {
                    text: 'Phone',
                    align: 'start',
                    sortable: false,
                    value: 'phone',
                },
                {
                    text: 'City',
                    align: 'start',
                    sortable: true,
                    value: 'propertyCity',
                    filterable: true,
                },
                {
                    text: 'State',
                    align: 'start',
                    sortable: true,
                    value: 'propertyState',
                    filterable: true,
                },
                {
                    text: 'Property',
                    align: 'start',
                    sortable: true,
                    value: 'propertyName',
                    filterable: true,
                },
                {   
                    text: 'Created', 
                    value: "createdAtAsString", 
                    sortby: "createdAt",
                    sortable: true 
                },
            ]
        }
    },
    computed: {
        headerActions() {
            let actions = [
                {actionType: 'ehc-download-button', 
                label: "Download Search Results",
                data: this.guestsForDownload , 
                fileName:"'MY_GUESTS'" ,
                header:"'EVERHOST GUEST DATA'",
                color: "tertiary", 
                dark: false, 
                prependIconURL: require('@/assets/icons/Download Search Results@3x.svg'), 
                clickEmit: "addProperty"},

                {actionType: 'ehc-download-button', 
                label: "Download All",
                data: this.guestsForDownload , 
                fileName:"'MY_GUESTS'" ,
                header:"'EVERHOST GUEST DATA'",
                color: "primary", 
                dark: true, 
                prependIconURL: require('@/assets/icons/Download All@3x.svg'), 
                clickEmit: "addProperty"},        
            ]
            return actions
        },
        guests: function(){
            return this.$store.getters.guests.map( el => {
                el.createdAtAsString = this.dateFormat(el.createdAt,"dateOnly")
                return el
            })
        },
        guestsForDownload: function(){
            let guestsForDownload = []
            let guest = {}
            this.guests.forEach( el => {
                guest = {}
                guest.LAST_NAME = el.lname || ""
                guest.FIRST_NAME = el.fname || ""
                guest.EMAIL = el.email || ""
                guest.PHONE = el.phone || ""
                guest.CITY = el.propertyCity || ""
                guest.STATE = el.propertyState || ""
                guest.PROPERTY = el.propertyName || ""
                guest.PROPERTY_ID = el.propertyId || ""
                guest.CREATED = el.createdAtAsString || ""
                guestsForDownload.push(guest)
            })
            return guestsForDownload
        },
        searchString: function(){
            return this.$store.getters.searchString
        },  // this is the search string from the store
    },
    created(){
        this.$store.dispatch('getGuests',this.$store.getters.user.uid)
        .then( console.log("guests") )
    }
}
</script>