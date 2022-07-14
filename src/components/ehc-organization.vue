<template>
    <v-card>
        <v-card-text>
            {{value}} <br/>
            {{org}} </br/>
            {{members}}
            <ehc-table 
                v-model="members" 
                :headers="memberHeaders"></ehc-table>
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
                {label: 'Display Name', key: 'displayName' },
                {label: 'Email', key: 'email' },
                {label: 'User ID', key: 'uid' },
            ],
            members: []
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
        getListOfUsers(list) {
            this.apiGetListOfUsers(list).then((data) => {
                console.log('got users', data)
                this.members = data
            })
        },
        getOrganization() {
            console.log("getting organization")
            this.apiGetOrg(this.value).then((data) => {
                console.log("got organization", data)
                this.org=data
                this.getListOfUsers(data.members)
            })
        }
    }
}


</script>