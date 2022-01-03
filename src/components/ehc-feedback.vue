<template>
    <ehc-drawer v-model="showFeedback" right title="Feedback" subtitle="please let us know of any issues or feedback">
        <ehc-form 
            v-model="formData" 
            :meta="meta" 
            :shakeInvalid="shakeInvalid"
            @valid="isValid = $event"
            :dense="true"
            />
        <template v-slot:actions>
            <v-btn 
                width="100%" 
                color="button" 
                dark 
                @click="submit()"
                :loading="loading"
                ><strong>{{buttonText}}</strong></v-btn>
        </template>
    </ehc-drawer>
</template>


<script>
export default {
    props: {
        value: Boolean,
        title: String
    },
    name: 'ehc-feedback',
    data: () => ({
        show: false,
        loading: false,
        buttonText: "Submit",
        isValid: false,
        shakeInvalid: false,
        formData: {
            upload:[]
        },
        meta: [
            {type: "text",          label: "name",                      key: "name"},
            {type: "email",         label: "email",                     key: "email"},
            {type: "textArea",      label: "Description of issue",      key: "description"},
            // {type: "fileInput",     label: "upload screenshot(s)",      key: "upload",          multiple:true},        
        ],
    }),
    mounted() {
        this.formData.email = this.$store.getters.user.email
    },
    computed: {
        showFeedback: {
            get() {
                return this.$store.getters.feedback.show
            },
            set() {
                this.$store.commit("setFeedback", {show: false})
            }
        }
    },
    watch: {
        value(val) {
            if (val != this.show) {
                this.show= val
            }
        },
        show(val) {
            if (val != this.value) {
                this.$emit('input', val)
            }
        }
    },
    methods: {
        submit() {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            let that = this
            this.loading=true
            this.$store.dispatch("submitFeedback", this.formData).then(async() =>{
                that.loading=false;
                that.buttonText = "Thank you!";
                await delay(1000);
                that.showFeedback= false
                that.formData= {upload:[]}
            })
        }
    }
}

</script>