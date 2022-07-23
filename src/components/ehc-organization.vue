<template>
    <ehc-page>
        
            <ehc-header :text="'Organization: ' + org.name ">

            </ehc-header>
            <ehc-sheet>
                <ehc-form v-model="org" :meta="orgMeta" dense @submit="updateOrg()"></ehc-form>
            </ehc-sheet>
        <!-- TODO: make it initially display the show-obj then click an edit button to edit -->
        <!-- <ehc-sheet>
            <ehc-show-obj v-model="org" :meta="orgMeta">
            </ehc-show-obj>
        </ehc-sheet> -->



        <ehc-card>
            <ehc-header text="Member Users">
            </ehc-header>
            <ehc-sheet>
                <ehc-table :items="members" :headers="memberHeaders"></ehc-table>
            </ehc-sheet>
        </ehc-card>


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
            orgMeta: [
                { type: "text", label: "Organization Name", key: "name" },
                { type: "text", label: "Company White Label", key: "companyLabel" },
                { type: "link", label: "Web Site", key: "webSite" },
                { type: "intPhoneNumber", label: "Phone", key: "phone" },
                { type: "number", label: "Property Limit", key: "propertyLimit" },
                { type: "select", label: "Subscription Type", key: "subType", options: ["Free", "Premium"], required: true, errorMessage: "you must select something" },
                { type: "text", label: "Image", key: "image", multiple: true },
                { type: "button", label: "submit", key: "submit", emitOnClick: "submit", hideInCard: true },
            ],
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
        updateOrg: function () {
            this.apiUpdateOrg(this.value, this.org)
            /* this.showInfo = true
            this.showForm = false */
        },
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