<template>
<v-container fluid>
  <v-data-table
    :headers="headers"
    :items="properties"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</v-container>
</template>

<script>
export default {
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
      ]
    }
  }
}
</script>