////////////////////////////////////
// Must provide a data array
// Optional: provide a label for the button as "label" and the name of the csv download as "csvTitle"
// Example: <ehc-download-button :data="data" :label="'Download CSV'" :fileName="'My CSV'" />
// components: {EhcDownloadButton}, 
// import EhcDownloadButton from '@/components/ehc-download-button.vue'
///////////////////////////////////


<template>
  <v-btn elevation="2" class="float-right ml-1">
            <vue-json-to-excel
                :data="data"
                :name="fileName"
                :header="header"
                :type="type"
                :escapeCsv = false
                >
                {{label}}
            </vue-json-to-excel>
  </v-btn>
</template>

<script>
import vueJsonToExcel from "vue-json-excel";

export default {
  components: {
    vueJsonToExcel
  },
  props: {
        data: {
            type: Array,
            required: true,
            default: null
        },
        label: {
            type: String,
            default: "Download"
        },
        fileName: {
            type: String,
            default: 'CSV'
        },
        header: {
          default: '<span style="font-size: 1.2em">EVERHOST DATA</span>'
        },
        type: {
          type: String,
          default: 'xls'
        }
    },
  }
</script>