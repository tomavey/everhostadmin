<template>
    <v-app-bar dense>
        <div class="d-flex">
            <v-img src="@/assets/Everhost-Logo_Green-Circle_300x73.png" contain height="50px" class="ma-0 pa-0"></v-img>
        </div>
       
        
        <v-tabs
            v-model="tab"
            >
            <v-tab
                v-for="item in menu" 
                :key="item.label"
                @click="$router.push(item.route)">
                {{item.label}}
            </v-tab>    
            
        </v-tabs>
        <v-spacer></v-spacer>
        
        <v-menu
            absolute
            offset-x
            >
            <template v-slot:activator="{ on }">
                <v-avatar v-on="on">
                <v-icon color="accent" large >
                    mdi-account-circle
                </v-icon>
                </v-avatar>
            </template>
            <ehc-profile-card></ehc-profile-card>
        </v-menu>
    </v-app-bar>
</template>


<script>
import EhcProfileCard from './ehc-profile-card.vue';


export default {
    components: {EhcProfileCard},
    mixins: [],
    name: 'ehcAppToolbar',

    data: () => ({
        tab: null,
        menu: [
            {label: "Property Galery", route: "/"},
            {label: "Guest Data", route: "/guestdata"},
        ]
    }),

}
</script>
