<!-- example usage
    <ehc-card-toolbar 
        title="whatever you want the title to be"
        edit
        close
        justify="left" //(or "center")
        ></ehc-card-toolbar> 
-->

<template>
    <v-toolbar color="rgb(255, 255, 255, 0)" flat class="pa-0 ma-0">
        <slot></slot>
        <v-toolbar-title :class="titleClass" >
            <span class="black2--text ehc-toolbar-title">{{title}}</span>
        </v-toolbar-title>
        <v-spacer v-if="justify=='left'"></v-spacer>
        <v-btn small fab v-if="userIsAuthenticated && edit"  class="mr-2 elevation-0"  @click="$emit('edit')" ><v-icon >mdi-pencil</v-icon></v-btn>
        <img src="@/assets/icons/Close@3x.svg" v-if="close" @click="$emit('close')">
        <slot name="right"></slot>
    </v-toolbar>
</template>

<script>
import auth from '@/mixins/auth'

    export default {
        mixins: [auth],
        props: {
            title: String, 
            justify:   {type: String,  default: "center"},
            close:     {type: Boolean, default: false}, //if true adds a close button
            edit:      {type: Boolean, default: false} //if true adds a edit button
        },
        components: {
            
        },
        data: () => ({
            
        }),
        created () {
        },  
        watch: {

        },
        computed: {
            titleClass: function() {
                switch (this.justify) {
                    case 'left':
                        return ""
                    case 'center':
                        return "flex text-center"
                    default:
                        return this.justify
                }
            }
        },
        methods: {
        },
    }
</script>

<style scoped>
.ehc-toolbar-title {
    font-weight: bold;
    font-size: 20px;
}
</style>


