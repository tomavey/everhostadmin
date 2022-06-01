<template>
    <v-card class="pt-1 black2--text" max-width="19rem">

        <!-- TODO: Get border radius on the top of the property avatar -->
        <v-img :src="property.avatarImg" height="13rem" @click="goToProperty()" class="pointer mx-2 mb-2 mt-2 propertyAvatar" />

        <ehc-user-avatar class="mt-n15 mx-3" v-if="property.contactInfo.hostPhotoUrl" :photoURL="property.contactInfo.hostPhotoUrl" />

        <!-- PROPERTY NAME AND ADDRESS -->
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="black--text font-weight-bold">{{property.name}}</v-list-item-title>
                <v-list-item-subtitle>  
                    <v-list-item-icon>                  
                        <v-img :src="require('@/assets/icons/location@3x.svg')" class="mr-2"/>
                        {{address}}
                    </v-list-item-icon>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <!-- CREATED AT AND PROPERTY ID -->
        <v-list-item class="mt-n10">
            <v-list-item-subtitle>
                <v-list-item-icon>
                    <v-img :src="require('@/assets/icons/calendar-2@3x.svg')" class="mr-2"/>
                    {{property.createdAtAsString}} 
                </v-list-item-icon>    
            </v-list-item-subtitle>
            <v-list-item-subtitle class="ml-sm-n5">
                Property ID: {{property.propertyId}}
            </v-list-item-subtitle>
        </v-list-item>

        <!-- ACTION BUTTONS -->
        <v-list-item >

            <!-- EDIT -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0" v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" small icon @click="goToProperty()">
                            <v-img :src="require('@/assets/icons/edit@3x.svg')" class="mr-2"/>
                        </v-btn>
                    </v-list-item-icon>
                </template>
                <span>Edit this property</span>
            </v-tooltip>

            <!-- LINK WITH QR CODE -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0" v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" small icon @click="copyLink()">
                            <v-img :src="require('@/assets/icons/Link@3x.svg')" class="mr-2"/>
                        </v-btn>
                    </v-list-item-icon>
                </template>    
                <span>See a link to this property with QR code</span>
            </v-tooltip>


            <!-- DELETE -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0" v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" small icon @click="deleteConfirm.show = true">
                            <v-img :src="require('@/assets/icons/trash@3x.svg')" class="mr-2"/>
                        </v-btn>
                    </v-list-item-icon>
                </template>    
                <span>Delete this property</span>
            </v-tooltip>

            <!-- PUBLISH -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon class="mx-0"  v-bind="attrs" v-on="on">
                        <v-btn class="mx-0" v-if="!property.publishedAt" small icon @click="publishProperty({propertyId: property.propertyId, publishedAt: true})">
                            <v-img :src="require('@/assets/icons/unpulish@3x.svg')" class="mr-2 publish"/>
                        </v-btn>
                        <v-btn class="mx-0" v-else small :loading="publishLoading" icon @click="publishProperty({propertyId: property.propertyId, publishedAt: false})">
                            <v-img :src="require('@/assets/icons/unpulish@3x.svg')" class="mr-2 unpublish"/>
                        </v-btn>
                    </v-list-item-icon>
                </template>
                <span v-if="!property.publishedAt">Publish this property</span>
                <span v-else>Unpublish this property</span>
            </v-tooltip>

        </v-list-item>

        <!-- PUBLISHED OR NOT -->
        <v-list-item>
            <v-list-item-content>
                <v-list-item-subtitle>
                    <span v-if="property.publishedAt">Published: {{dateFormat(property.publishedAt, 'dateOnly')}}</span>
                    <span  v-else>Not Published Yet</span>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <!------------>
        <!-- POPUPS -->
        <!------------>

        <!-- CONFIRM DELETE POPUP -->
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

        <!-- LINK AND QR CODE POPUP -->
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

        <!-- ALERT THAT PROPERTY HAS BEEN PUBLISHED -->
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
        user() {return this.$store.getters.user},
        address() {
            let property = this.property
            if ( property.mapAddress ) {
                return property.mapAddress.formatted_address
            } 
            return `${property.city} ${property.state}`
        },
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
        },
        showExtraForDevs(){
            let devUidArray = ['s7ODEJrba6YtcvaisMnEmt4XQgh1']
            if ( devUidArray.includes(this.user.uid) ) {
                return true
            }   else {
                return false
            }   
        }
    },
    watch: {

    },
    mounted(){
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
.publish {
    fill: #d4002e;
}

.unpublish {
    transform: rotate(180deg);
}

.propertyAvatar{
    border-radius: 10px 10px 10px 10px;
}

</style>