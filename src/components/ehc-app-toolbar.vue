<template>
    <v-toolbar flat dense class="px-0 mx-0" color="appBar">
        <v-toolbar-title>
            <v-img src="@/assets/icons/everhost_v3_logo.svg" contain height="50px" width="190px" class="ma-0 pa-0"></v-img>
        </v-toolbar-title>
       
        <v-divider vertical inset></v-divider>
        <v-tabs
            color="black2"
            v-model="tab"
            >
            <v-tab
                v-for="item in menu" 
                :key="item.label"
                @click="$router.push(item.route)">
                <v-icon class="mr-1">{{item.icon}}</v-icon>
                <strong>{{item.label}}</strong>
            </v-tab>    
            
            
        </v-tabs>
        <v-spacer></v-spacer>
        <!-- TODO
        <v-btn icon @click="searching=!searching">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-expand-x-transition>
            <v-text-field dense hide-details solo light flat single-line v-show="searching"></v-text-field>
        </v-expand-x-transition> 
        -->


        <v-divider vertical inset></v-divider>
        <!-- TODO 
        <v-tooltip bottom >
            <template v-slot:activator="{ on, attrs }">
            <v-btn plain small fab v-on="on" v-bind="attrs" @click="openSupport"><v-icon>mdi-lifebuoy</v-icon></v-btn>
            </template>
            <span>Support</span>
        </v-tooltip> 
        -->
        <v-tooltip bottom >
            <template v-slot:activator="{ on, attrs }">
            <v-btn plain small  v-on="on" v-bind="attrs" @click="$store.commit('setFeedback',{show:true})"><v-icon>mdi-message-alert</v-icon> FEEDBACK</v-btn>
            </template>
            <span>give feedback or report error</span>
        </v-tooltip> 

        <v-menu
            bottom
            offset-y>
            <template v-slot:activator="{ attrs, on }">
                <div v-bind="attrs" v-on="on">
                <ehc-user-avatar  size="30" :photoURL="user.photoURL"></ehc-user-avatar>
                </div>
           </template>
            <ehc-profile-card @changeProfilePic="picDialog=true"></ehc-profile-card>
        </v-menu>

        <ehc-image-upload 
            v-model="picDialog" 
            title="Upload Profile Image" 
            :uploadPath="'/profilePictures/'+user.uid + Date.now()"  
            @upload="setProfilePic($event)" 
            circle
            :size="{
                width: 200,
                height: 200
            }"/>

        <!-- <ehc-profile-card></ehc-profile-card> -->
        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            bottom
            color="black2"
            height="5"
            striped
      ></v-progress-linear>


    </v-toolbar>
</template>


<script>
import EhcProfileCard from './ehc-profile-card.vue';
import EhcUserAvatar from './ehc-user-avatar.vue';
import ehcImageUpload from "@/components/ehc-image-upload.vue"


import auth from "@/mixins/auth.vue"
import api from "@/mixins/api.vue"



export default {
    components: {EhcProfileCard, EhcUserAvatar, ehcImageUpload},
    mixins: [auth, api],
    name: 'ehcAppToolbar',

    data: () => ({
        tab: null,
        picDialog: false,
        searching:false,
        menu: [
            {label: "Properties", route: "/", icon: "mdi-home-city"},
            {label: "Guest Data", route: "/guestdata", icon: "mdi-account-group"},
            // {label: "My Account", route: "/myaccount", icon:"mdi-account"}, TODO
        ],
    }),
    mounted() {
    },
    methods: {
        setProfilePic(url) {
            console.log("profile pic set", url)
            this.apiUpdateUser(this.user.uid,{photoURL: url}).then(() => {
                this.apiGetUser(this.user.uid).then((user) => {
                    this.$store.commit('setUser', user)
                })
            })
        },
        openSupport() {
            console.log("TODO")
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
    }

}
</script>
