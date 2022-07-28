<template>
    <v-btn 
        class="ehc-btn"
        v-bind="$attrs" 
        :color="color" 
        :dark="dark" 
        :class="btnClass"
        @click="$emit('click')">
        <slot name="left"></slot>
        
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

<style>
.ehc-btn {
    border-radius: 8px;
}

.ehc-btn.theme--light.v-btn{
    color: #893393;
}

</style>