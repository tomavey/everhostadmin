<template>
    <v-card class="pa-0 black2--text" max-width="18rem">
        <v-img :src="property.avatarImg" height="13rem"></v-img>
        {{property.address}} {{property.city}}, {{property.state}}
        <v-card-title class="text-h6">{{property.name}}</v-card-title>
        <v-spacer/>
        <v-card-actions class="d-flex justify-center">
        <v-btn text class="text-caption">Created: {{formatDate(property.createdAt,"dateOnly")}}</v-btn>
<!-- edit -->
        <v-btn class="mx-0" small icon @click="goToProperty()"><v-icon small color="green darken-2">mdi-pencil</v-icon></v-btn>
        <v-btn class="mx-0" v-if="!property.publishedAt" small icon @click="publishProperty({propertyId: property.propertyId, publishedAt: true})">
            <v-icon small color="grey darken-2">mdi-publish</v-icon>
        </v-btn>
        <v-btn class="mx-0" v-else small :loading="publisLoading" icon @click="publishProperty({propertyId: property.propertyId, publishedAt: false})"><v-icon small color="grey darken-2">mdi-publish-off</v-icon></v-btn>
<!-- TODO copy -->
        <!-- <v-btn class="mx-0" small icon @click="copyProperty(property.propertyId)"><v-icon small color="blue darken-2">mdi-content-copy</v-icon></v-btn> -->
        <v-btn class="mx-0" small icon @click="copyLink()"><v-icon small color="yellow darken-2">mdi-link</v-icon></v-btn>
        <v-btn class="mx-1" small icon @click="deleteConfirm.show = true"><v-icon small color="red darken-2">mdi-trash-can-outline</v-icon></v-btn>
        </v-card-actions>
        <v-card-text>PropertyId: {{property.propertyId}}<br/>
        <span v-if="property.publishedAt">Published: {{dateFormat(property.publishedAt, 'dateOnly')}}</span>
        <span v-else>Not Published Yet</span>
        </v-card-text>
        <ehc-dialog 
            v-model="deleteConfirm.show" 
            width="300" 
            :persistent="deleteConfirm.loading"
            title="Delete Property?">
            <h3>are you sure you want to delete {{prop.name}}?</h3>
            <template v-slot:actions>
                <v-btn color="error" dark @click="deleteProperty()" :loading="deleteConfirm.loading">
                    <strong>DELETE</strong>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" dark @click="deleteConfirm.show = false" :disabled="deleteConfirm.loading">
                    <strong>Cancel</strong>
                </v-btn>
            </template>
        </ehc-dialog>
        <ehc-dialog v-model="message.show" :title="message.title" width="300">
            {{message.message}}
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="message.show=false" color="button" dark><strong>ok</strong></v-btn>
            </template>
        </ehc-dialog>
    </v-card>
</template>


<script>

import uniMixin from '@/mixins/index.vue'


export default {
    mixins: [uniMixin],
    components: {},
    name: 'ehc-property-card',
    props: ['property'],
    data: () => ({
        message: {
            show: false,

        },
        publisLoading: false,
        deleteConfirm: {
            show: false,
            loading: false
        }
    }),
    watch: {
        loading(val) {this.$store.commit('setLoading', val)}
    },
    computed: {
        prop() {return this.property},
        appSite() {return this.$store.getters.appSite},
        loading() {return this.$store.getters.propertiesStatus.loading},
    },
    methods: {
        goToProperty() {
            const url = this.appSite + "login/" + this.prop.propertyId
            console.log("opening property URL", url)
            window.open(url,"", "width=390, height=812");
        },
        copyProperty() {
            console.log("copyProperty TODO")
        },
        copyLink: function(){
            const property = this.property
            let link = `${this.$store.getters.appSite}${property.propertyId}`
            navigator.clipboard.writeText(link)
            this.message= {
                show: true,
                title: "Link Copied",
                message: "the link to this property has been copied to your clipboard"
            }
        },
        deleteProperty() {
            console.log("delete property button pushed")
            this.deleteConfirm.loading = true
            const propertyId = this.prop.propertyId
            this.$store.dispatch("markPropertyDeletedAt", propertyId).then(() => {
                this.deleteConfirm = {
                    loading : false,
                    show: false
                }
                this.$store.dispatch("getProperties")
            })
            
        },
        publishProperty: async function(publishObj){
            this.publishLoading =  true
            this.$store.dispatch("markPropertyPublishedAt", publishObj).then(() => {
                this.$store.dispatch("getProperties").then(() => {
                    this.publishLoading =  false
                    this.message= {
                        show: true,
                        title: "Property Published",
                        message: "your property has been published"
                    }
                })
            })
        }
    },
    watch: {

    },
    created() {
    }

}
</script>