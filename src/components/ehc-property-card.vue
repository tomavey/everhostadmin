<template>
    <v-card class="pa-0" max-width="18rem">
        <v-img :src="property.avatarImg" height="13rem"></v-img>
        {{property.address}} {{property.city}}, {{property.state}}
        <v-card-title class="text-h6">{{property.name}}</v-card-title>
        <v-spacer/>
        <v-card-actions class="d-flex justify-center">
        <v-btn text class="text-caption">Created: {{formatDate(property.createdAt,"dateOnly")}}</v-btn>
<!-- edit -->
        <v-btn class="mx-0" small icon @click="goToProperty()"><v-icon small color="green darken-2">mdi-pencil</v-icon></v-btn>
        <v-btn class="mx-0" v-if="!property.publishedAt" small icon @click="publishProperty({propertyId: property.propertyId, publishedAt: true})">
            <v-icon small color="grey darken-2">mdi-publish</v-icon>
        </v-btn>
        <v-btn class="mx-0" v-else small icon @click="publishProperty({propertyId: property.propertyId, publishedAt: false})"><v-icon small color="grey darken-2">mdi-publish-off</v-icon></v-btn>
        <v-btn class="mx-0" small icon @click="copyProperty(property.propertyId)"><v-icon small color="blue darken-2">mdi-content-copy</v-icon></v-btn>
        <v-btn class="mx-0" small icon @click="copyLink(property)"><v-icon small color="yellow darken-2">mdi-link</v-icon></v-btn>
        <v-btn class="mx-1" small icon @click="deleteProperty(property.propertyId)"><v-icon small color="red darken-2">mdi-trash-can-outline</v-icon></v-btn>
        </v-card-actions>
        <v-card-text>PropertyId: {{property.propertyId}}<br/>
        <span v-if="property.publishedAt">Published: {{dateFormat(property.publishedAt, 'dateOnly')}}</span>
        <span v-else>Not Published Yet</span>
        </v-card-text>
    </v-card>
</template>


<script>

import uniMixin from '@/mixins/index.vue'


export default {
    mixins: [uniMixin],
    components: {},
    name: 'property card',
    props: ['property'],
    data: () => ({
    }),
    computed: {
        prop() {return this.property},
        appSite() {return this.$store.getters.getAppSite}
    },
    methods: {
        goToProperty() {
            window.open(this.appSite + this.prop.propertyId,
                    "", "width=375, height=812");
        },
        copyProperty() {
            console.log("copyProperty TODO")
        },
        copyLink() {
            console.log("copyLink TODO")
        },
        deleteProperty() {
            console.log("deleteProperty TODO")
        },
        publishProperty() {
            console.log("publishProperty TODO")
        }
    },
    watch: {

    },
    created() {
    }

}
</script>