<script>

export default {
 data () {
   return {

   }
  },
  methods: {

  },
  computed: {
    gcvBreakpoint() {
      return this.$vuetify.breakpoint.name
    },
    gcvIsMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return false
        case 'lg': return false
        case 'xl': return false
      }
    },
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