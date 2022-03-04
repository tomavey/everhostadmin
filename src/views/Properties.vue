<template>
    <ehc-page>
        <v-toolbar flat>
            <v-btn-toggle v-model="displayAs" mandatory>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text value="gallery" v-bind="attrs" v-on="on">
                        <v-icon>mdi-view-grid</v-icon>
                    </v-btn>
                  </template>  
                <span>gallery view</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text value="table" v-bind="attrs" v-on="on">
                        <v-icon>mdi-view-list</v-icon>
                    </v-btn>
                  </template>
                  <span>list view</span>
                </v-tooltip>
            </v-btn-toggle>
                <v-btn v-if="userIsAdmin && !showAll" text @click="_showAll()" title="show all">
                    <v-icon>mdi-playlist-plus</v-icon>
                </v-btn>
                <v-btn v-if="userIsAdmin && showAll" text @click="_showAll()" title="show few">
                    <v-icon>mdi-playlist-minus</v-icon>
                </v-btn>
        {{properties.length}}
            <v-spacer></v-spacer>
            <v-text-field
                placeholder="Search Properties"
                v-model="search"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
                rounded
                color="button"
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
        <ehc-properties-gallery v-if="displayAs === 'gallery'" :properties="properties"></ehc-properties-gallery>
        <ehc-properties-table v-if="displayAs =='table'" :properties="properties"></ehc-properties-table>
        <ehc-dialog max-width="300" v-model="maxPropsDialog" title="Max Properties Reached">
            <h3>you have reached the maximum number of properties available</h3>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn plain color="button" @click="maxPropsDialog = false">
                    <strong>OK</strong>
                </v-btn>
            </template>
        </ehc-dialog>
    </ehc-page>
</template>


<script>
import EhcBtn from '../components/ehc-btn.vue'
import firebase from 'firebase'
import mixins from '@/mixins'
import auth from '@/mixins/auth'
import EhcPropertiesGallery from '../components/ehc-properties-gallery.vue'
import EhcPropertiesTable from '../components/ehc-properties-table.vue'



export default {
    components: {EhcBtn, EhcPropertiesGallery, EhcPropertiesTable},
    mixins: [mixins,auth],
    name: 'properties',

    data: () => ({
        maxProperties: 3,
        maxPropsDialog: false,
        addLoading: false,
        search: null,
        displayAs: "gallery",
    }),
    watch: {
        loading(val) {
            this.$store.commit('setLoading', val)
        }
    },
    computed: {
        showAll() { return this.$store.getters.showAll },
        uidToShowAdmin() { return this.$store.getters.uidToShowAdmin},
        loading() {
            return this.$store.getters.propertiesStatus.loading
        },
        properties() {
            let properties = this.$store.getters.properties
            .sort( (a,b) => {
                if ( a.createdAt < b.createdAt ) {return 1}
                else { return -1 }
            })
            .map( el => {
                el.createdAtAsString = this.dateFormat(el.createdAt,'dateOnly')
                if ( el.publishedAt ) {
                   el.publishedAtAsString = this.dateFormat(el.publishedAt,'dateOnly')
                } else {
                   el.publishedAtAsString = "not published"
                }
                return el
            })

            if ( this.search ) { properties = properties.filter(el => {
                return el.searchAble.toLowerCase().includes(this.search.toLowerCase())
            })}
            return properties
        },
    },    
    methods: {
        addProperty() {
            if (this.properties.length < 1000) {
                this.addLoading=true
                console.log("addProperty button pushed")
                this.$store.commit("setLoading", true)
                this.$store.dispatch('makeNewProperty').then(res => {
                    this.$store.commit("setLoading", false)
                    this.addLoading=false
                })
            } else {
                this.maxPropsDialog = true
            }
        },
        searchSettings() {
            console.log("TODO")
        },
        _showAll() {
            this.displayAs = "table"
            this.$store.commit("setShowAll", !this.showAll) 
            this.subscribeToProperties(this.showAll)
        },
        subscribeToProperties(showAll){
            let payload = {}
            if ( this.userIsAdmin ) {
                if ( this.$store.getters.uidToShowAdmin ) { payload.uid = this.$store.getters.uidToShowAdmin }
                payload.showAll = showAll
            }
            this.$store.dispatch('subscribeToProperties',payload)
        }
    },
    created() {
        this.subscribeToProperties(this.showAll)
        this.$store.dispatch('getCustomSubsections', { propertyId: '8705181', type: 'areaguide' })
        this.$store.dispatch('getCustomSubsections', { propertyId: '8705181', type: 'propertyinfo' })
    }

}
</script>