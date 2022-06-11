////////////////////////////////////
// Must provide a data array
// Optional: provide a label for the button as "label" and the name of the csv download as "csvTitle"
// Example: <ehc-download-button :data="data" :label="'Download CSV'" :csvTitle="'My CSV'" />
// components: {EhcDownloadButton}, 
// import EhcDownloadButton from '@/components/ehc-download-button.vue'
///////////////////////////////////


<template>
  <v-btn elevation="2" class="float-right ml-1">
            <vue-json-to-csv
                :json-data="data"
                :csv-title="csvTitle"
                >
                {{label}}
            </vue-json-to-csv>
  </v-btn>
</template>

<script>
import VueJsonToCsv from 'vue-json-to-csv'

export default {
  components: {
    VueJsonToCsv
  },
  props: {
        data: {
            type: Array,
            required: true,
            default: null
        },
        label: {
            type: String,
            default: "Download CSV"
        },
        csvTitle: {
            type: String,
            default: 'CSV'
        }
    },
  }
</script>