<template>
    <v-card>
        <v-card-text>
            {{value}} <br/>
            {{org}}
            <ehc-table 
                v-model="org.members" 
                :headers=""></ehc-table>
        </v-card-text>
    </v-card>
</template>



<script>
import ehcTable from '@/components/ehc-table.vue'

export default {
    components: {ehcTable},
    props: ['value'],
    data() {
        return {
            org: {},
            memberHeaders: [
                {label: "ID", key: ""}
            ]
        }
    },
    watch: {
        value() {
            this.getOrganization()
        }
    },
    created() {
        this.getOrganization()
    },
    methods: {
        getOrganization() {
            console.log("getting organization")
            this.apiGetOrg(this.value).then((data) => {
                console.log("got organization", data)
                this.org=data
            })
        }
    }
}


</script>