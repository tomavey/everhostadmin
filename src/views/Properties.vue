<template>
    <ehc-page>
        <v-toolbar flat>
            <v-toolbar-title flat>
                Properties
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
            <v-btn  
                fab 
                small 
                class="mx-2 elevation-0"  
                color="Gray1"
                @click="searchSettings">
                <v-icon>mdi-tune-vertical-variant</v-icon>
            </v-btn>
            <v-btn
                rounded
                color="primary"
                dark
                large
                @click="addProperty()" 
                class='mx-1 elevation-0'
            >
                <v-icon class="mr-1 ml-0">mdi-plus</v-icon>
                add property
            </v-btn>
        </v-toolbar>
        <v-container fluid>
            <v-row>
                <v-col 
                    cols="12" 
                    xs="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="2"
                    v-for="(property, index) in properties" 
                    :key="index">
                    <ehc-property-card :property="property"></ehc-property-card>
                </v-col>
            </v-row>
        </v-container>
    </ehc-page>
</template>


<script>
import EhcPropertyCard from '../components/ehc-property-card.vue'



export default {
    components: {EhcPropertyCard},
    name: 'properties',

    data: () => ({

    }),
    computed: {
        properties() {
            return this.$store.getters.properties
        }
    },
    methods: {
        addProperty() {
            console.log("addProperty button pushed")
            this.$store.dispatch('makeNewProperty')
        },
        searchSettings() {
            console.log("TODO")
        }
    },
    created() {
        this.$store.dispatch("getProperties")
    }

}
</script>