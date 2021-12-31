

<template>
<!-- this should wrap every page, it handles the transition in and spacing of the page -->
    <div >
        <v-scroll-y-reverse-transition  hide-on-leave>    
            <v-container 
                class="pa-0 " 
                v-if="triggerTransition" fluid>
                <slot></slot>
            </v-container>
        </v-scroll-y-reverse-transition>
    </div>
</template>

<script>

    export default {
        mixins: [],
        props: [],
        components: {

        },
        data: () => ({
            triggerTransition: false,
        }),
        created () {
        },  
        watch: {

        },
        computed: {

        },
        methods: {
        },
        mounted(){
            this.triggerTransition = true
        }
    }
</script>

<style scoped>
</style>


