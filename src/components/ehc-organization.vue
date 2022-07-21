<template>
    <ehc-page>

            {{value}} <br/>
            {{org}} <br/>
            {{members}}
            <ehc-show-obj
            v-model="org">
            </ehc-show-obj>

            
            <ehc-table 
                :items="members" 
                :headers="memberHeaders"
                ></ehc-table>

    </ehc-page>
</template>



<script>
import ehcTable from '@/components/ehc-table.vue'

export default {
    components: {ehcTable},
    props: ['value'],
    data() {
        return {
            org: {},
            page:1,
            memberHeaders: [
                {text: 'Display Name', value: 'displayName' },
                {text: 'Email', value: 'email' },
                {text: 'User ID', value: 'uid' },
            ],
            members: [
                {displayName: "Lux Midtown Penthhouse", email: "frowEmail@gmail.com", uid: "2342356245672457"},
                {displayName: "second Row", email: "sdfsdfas@gmail.com", uid: "2342356245672457"},
                {displayName: "third Rowerson", email: "asdfasdfl;kj@gmail.com", uid: "2342356245672457"},
                {displayName: "Lux Midtown Penthhouse", email: "asdfasdfl;kj@gmail.com", uid: "2342356245672457"},
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
        pageChange(page) {
            this.page=page
        },  
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