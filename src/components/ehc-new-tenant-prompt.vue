<template>
    <v-card v-bind="$attrs">
        <v-card-title><h1>Account Setup</h1></v-card-title>
        <v-card-subtitle>We need a little information to setup your account</v-card-subtitle>
        <v-card-text>
            <ehc-form v-model="formData" :meta="form" @submit="submit()" :shakeInvalid="shake" @valid="valid=$event"></ehc-form>
        </v-card-text>
    </v-card>
</template>


<script>
    export default {
    components: { },
    props: [],
    mixins: [],
    name: 'new tenant prompt',

    data: () => ({
        form: [
            {type: "text",   label: "Company Name",    key:"name",     required: true},
            {type: "button", label: "Submit",          key:"submit",   emitOnClick: "submit"}
        ],
        formData: {},
        valid: false,
        shake: false,
    }),
    watch: {
    },
    methods: {
        submit() {
            console.log("trying to submit")
            if (this.valid) {
                console.log("make a tenant with this info", this.formData)
                this.$store.dispatch("makeTenant", this.formData)
            } else {
                console.log("input invalid")
                this.shake = true
            }
            
        }
    },
    computed: {
        loading: {
            get: function() {
                return this.$store.getters.tenantStatus.loading
            },
            set: function(val) {
                this.$store.commit('setTenantStatus', {loading: val})
            }
        },
        newTenantPrompt: {
            get: function() {
                return this.$store.getters.loadingTenant
            },
            set: function(val) {
                this.$store.commit('setNewTenantPrompt', val)
            }
        },
    },
    created() {

    }  
    };
</script>