<template>
    <ehc-page class="grey lighten-4" >
        <v-toolbar flat right class="grey lighten-4 my-5" >
            <v-chip v-if="userIsAdmin">{{propertiesFiltered.length}} Properties</v-chip>
        <v-spacer/>
            <v-btn-toggle v-model="displayAs" mandatory>
                    <v-btn text value="gallery" >
                        <v-img :src="require('@/assets/icons/Grid View@3x.svg')" class="mr-1" />
                        <span>Grid View</span>
                    </v-btn>

                    <v-btn text value="table" >
                        <v-img :src="require('@/assets/icons/List View@3x.svg')" class="mr-1" />
                        <span>List View</span>
                    </v-btn>
            </v-btn-toggle>
                <v-btn text 
                    v-if="userIsAdmin && !showAll" 
                    @click="_showAll()" 
                    title="show all">
                    <v-img :src="require('@/assets/icons/show@3x.svg')" class="mr-1" />
                    <span>Show All</span>
                </v-btn>
                <v-btn text 
                    v-if="userIsAdmin && showAll" 
                    @click="_showAll()" 
                    title="show few">
                    <v-img :src="require('@/assets/icons/show@3x.svg')" class="mr-1" />
                    <span>Show Few</span>
                </v-btn>
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

            <v-progress-linear
                v-if="showProgress"
                indeterminate
                color="primary"
                ></v-progress-linear>
        
        <ehc-meta-edit v-if="!propertiesFiltered.length || showWelcomePage" docId="intro" pageTitle=""></ehc-meta-edit>
        <ehc-properties-gallery v-if="displayAs === 'gallery' && !showWelcomePage" :properties="propertiesFiltered"></ehc-properties-gallery>
        <ehc-properties-table v-if="displayAs === 'table' && !showWelcomePage" :properties="propertiesFiltered" @displayAsGrid='displayAs = "gallery"' ></ehc-properties-table>
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
        },
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
            .filter( el => {
                if(this.searchString) {
                    return el.searchAble.toLowerCase().includes(this.searchString.toLowerCase())
                }
                return true
            })

            return properties
        },
        propertiesFiltered() {
            let propertiesFiltered = this.properties
            if ( this.searchString ) {
                propertiesFiltered = this.properties.filter(el => {
                    return el.searchAble.toLowerCase().includes(this.searchString.toLowerCase())
                })
            }
            if ( !this.showAll ){
                propertiesFiltered = propertiesFiltered.filter( el => el.uid === this.user.uid )                 
            }
          return propertiesFiltered
        },
        searchString() {
            return this.$store.getters.searchString
        },
        showProgress() {
            return !this.propertiesFiltered.length && this.loading
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
        copyDefaultProperty(){
            this.$store.dispatch("getProperty", this.$store.getters.defaultPropertyId)
            .then( () => this.$store.dispatch('copyProperty',this.property))    
        },
        searchSettings() {
            console.log("TODO")
        },
        _showAll() {
            this.showAll = !this.showAll
            this.$store.commit("setShowAllLoading", true)
            this.$store.commit("setSearchString", null)
        },
        subscribeToProperties(){
            let payload = {}
            payload.showAll = false
            if ( this.userIsAdmin ) {
                if ( this.$store.getters.uidToShowAdmin ) { payload.uid = this.$store.getters.uidToShowAdmin }
                payload.showAll = true
            }
            this.$store.dispatch('subscribeToProperties',payload)
            .then ( () => this.$store.commit("setShowAllLoading" ,false))
        }
    },
    watch: {
        properties(){
            console.log("properties changed", this.properties.length)
            if ( !this.properties.length  ) {
                this.$store.commit("setShowAllLoading" ,true)
            }
        }
    },
    created() {
        this.subscribeToProperties()
        if ( this.$route && this.$route.query ) {
            this.$store.commit('setSearchString', this.$route.query.search)
        }
        if ( this.$route && this.$route.query && this.userIsAdmin ) {
            this.showAll = this.$route.query.showAll
        }
        // this.$store.dispatch("doesUserExist", this.user.uid).then(res => {
        //     if ( res ) {
        //         console.log("user exists", this.user.uid)
        //     }
        // })
        // this.$store.dispatch('getCustomSubsections', { propertyId: '8705181', type: 'areaguide' })
        // this.$store.dispatch('getCustomSubsections', { propertyId: '8705181', type: 'propertyinfo' })

    }

}
</script>

