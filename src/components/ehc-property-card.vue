<template>
    <v-card class="pa-0 black2--text" max-width="19rem">
        <v-img :src="property.avatarImg" height="13rem" @click="goToProperty()" class="pointer"></v-img>
        <v-list-item two-line>
            <v-list-item-content>
                    {{property.name}} - 
                    {{property.city}}, {{property.state}}
                <v-list-item-subtitle><v-icon small>mdi-google-maps</v-icon>{{property.address}}</v-list-item-subtitle>
            </v-list-item-content>
            <ehc-user-avatar v-if="property.contactInfo.hostPhotoUrl" :photoURL="property.contactInfo.hostPhotoUrl" :label="property.contactInfo.hostName" />
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item >
            <v-list-item-icon class="mr-1 ">
                <v-icon>mdi-calendar-import</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-subtitle>
                    <span v-if="property.publishedAt">Published: {{dateFormat(property.publishedAt, 'dateOnly')}}</span>
                    <span  v-else>Not Published Yet</span>
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0" v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" small icon @click="goToProperty()"><v-icon small color="green darken-2">mdi-pencil</v-icon></v-btn>
                    </v-list-item-icon>
                </template>
                <span>Edit this property</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0"  v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" v-if="!property.publishedAt" small icon @click="publishProperty({propertyId: property.propertyId, publishedAt: true})">
                            <v-icon small color="grey darken-2">mdi-publish</v-icon>
                        </v-btn>
                        <v-btn class="mx-0" v-else small :loading="publishLoading" icon @click="publishProperty({propertyId: property.propertyId, publishedAt: false})"><v-icon small color="grey darken-2">mdi-publish-off</v-icon></v-btn>
                    </v-list-item-icon>
                </template>
                <span>Publish this property</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0" v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" small icon @click="copyLink()"><v-icon small color="yellow darken-2">mdi-link</v-icon></v-btn>
                    </v-list-item-icon>
                </template>    
                <span>See a link to this property with QR code</span>
            </v-tooltip>


            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0" v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" small icon @click="deleteConfirm.show = true"><v-icon small color="red darken-2">mdi-trash-can-outline</v-icon></v-btn>
                    </v-list-item-icon>
                </template>    
                <span>Delete this property</span>
            </v-tooltip>

        </v-list-item>

        <v-card-subtitle>
            PropertyId: {{property.propertyId}}<br/>
            <!-- <span v-if="property.copiedAt && property.copiedFrom">
             Copied from: {{property.copiedFrom}} on {{formatDate(property.copiedAt,"shortFormat")}}
            </span> -->
        </v-card-subtitle>
        
        <!-- <v-card-title class="text-h6">{{property.name}}</v-card-title>
        <v-spacer/>
        <v-card-actions class="d-flex justify-center">
            <v-btn text class="text-caption created">Created: {{formatDate(property.createdAt,"dateOnly")}}</v-btn> -->
    <!-- edit -->
            <!-- <v-btn class="mx-0" small icon @click="goToProperty()"><v-icon small color="green darken-2">mdi-pencil</v-icon></v-btn>
            <v-btn class="mx-0" v-if="!property.publishedAt" small icon @click="publishProperty({propertyId: property.propertyId, publishedAt: true})">
                <v-icon small color="grey darken-2">mdi-publish</v-icon>
            </v-btn>
            <v-btn class="mx-0" v-else small :loading="publisLoading" icon @click="publishProperty({propertyId: property.propertyId, publishedAt: false})"><v-icon small color="grey darken-2">mdi-publish-off</v-icon></v-btn> -->
    <!-- TODO copy -->
            <!-- <v-btn class="mx-0" small icon @click="copyProperty(property.propertyId)"><v-icon small color="blue darken-2">mdi-content-copy</v-icon></v-btn> -->
            <!-- <v-btn class="mx-0" small icon @click="copyLink()"><v-icon small color="yellow darken-2">mdi-link</v-icon></v-btn>
            <v-btn class="mx-1" small icon @click="deleteConfirm.show = true"><v-icon small color="red darken-2">mdi-trash-can-outline</v-icon></v-btn>
        </v-card-actions>
        <v-card-text>PropertyId: {{property.propertyId}}<br/>
        <span v-if="property.publishedAt">Published: {{dateFormat(property.publishedAt, 'dateOnly')}}</span>
        <span v-else>Not Published Yet</span>
        </v-card-text> -->
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
        <ehc-dialog v-model="linkDialog" title="Link Copied" width="350">
            Link to {{property.name}} guide has been copied to your clipboard <br/><br/>
            <p class="text-h5 text-center" v-if="!property.publishedAt">This property has not been published yet.</p>
            
            <strong>{{link}}</strong>
            
            <qrcode-vue  :value="link" :size="300" level="H"></qrcode-vue>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn color="button" dark @click="linkDialog = false">ok</v-btn>
            </template>
        </ehc-dialog>
        <ehc-dialog v-model="message.show" :title="message.title" :width="message.width ? message.width : '300'">
            {{message.message}}
            <br/><br/>
            <qrcode-vue v-if="message.qrCode" :value="message.qrCode" :size="300" level="H"></qrcode-vue>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="message.show=false" color="button" dark><strong>ok</strong></v-btn>
            </template>
        </ehc-dialog>
    </v-card>
</template>


<script>

import uniMixin from '@/mixins/index.vue'
import PropertyActions from '@/mixins/propertyActions'
import QrcodeVue from 'qrcode.vue'
import EhcUserAvatar from '@/components/ehc-user-avatar.vue'
import EhcTooltip from './ehc-tooltip.vue'



export default {
    mixins: [uniMixin, PropertyActions],
    components: {QrcodeVue, EhcUserAvatar, EhcTooltip},
    name: 'ehc-property-card',
    props: ['property'],
    data: () => ({
        message: {
            show: false,

        },
        linkDialog: false,
        publishLoading: false,
        deleteConfirm: {
            show: false,
            loading: false
        },
    }),
    watch: {
        loading(val) {this.$store.commit('setLoading', val)}
    },
    computed: {
        link() {return `${this.$store.getters.appSite}${this.property.propertyId}`},
        prop() {return this.property},
        appSite() {return this.$store.getters.appSite},
        loading() {return this.$store.getters.propertiesStatus.loading},
        user() {return this.$store.getters.user}
    },
    methods: {
        goToProperty() {
            const url = this.appSite + "login/" + this.prop.propertyId
            console.log("opening property URL", url)
            window.open(url,"", "width=900, height=812");
        },
        copyProperty() {
            console.log("copyProperty TODO")
        },
        copyLink: function(){
            navigator.clipboard.writeText(this.link)
            this.linkDialog = true
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
            })
            
        },
        publishProperty: async function(publishObj){
            this.publishLoading =  true
            this.$store.dispatch("markPropertyPublishedAt", publishObj).then(() => {
                this.$store.dispatch("getProperties").then(() => {
                    this.publishLoading =  false
                    this.message= {
                        width: 300,
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

<style scoped>

 div.v-card__actions {
    border: 2px solid lightgray;
    border-radius: 10px;
    padding: 0px;
    font-size:.6em;
}

.created {
    font-size: .8em !important;
    padding:0px;
    margin:0px
}

</style>