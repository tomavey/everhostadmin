

<template>
    <v-scroll-y-reverse-transition  hide-on-leave>   
        <v-card color="white" class="pa-3 rounded-lg" elevation="0" v-if="trigger" v-bind="$attrs">
            <span class="black2--text ehc-card-content">
                <slot></slot>
            </span>
        </v-card>
    </v-scroll-y-reverse-transition>
</template> 

<script>

    export default {
        mixins: [],
        props: {
            trigger: {
                default: true,
                type: Boolean,
            }
        },
        components: {

        },
        data() {
            return {
                triggerTransition: false,
            }
        },
        created () {
        },  
        watch: {

        },
        computed: {
        },
        methods: {
        },
        mounted(){
        },
        beforeDestroy() {
        }
    }
</script>

<style>
.ehc-card-content h1 {
    font-weight: normal;
    font-size: 20;
}

.ehc-card-content h2 {
    font-weight: bold;
    font-size: 19;
}

.ehc-card-content > * {
    font-size: 19;
}

.contentImage {
    max-width: 100% !important;
}

</style>


