<template>
    <v-container>
        <v-card>
            <v-card-title>
                Global App Settings
            </v-card-title>
            <v-card-text>
                <ehc-form
                :meta="globalAppSettingsMeta"
                v-model="globalAppSettingsData"
                @save="submitGlobalAppSettings()">

                </ehc-form>
            </v-card-text>
        </v-card>



    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                globalAppSettingsMeta: [
                    {type: "text", label: "default property limit", key: "defaultPropertyLimit"},
                    {type: "button",        label: "Save",                    key: "save",          emitOnClick: "save"},
                ],
                globalAppSettingsData: {

                }

                
            }
        },
        methods: {
            submitGlobalAppSettings() {
                console.log("submit Global App Settings")

            
            }
        }


    }

</script>



<style>

</style>