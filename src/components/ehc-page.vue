

<template>
    <!-- this should wrap every page, it handles the transition in and spacing of the page -->
    <v-container fill-height fluid class="ma-0 pa-0">
        <v-scroll-y-reverse-transition hide-on-leave fill-height>
            <v-container 
                class="pt-0 pb-0 px-3" 
                v-if="triggerTransition" 
                fluid 
                fill-height>


                <div>
                    <slot></slot>
                </div>
            </v-container>
        </v-scroll-y-reverse-transition>
    </v-container>
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


