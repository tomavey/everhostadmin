<!-- 
    example:
        <template>
            <ehc-form 
                v-model="formData" 
                :meta="meta" 
                :shakeInvalid="shakeVariable" - (optional) set to true to shake invalid inputs
                @submit="somefunction()"
                @valid="isValid = $event" - (optional) returns whether or not the form is valid
                />
        </template>
        <script>
            data() {
                return {
                    meta: [
                        {type: "text",          label: "name",                      key: "name"},
                        {type: "email",         label: "email",                     key: "email"},
                        {type: "textArea",      label: "Description of problem",    key: "description"},
                        {type: "subheader",     label: "subheader text"},
                        {type: "fileInput",     label: "upload screenshot(s)",      key: "upload",          multiple:true},
                        {type: "phoneNumber",   label: "Phone Number",              key: "phoneNumber"},
                        {type: "button",        label: "submit",                    key: "submit",          emitOnClick: "submit"},
                        {type: "switch",        label: "switch me",                 key: "isSwitched",      required: true, errorMessage: "you must switch"}, //by default it just says "required" but errorMessage overrides that message
                        {type: "select",        label: "select one",                options: ["first opt", "second opt"], required: true, errorMessage: "you must select something"}            
                    ],
                }
            },
            methods: {
                somefunction() {
                    do.something.with(this.formData)
                }
            }
        </script>

        FIXME: currently when chrome autofills the form it overlaps the labels. figure out how to fix that. 
 -->


<template>
    <div class="mb-0">
        <v-container >
            <v-form 
                v-model="valid"
                ref="ehcForm"
                >
            <slot></slot>
            <template v-for="(field, fieldIndex) in meta">
                <v-row :key="fieldIndex">
                    <v-text-field   ref='input'
                                    v-if="field.type == 'text'" 
                                    :color="color"
                                    :rules="inputRules(field)"
                                    outlined 
                                    :dense = dense
                                    v-bind="field" 
                                    v-model="data[field.key]" 
                                    @blur="$emit('blur', {key: field.key, value: data[field.key]})"
                                    @change="$emit('change', {key: field.key, value: data[field.key]})">
                                    </v-text-field>
                    <v-text-field   ref='input'
                                    v-if="field.type == 'number'" 
                                    type="number"
                                    :color="color"
                                    :rules="inputRules(field)"
                                    outlined 
                                    :dense = dense
                                    v-bind="field" 
                                    v-model="data[field.key]" 
                                    @blur="$emit('blur', {key: field.key, value: data[field.key]})"
                                    @change="$emit('change', {key: field.key, value: data[field.key]})">
                                    </v-text-field>                                    
                    <v-text-field   v-else-if="field.type == 'email'" 
                                    :rules="emailRules(field)"
                                    :color="color"
                                    outlined 
                                    :dense = dense
                                    v-bind="field" 
                                    v-model="data[field.key]" 
                                    @blur="$emit('blur', {key: field.key, value: data[field.key]})"
                                    @change="$emit('change', {key: field.key, value: data[field.key]})">
                                    </v-text-field>   
                    <v-text-field   v-else-if="field.type == 'password'" 
                                    :rules="inputRules(field)"
                                    :color="color"
                                    :dense = dense
                                    outlined 
                                    v-bind="field" 
                                    v-model="data[field.key]" 
                                    @blur="$emit('blur', {key: field.key, value: data[field.key]})"
                                    @change="$emit('change', {key: field.key, value: data[field.key]})">
                                    </v-text-field>                                                                   
                    <ehc-int-phone-input
                                    v-else-if="field.type == 'intPhoneNumber'"
                                    v-model="data[field.key]" 
                                    :color="color"
                                    :dense = dense
                                    outlined
                                    v-bind="field"
                                    @blur="$emit('blur', {key: field.key, value: data[field.key]})"
                                    @change="$emit('change', {key: field.key, value: data[field.key]})"
                                    >
                                    </ehc-int-phone-input>                                                                      
                    <ehc-phone-input   
                                    v-else-if="field.type == 'phoneNumber'"  
                                    :props="field"
                                    :color="color" 
                                    :dense = dense
                                    v-model="data[field.key]" 
                                    @demaskedOut="data[field.key] = $event"
                                    @blur="$emit('blur', {key: field.key, value: data[field.key]})"
                                    @change="$emit('change', {key: field.key, value: data[field.key]})">
                                    </ehc-phone-input>
                    <v-textarea   v-else-if="field.type == 'textArea'" 
                                    outlined
                                    :color="color" 
                                    :rules="inputRules(field)"
                                    v-bind="field" 
                                    v-model="data[field.key]" 
                                    @blur="$emit('blur', {key: field.key, value: data[field.key]})"
                                    @change="$emit('change', {key: field.key, value: data[field.key]})">
                                    </v-textarea>
                    <v-text-field   v-else-if="field.type == 'link'" 
                                    :rules="linkRules(field)"
                                    :color="color"
                                    outlined 
                                    :dense = dense
                                    v-bind="field" 
                                    v-model="data[field.key]" 
                                    @blur="onBlurLink(field.key, data[field.key])"
                                    @change="onChangeLink(field.key, data[field.key])">
                                    </v-text-field>                                       
                    <ehc-file-input   
                                    :color="color" 
                                    v-else-if="field.type == 'fileInput'" 
                                    v-model="data[field.key]" 
                                    :props="field"></ehc-file-input>
                    <v-select
                        v-else-if="field.type === 'select'"
                        v-model="data[field.key]"
                        :color="color"
                        :items="field.options"
                        :label="field.label"
                        outlined
                        :dense = dense
                        :rules="inputRules(field)"
                        @change="$emit('change', {key: field.key, value: data[field.key]})">
                    ></v-select>                                            
                    <v-switch
                        :dense = dense
                        :color="color"
                        v-bind="field"
                        v-else-if="field.type === 'switch'"
                        v-model="data[field.key]"
                        :rules="inputRules(field)"
                        :label=field.label
                        @change="$emit('change', {key: field.key, value: data[field.key]})">
                    ></v-switch>                    
                    <v-btn
                        color = 'button'
                        dark 
                        block
                        v-else-if="field.type === 'submit'"
                        @click="$emit('submit')"
                        >
                        {{field.label}}
                    </v-btn> 
                    <v-btn
                        :color="(field.color) ? field.color : color"
                        block
                        dark
                        v-else-if="field.type === 'button'"
                        v-bind="field"
                        @click="$emit(field.emitOnClick)"
                        >
                        {{field.label}}
                    </v-btn> 

                    <v-subheader v-else-if="field.type === 'subheader'" class="text-h6 mb-5 text-center">{{field.label}}</v-subheader>    
                                                               
                </v-row>
            </template>
            </v-form>
        </v-container>

    </div>
</template>

<script>
    import EhcFileInput from '../components/form/ehc-file-input.vue'
    import EhcPhoneInput from '@/components/form/ehc-phone-Input.vue'
    import EhcIntPhoneInput from '@/components/form/ehc-int-phone-input.vue'

    export default {
        mixins: [],
        props: {
            meta: Array,
            value: Object,
            shakeInvalid: {type: Boolean, default: false},
            dense: {type: Boolean, default: false},
            color: {type: String, default: "black2"},
        },
        components: {
            EhcFileInput,
            EhcPhoneInput,
            EhcIntPhoneInput
        },
        data: () => ({
            data: {},
            valid: null
        }),
        created () {
            this.data = this.value
        },
        async mounted() {
 
        },          
        watch: {
            shakeInvalid() {
                this.$refs.ehcForm.validate()
            },
            valid(val) {
                this.$emit('valid', val)
            },
            value() {
                this.data = this.value
            },
            data(val) {
                this.$emit('input', val)
            }
        },
        computed: {

        },
        methods: {
            // rules
            emailRules(field) {
                let rule = []
                let errorMessage = (field.errorMessage) ? field.errorMessage : "required"
                if (field.required) { rule.push(v => !!v || errorMessage)}
                rule.push(v => /(.+@.+\..+)|^(?![\s\S])/.test(v) || 'Must be valid Email')

                return rule
            },
            inputRules(field) {
                let rule = []
                let errorMessage = (field.errorMessage) ? field.errorMessage : "required"
                if (field.required) { rule.push(v => !!v || errorMessage)}

                return rule
            },
            linkRules(field) {
                let rule = []
                let errorMessage = (field.errorMessage) ? field.errorMessage : "required"
                if (field.required) { rule.push(v => !!v || errorMessage)}
                rule.push(v => /^$|null|([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)|^(?![\s\S]))/.test(v) || 'Must be valid link (including https:// or http://)')

                return rule
            },
            onBlurLink(key,value){
                this.$emit('blur', {key: key, value: newValue})
            },
            onChangeLink(key,value){
                this.$emit('change', {key: key, value: newValue})
            },
        },
    }
</script>

<style scoped>
</style>


