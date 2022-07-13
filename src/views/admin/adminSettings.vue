<template>
    <v-container class="ml-0">
        <v-card width="400px">
            <v-card-title>
                Global App Settings
            </v-card-title>
            <v-card-text>
                <ehc-form
                :meta="globalAppSettingsMeta"
                v-model="editSettings"
                @save="saveGlobalAppSettings()">

                </ehc-form>
            </v-card-text>
        </v-card>



    </v-container>
</template>

<script>
    import apiMixin from '@/mixins/api.vue'

    export default {
        mixins: [apiMixin],
        data() {
            return {
                //just add to this to get more settings
                globalAppSettingsMeta: [
                    {type: "number", label: "default property limit", key: "defaultPropertyLimit"},
                    {type: "button",        label: "Save",                    key: "save",          emitOnClick: "save"},
                ],
                editSettings:  {}     
            }
        },
        watch: {
            gcvAppSettings() {
                this.editSettings=this.$store.getters.appSettings
            }
        },
        mounted() {
            this.editSettings = this.$store.getters.appSettings
        },  
        created() {
            this.editSettings = this.$store.getters.appSettings
        },
        computed: {

        },
        methods: {
            getAppSettings() {
                this.appSettings = this.$store.getters.appSettings
            },  
            saveGlobalAppSettings() {
                this.apiUpdateAppSettings(this.editSettings)
            }
        }


    }

</script>



<style>

</style>