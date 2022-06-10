<template>
    <v-app-bar flat dense app         clipped-left class="px-0 mx-0 mainAppBar" color="appBar">
        <!-- <v-toolbar-title v-if="userIsAdmin">spacer</v-toolbar-title> -->
        <v-toolbar-title class="pl-0 ml-0 toolbartitle">
            <v-img src="@/assets/everhost_v3_logo 1.png" contain height="50px" min-width="190px" max-width="290px" class="ma-0 pa-0" @click="drawerShow = !drawerShow"></v-img>
        </v-toolbar-title>
       
        <v-divider vertical inset></v-divider>
        <v-tabs
            color="primary"
            v-model="tab"
            >
            <v-tab
                v-for="item in menu" 
                :key="item.label"
                @click="$router.push(item.route)">
                <v-img class="mr-1" :src="require(`@/assets/icons/${item.icon}`)"/>
                <strong>{{item.label}}</strong>
            </v-tab>    
        </v-tabs>
        <v-spacer></v-spacer>

        <v-text-field
            active-class="active"
            outlined
            label="Search"
            rounded
            dense
            class="mt-7"
            v-model="searchString"
        >
        </v-text-field>

        <v-divider vertical inset></v-divider>

        <v-tooltip bottom >
            <template v-slot:activator="{ on, attrs }">
            <v-btn plain small  v-on="on" v-bind="attrs" @click="$store.commit('setFeedback',{show:true})"><v-img :src="require('@/assets/icons/Support-outline@3x.svg')"></v-img> FEEDBACK</v-btn>
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
           <span class="mx-3">{{org.name}}</span>

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

      <ehc-alert></ehc-alert>

    </v-app-bar>
</template>


<script>
import EhcProfileCard from './ehc-profile-card.vue';
import EhcUserAvatar from './ehc-user-avatar.vue';
import ehcImageUpload from "@/components/ehc-image-upload.vue"
import EhcAlert from './ehc-alert.vue';

import auth from "@/mixins/auth.vue"
import api from "@/mixins/api.vue"
import mixins from '@/mixins/index.vue'


export default {
    components: {EhcProfileCard, EhcUserAvatar, ehcImageUpload, EhcAlert},
    mixins: [auth, api, mixins],
    name: 'ehcAppToolbar',

    data: () => ({
        tab: null,
        picDialog: false,
        searching:false,
        menu: [
            {label: "Properties", route: "/", icon: "Properties@3x.svg"},
            {label: "Guest Data", route: "/guestdata", icon: "2 User@3x.svg"},
            {label: "Support", route: "/support", icon: "Support -normal@3x.svg"},
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
    watch: {
        $route(val) {
            console.log("tab changed", val)
            let clearSearchStringOn = [
                "GuestData",
                "Support",
                "Users"
            ]
            if ( clearSearchStringOn.includes(this.$route.name) ) {
                this.$store.commit('setSearchString', null)
            }
        },
    },
    computed: {
        drawerShow: {
            get() {
                return this.$store.getters.drawer.show
            },
            set(val) {
                this.$store.commit('setDrawer', {show: val})
            }
        },
        loading() {
            return this.$store.getters.loading
        },
        searchString:{
            get() {
                return this.$store.getters.searchString
            },
            set(val) {
                this.$store.commit('setSearchString', val)
            }
        },
        disableSearch() {
            let disabledRoutes = [
                "/support",
                "/myaccount",
            ]
            if ( disabledRoutes.includes(this.$route.path) ) {
                return true
            }
            if ( this.$router.currentRoute.path === '/support' ){
                return true
            }
            return false
        },
        org(){
            return this.$store.getters.org
        },
    }

}
</script>


<style scoped>
.mainAppBar >>> .v-toolbar__content {
      padding: 0px !important;
}
.v-tab-active {
    border: none !important;
}
.Xv-text-field{
      width: 600px;
}
.toolbartitle {
    width: 300px;
}
 

</style>