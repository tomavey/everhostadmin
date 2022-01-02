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
            <v-btn width="100%" >test</v-btn>
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
        isValid: false,
        shakeInvalid: false,
        formData: {},
        meta: [
            {type: "text",          label: "name",                      key: "name"},
            {type: "email",         label: "email",                     key: "email"},
            {type: "subheader",     label: "subheader text"},
            {type: "fileInput",     label: "upload screenshot(s)",      key: "upload",          multiple:true},
            {type: "phoneNumber",   label: "Phone Number",              key: "phoneNumber"},
            {type: "button",        label: "submit",                    key: "submit",          emitOnClick: "submit"},
            {type: "switch",        label: "switch me",                 key: "isSwitched",      required: true, errorMessage: "you must switch"}, //by default it just says "required" but errorMessage overrides that message
            {type: "select",        label: "select one",                options: ["first opt", "second opt"], required: true, errorMessage: "you must select something"}            
        ],
    }),
    mounted() {
        formData.email = this.$store.getters.user.email
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
    }
}

</script>