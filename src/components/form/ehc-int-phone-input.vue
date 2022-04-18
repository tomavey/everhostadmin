
<!-- https://vuejsexamples.com/international-telephone-input-with-vuetify/ -->

<template>

    <vue-tel-input-vuetify 
        outlined 
        v-bind="$attrs" 
        :color="color" 
        :preferred-countries="['us', 'ca', 'gb', 'au', 'fr' , 'it', 'es']"
        defaultCountry="us"
        v-model="phoneNumber"
        @input="onInput"
        @blur="$emit('blur', phoneNumber)"
        full-width>
        >
        </vue-tel-input-vuetify>

</template>

<script>
import VueTelInputVuetify from "vue-tel-input-vuetify/lib/vue-tel-input-vuetify.vue"

export default {
    name: "echIntPhoneInput",
    props: ['props', 'value', 'color'],
    components: {VueTelInputVuetify},
    data() {
        return {
            phoneNumber: '',
            phone: {}
        }
    },
    mounted() {
        this.phoneNumber = this.value
    },
    watch: {
        value(val) {
            console.log("international phone input value change", val)
            this.phoneNumber = val
        },

    },
    methods: {
        onInput(formattedNumber, { number, valid, country }) {
            console.log("onInput")
            this.phone.number = number.international;
            this.phone.valid = valid;
            this.phone.country = country && country.name;
            this.phoneNumber=this.phone.number
            this.$emit('change', this.phoneNumber)
            this.$emit('input', this.phoneNumber)
        },
    }
}

</script>

<style scoped>
.vue-tel-input-vuetify {
    width: 100%;
}
</style>