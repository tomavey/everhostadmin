<template>
    <v-app-bar flat dense app clipped-left class="px-0 mx-0 mobileAppBar" color="appBar">
        <v-app-bar-nav-icon>
            <v-img src="@/assets/ehicond.png" contain height="25px" max-width="25px" class="my-2 pa-0" @click = "drawerShow = !drawerShow"></v-img>
        </v-app-bar-nav-icon>
            <v-text-field
                class="pt-1 mr-2"
                outlined
                dense
                label="search here"
                prepend-inner-icon="mdi-magnify"
                v-model="searchString"></v-text-field>
            <v-img src="@/assets/icons/message-favorite@3x.svg" contain height="25px" max-width="25px" class="my-2  ml-2 mr-2 pa-0"></v-img>
            <v-img src="@/assets/icons/Menu.svg" contain height="25px" max-width="25px" class="my-2  ml-2 mr-0 pa-0"></v-img>
            <ehc-user-avatar  size="30" :photoURL="user.photoURL" class="ml-2"></ehc-user-avatar>

    </v-app-bar>
</template>


<script>
import auth from "@/mixins/auth.vue"
import EhcUserAvatar from './ehc-user-avatar.vue';




export default {
    mixins: [auth],
    components: {EhcUserAvatar},
    data() {
        return {

        }
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
        searchString:{
            get() {
                return this.$store.getters.searchString
            },
            set(val) {
                this.$store.commit('setSearchString', val)
            }
        },
    }
}

</script>

<style>

.mobileAppBar .v-text-field__details {
    display: none;
}

.mobileAppBar .mabActions {
    display: inline-block;
}


</style>