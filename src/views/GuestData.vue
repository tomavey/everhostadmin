<template>
    <ehc-page>
    <v-card>
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
export default {
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
            ]
        }
    },
    computed: {
        guests: function(){
            return this.$store.getters.guests
        }
    },
    created(){
        this.$store.dispatch('getGuests')
        .then( console.log("guests") )
    }
}
</script>