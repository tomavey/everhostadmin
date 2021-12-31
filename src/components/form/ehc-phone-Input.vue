<!-- 
    TODO: It currently only masks and validates if required, make it validate that the number is the proper length. 
 -->

<template>
    <v-text-field   v-mask="'(###) ###-####'"
                    :rules="rules(props)"
                    type="tel"
                    masked="false"
                    outlined 
                    v-bind="props" 
                    v-model="phoneNumber" 
                    @blur="$emit('blur', dePhoneMask(phoneNumber))"
                    >
                    </v-text-field>
</template>

<script>

  export default {
    mixins: [],
    props: ['props', 'value'],
    data: () => ({
        phoneNumber: ""
    }),
    created () {
        this.phoneNumber = this.value
    },  
    watch: {
        value(val) {
            if (this.dePhoneMask(this.phoneNumber) != val) {
                this.phoneNumber = this.value
            }
        },
        phoneNumber(val) {
            this.$emit('demaskedOut', this.dePhoneMask(val))
        }
    },
    computed: {

    },
    methods: {
        dePhoneMask(phone) {
            //I couldnt get it to return unmasked value other than doing this, It's janky but I'm out of time. 
            if (phone) {
                let newPhone = phone.replace("(", "")
                newPhone = newPhone.replace(") ", "")
                newPhone = newPhone.replace("-", "")
                console.log("dePhoneMask ", newPhone)
                return newPhone
            }
            return null
        },
        rules(field) {
            let rule = []
            if (field.required) { rule.push(v => !!v || 'required')}
            return rule
        },
    },
  }
</script>

<style scoped>
</style>


