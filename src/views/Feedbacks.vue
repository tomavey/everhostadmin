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
            :items="feedbacks"
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
            pageTitle: "Feedback Data",
            search: '',
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'name',
                    filterable: true,
                },
                {
                    text: 'Description',
                    align: 'start',
                    sortable: true,
                    value: 'description',
                    filterable: true,
                },
                {
                    text: 'Email',
                    align: 'start',
                    sortable: true,
                    value: 'email',
                    filterable: true,
                },
            ]
        }
    },
    computed: {
        feedbacks: function(){
            return this.$store.getters.feedbacks
        }
    },
    created(){
        this.$store.dispatch('getFeedbacks')
        .then( console.log("feedbacks") )
    }
}
</script>