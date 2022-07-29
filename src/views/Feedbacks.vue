<template>
    <ehc-page>
    <ehc-header text="Feedback Data"></ehc-header>
    <ehc-sheet>
        <ehc-table
            :headers="headers"
            :items="feedbacks"
            pagination="auto"
            :itemsPerPage = "20"
            selectable="true"
            @click:row="feedbackDialog = {show: true, item: $event}">
            </ehc-table>
    </ehc-sheet>

    <ehc-dialog v-model="feedbackDialog.show" :title="'feedback: ' + feedbackDialog.item.email" width="500px">
        {{ feedbackDialog.item.description }}
    </ehc-dialog>

  <!--  <v-card class="mx-auto" width="900">
        <v-card-title>{{pageTitle}}</v-card-title>
        <v-data-table
            :headers="headers"
            :items="feedbacks"
            :items-per-page="30"
            :search='searchString' 
            :single-expand="singleExpand"
            :expanded.sync="expanded"
            item-key="createdAt"
            show-expand            
            class="elevation-1"
            :footer-props="{
                showFirstLastPage: true,
                itemsPerPageOptions: [30,50,100,-1]
            }"
        >
        <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
            {{ item.description }}
        </td>
        </template>
    
        </v-data-table>
    </v-card>-->
    </ehc-page>
</template>

<script>
import auth from "@/mixins/auth.vue"
import mixins from '@/mixins'

export default {
    mixins: [auth,mixins],
    data() {
        return {
            feedbackDialog: {
                show: false,
                item: {}
            },
            pageTitle: "Feedback Data",
            search: '',
            expanded: [],
            singleExpand: true,
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
                { text: '', value: 'data-table-expand' },

            ]
        }
    },
    computed: {
        feedbacks: function(){
            return this.$store.getters.feedbacks
            .sort((a,b) => a-b )
            .map( el => {
                el.createdDate = this.formatDate(el.createdAt,'dateOnly')
                if ( el.description ) {
                    el.shortDescription = el.description.slice(0,25)
                }
                return el
            })
        },
        searchString: function(){
            return this.$store.getters.searchString
        },
    },
    created(){
        this.$store.dispatch('getFeedbacks')
        .then( console.log("feedbacks") )
    }
}
</script>

