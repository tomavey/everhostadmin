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
                :loading="addLoading"
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
        <ehc-dialog max-width="300" v-model="maxPropsDialog" title="Max Properties Reached">
            <h3>you have reached the maximum number of properties available</h3>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn plain color="primary" @click="maxPropsDialog = false">
                    <strong>OK</strong>
                </v-btn>
            </template>
        </ehc-dialog>
    </ehc-page>
</template>


<script>
import EhcPropertyCard from '../components/ehc-property-card.vue'



export default {
    components: {EhcPropertyCard},
    name: 'properties',

    data: () => ({
        maxProperties: 3,
        maxPropsDialog: false,
        addLoading: false
    }),
    watch: {
        loading(val) {
            this.$store.commit('setLoading', val)
        }
    },
    computed: {
        loading() {
            return this.$store.getters.propertiesStatus.loading
        },
        properties() {
            return this.$store.getters.properties
        }
    },
    methods: {
        addProperty() {
            if (this.properties.length < 3) {
                this.addLoading=true
                console.log("addProperty button pushed")
                this.$store.commit("setLoading", true)
                this.$store.dispatch('makeNewProperty').then(res => {
                    this.$store.dispatch("getProperties").then(res => {
                        this.$store.commit("setLoading", false)
                        this.addLoading=false
                    })
                })
            } else {
                this.maxPropsDialog = true
            }
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