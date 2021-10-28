<template>
<v-container>
  {{message}}
</v-container>

</template>

<script>
import axios from "axios"

  export default {
    data() {
      return {
        message: "Testing",
        data: ""
      }
    },
    methods: {
      getData: function(){
        axios.get("https://charisfellowship.us")
        .then( (res) => {
          console.log(res)
        } )
      }
    },
    created(){
      this.getData()

    }

  }
</script>