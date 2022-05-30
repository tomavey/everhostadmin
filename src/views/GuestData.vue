<template>
    <ehc-page>
    <v-card class="mx-auto">
        <v-card-title>{{pageTitle}}</v-card-title>
        <v-data-table
            :headers="headers"
            :items="guests"
            :items-per-page="20"
            :search='searchString' 
            class="elevation-1"
        ></v-data-table>
    </v-card>
    </ehc-page>
</template>

<script>
import auth from "@/mixins/auth.vue"
import mixins from '@/mixins'

export default {
    mixins: [auth, mixins],
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
        guests: function(){
            return this.$store.getters.guests.map( el => {
                el.createdAtAsString = this.dateFormat(el.createdAt,"dateOnly")
                return el
            })
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