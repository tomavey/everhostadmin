<template>
<div>
     <v-avatar size="40">
        <img class="avatarimg"  :src="url" v-if="url"></img>
    </v-avatar> 
    <span v-if="label">{{label}}</span>
</div>
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
        try {
            this.url = this.photoURL ? this.photoURL : this.apiGetUser(this.userID).uid.photoURL
        } catch (e) {
            this.url = ""
        }
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

<style scoped>
.avatarimg {
    border: 4px solid white;
    border-radius: 20px;
    }


</style>