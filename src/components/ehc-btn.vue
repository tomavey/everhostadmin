<template>
    <v-btn 
        v-bind="$attrs" 
        :color="color" 
        :dark="dark" 
        :class="btnClass"
        @click="$emit('click')">
       <strong> <slot></slot></strong>
    </v-btn>
</template>


<script>

export default {
    props: {
        color:      {type: String,  default: "button"},
        dark:       {type: Boolean, default: true},
        btnClass:   {type: String,  default:"elevation-0"}
    },
    data() {
        return {

        }
    }   
}


</script>