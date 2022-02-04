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
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            show-expand            
            class="elevation-1"
        >
        <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
            {{ item.description }}
        </td>
        </template>
    
        </v-data-table>
    </v-card>
    </ehc-page>
</template>

<script>
import auth from "@/mixins/auth.vue"
import mixins from '@/mixins'

export default {
    mixins: [auth,mixins],
    data() {
        return {
            pageTitle: "Feedback Data",
            search: '',
            expanded: [],
            singleExpand: false,
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
                    value: 'shortDescription',
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
                    text: 'Created',
                    align: 'start',
                    sortable: true,
                    value: 'createdDate',
                    filterable: true,
                },

            ]
        }
    },
    computed: {
        feedbacks: function(){
            return this.$store.getters.feedbacks
            .sort((a,b) => a-b )
            .map( el => {
                el.createdDate = this.formatDate(el.createdAt,'dateOnly')
                el.shortDescription = el.description.slice(0, 25)
                return el
            })
        }
    },
    created(){
        this.$store.dispatch('getFeedbacks')
        .then( console.log("feedbacks") )
    }
}
</script>

