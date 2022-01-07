<template>
    <ehc-page>
    <v-card class="mx-auto">
        <v-card-title>{{pageTitle}}</v-card-title>
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="guests"
            :items-per-page="20"
            :search='search' 
            class="elevation-1"
        ></v-data-table>
    </v-card>
    </ehc-page>
</template>

<script>
import auth from "@/mixins/auth.vue"

export default {
    mixins: [auth],
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

            ]
        }
    },
    computed: {
        guests: function(){
            return this.$store.getters.guests
        }
    },
    created(){
        this.$store.dispatch('getGuests',this.$store.getters.user.uid)
        .then( console.log("guests") )
    }
}
</script>