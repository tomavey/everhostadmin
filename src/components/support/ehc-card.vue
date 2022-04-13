<template>
    <!-- <transition name="slide-up">     -->
        <v-card 
            color="rgb(255, 255, 255, .7)" 
            :class="cardClass" 
            flat 
            transition="slide-y-transition" 
            v-if="triggerTransition"
            v-bind="$attrs"
            :height="height">
            <slot></slot>
        </v-card>
    <!-- </transition> -->
</template>

<script>

    export default {
        mixins: [],
         props: {
            dialog:     {type: Boolean, default: false}, 
            height: String
        },
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
            cardClass: function() {
                //I don't I was gonna add a feature for making this a dialog, but we dont need this any more
                //it's not hurting anything so I'll leave it. 
                if (this.dialog) {
                    return "pt-3 pl-3 pr-3 pb-3  ma-0 rounded-xl"
                } else {
                    return "pt-3 pl-3 pr-3 pb-3  mt-4 ml-3 mr-3 mb-3 rounded-xl"
                }
            }

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


