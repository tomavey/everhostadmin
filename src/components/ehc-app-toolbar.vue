<template>
    <v-toolbar flat dense class="px-0 mx-0" :src="require('@/assets/img/app-bg-purple.png')" dark>
         <v-toolbar-title>
            <v-img src="@/assets/Everhost-Logo_Green-Circle_300x73.png" contain height="50px" width="190px" class="ma-0 pa-0"></v-img>
        </v-toolbar-title>
       
        <v-divider vertical inset></v-divider>
        <v-tabs
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
        <v-btn icon @click="searching=!searching">
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-expand-x-transition>
            <v-text-field dense hide-details solo light flat single-line v-show="searching"></v-text-field>
        </v-expand-x-transition>


        <v-divider vertical inset></v-divider>
        <v-tooltip bottom >
            <template v-slot:activator="{ on, attrs }">
            <v-btn plain small fab v-on="on" v-bind="attrs" @click="clickTest"><v-icon>mdi-lifebuoy</v-icon></v-btn>
            </template>
            <span>Support</span>
        </v-tooltip>
        <v-tooltip bottom >
            <template v-slot:activator="{ on, attrs }">
            <v-btn plain small fab v-on="on" v-bind="attrs" @click="logout()"><v-icon>mdi-logout</v-icon></v-btn>
            </template>
            <span>Logout</span>
        </v-tooltip>
    </v-toolbar>
</template>


<script>
import EhcProfileCard from './ehc-profile-card.vue';
import auth from "@/mixins/auth.vue"


export default {
    components: {EhcProfileCard},
    mixins: [auth],
    name: 'ehcAppToolbar',

    data: () => ({
        tab: null,
        searching:false,
        menu: [
            {label: "Property Galery", route: "/", icon: "mdi-home-city"},
            {label: "My Account", route: "/myaccount", icon:"mdi-account"},
        ],
    }),
    methods: {
        clickTest() {
            console.log("test click")
        }
    }

}
</script>
