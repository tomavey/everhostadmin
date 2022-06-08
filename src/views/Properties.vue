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
                <v-btn v-if="userIsAdmin && !showAll" @click="_showAll()" title="show all">
                    <v-icon class="mr-1 ml-0">mdi-plus</v-icon>
                    Show All
                </v-btn>
                <v-btn v-if="userIsAdmin && showAll" @click="_showAll()" title="show few">
                    <v-icon class="mr-1 ml-0">mdi-minus</v-icon>
                    Show Few
                </v-btn>
        {{propertiesFiltered.length}}
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

        <ehc-meta-edit v-if="!propertiesFiltered.length || showWelcomePage" docId="intro" pageTitle=""></ehc-meta-edit>
        <ehc-properties-gallery v-if="displayAs === 'gallery' && !showWelcomePage" :properties="propertiesFiltered"></ehc-properties-gallery>
        <ehc-properties-table v-if="displayAs =='table' && !showWelcomePage" :properties="propertiesFiltered"></ehc-properties-table>
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
import mixins from '@/mixins'
import auth from '@/mixins/auth'
import EhcPropertiesGallery from '../components/ehc-properties-gallery.vue'
import EhcPropertiesTable from '../components/ehc-properties-table.vue'
import EhcMetaEdit from '../components/ehc-meta-edit.vue'


export default {
    components: {EhcBtn, EhcPropertiesGallery, EhcPropertiesTable, EhcMetaEdit},
    mixins: [mixins,auth],
    name: 'properties',

    data: () => ({
        maxProperties: 3,
        maxPropsDialog: false,
        addLoading: false,
        search: null,
        displayAs: "gallery",
        showAll: false,
    }),
    watch: {
        loading(val) {
            this.$store.commit('setLoading', val)
        }
    },
    computed: {
        showWelcomePage: function(){
            return this.$store.getters.showWelcomePage   
        },
        showAllLoading: {
            get() {
                return this.$store.getters.showAllLoading
            },
            set(value) {
                this.$store.commit("setShowAllLoading", value)
            }
        },
        uidToShowAdmin() { return this.$store.getters.uidToShowAdmin},
        loading() {
            return this.$store.getters.propertiesStatus.loading
        },
        property() {return this.$store.getters.property},
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
                if ( el.updatedAt ) {
                   el.updatedAtAsString = this.dateFormat(el.updatedAt,'dateOnly')
                } else {
                   el.updatedAtAsString = "*"
                }

                return el
            })

            return properties
        },
        propertiesFiltered() {
            let propertiesFiltered = this.properties
            if ( this.search ) {
                propertiesFiltered = this.properties.filter(el => {
                    return el.searchAble.toLowerCase().includes(this.search.toLowerCase())
                })
            }
            if ( !this.showAll ){
                propertiesFiltered = propertiesFiltered.filter( el => el.uid === this.user.uid )                 
            }
          return propertiesFiltered
        }
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
        copyDefaultProperty(){
            this.$store.dispatch("getProperty", this.$store.getters.defaultPropertyId)
            .then( () => this.$store.dispatch('copyProperty',this.property))    
        },
        searchSettings() {
            console.log("TODO")
        },
        _showAll() {
            this.showAll = !this.showAll
        },
        subscribeToProperties(showAll){
            let payload = {}
            if ( this.userIsAdmin ) {
                if ( this.$store.getters.uidToShowAdmin ) { payload.uid = this.$store.getters.uidToShowAdmin }
                payload.showAll = showAll
            }
            this.$store.dispatch('subscribeToProperties',payload)
            .then ( () => this.$store.commit("setShowAllLoading" ,false))
        }
    },
    watch: {
        properties(){
            if ( this.properties.length  ) {
                this.showWelcomePage = false
            }
        }
    },
    created() {
        this.subscribeToProperties(this.showAll)
        if ( this.$route && this.$route.query ) {
            this.search = this.$route.query.search
        }
        if ( this.$route && this.$route.query && this.userIsAdmin ) {
            this.showAll = this.$route.query.showAll
        }
        // this.$store.dispatch('getCustomSubsections', { propertyId: '8705181', type: 'areaguide' })
        // this.$store.dispatch('getCustomSubsections', { propertyId: '8705181', type: 'propertyinfo' })

    }

}
</script>