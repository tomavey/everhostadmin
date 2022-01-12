<template>
    <v-avatar 
        color="button" 
        v-bind="$attrs"
        >
        <v-img :src="url" v-if="url"></v-img>
        <v-icon dark v-else>
            mdi-account-circle
        </v-icon>
    </v-avatar>
</template>


<script>
import api from "@/mixins/api.vue"

export default {
    mixins: [api],
    props: {
        userID: String,
        photoURL: String,
        label: String
    },
    data() {
        return {
            url: null
        }
    },
    mounted() {
        this.url = this.photoURL ? this.photoURL : this.apiGetUser(this.userID).uid.photoURL
    },
    watch: {
        photoURL(val) {
            this.url = val
        },
    },
    methods: {

    }
}

</script>