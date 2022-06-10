<template>
<div>
    <v-avatar 
        color="button" 
        v-bind="$attrs"
        class="avatar"
        >
        <v-img class="avatarimg" :src="url" v-if="url"></v-img>
        <v-icon dark v-else>
            mdi-account-circle
        </v-icon>
        <span v-if="label">{{label}}</span>
    </v-avatar>
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