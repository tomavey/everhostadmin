<template>
<v-container fluid>
  <v-data-table
    :headers="headers"
    :items="properties"
    :items-per-page="30"
    class="elevation-1"
    :footer-props="{
      showFirstLastPage: true,
      itemsPerPageOptions: [50,100,150.-1]
    }"
  >

    <template v-slot:item.edit="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="goToProperty(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:item.copy="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="copyProperty(item)"
      >
        mdi-content-copy
      </v-icon>
    </template>
    <template v-slot:item.publish="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="publishProperty(item)"
      >
        mdi-publish
      </v-icon>
    </template>

  </v-data-table>
</v-container>
</template>

<script>
import PropertyActions from '@/mixins/propertyActions'

export default {
  mixins: [PropertyActions],
  props: ['properties'],
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'State', value: 'state' },
        { text: 'Property Id', value: 'propertyId' },
        { text: 'Published', value: 'publishedAtAsString' },
        { text: 'Created', value: 'createdAtAsString' },
        { text: 'Edit', value: 'edit', sortable: false },
        { text: 'Copy', value: 'copy', sortable: false },
        { text: 'Publish', value: 'publish', sortable: false },

      ]
    }
  },
  methods: {
    goToProperty(item) {
        const url = this.appSite + "login/" + item.propertyId
        console.log("opening property URL", url)
        window.open(url,"", "width=900, height=812");
    },
    copyProperty(item){
      this.$store.dispatch('copyProperty',item)
    },
    publishProperty(item) {
        this.$store.dispatch("markPropertyPublishedAt", item).then(() => {
          console.log("published")
        })
    }
  },
  computed: {
    appSite() {return this.$store.getters.appSite},
  }
}
</script>