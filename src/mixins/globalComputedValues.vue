<script>

export default {
  data () {
    return {

    }
  },
  computed: {
    gcvAppSettings: {
      get() {
        return  this.$store.getters.appSettings
      },
      set(val) {
        this.$store.commit('setAppSettings', val)
      }
    },
    gcvOrg:{
      get() {
        return this.$store.getters.org
      }
    }
  }

}

 </script>