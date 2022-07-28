<script>

export default {
  data () {
    return {

    }
  },
  created() {
  },
  methods:{
    // returns true if user has permission level passed
    userPermissionCheck(perm) {
      if(perm=='') {return true}
      return this.user.permissions.includes(perm)
    },
  },
  computed: {
    userIsAuthenticated: function () {
      if ( this.$store.getters.devMode ) { return true }
      return this.$store.getters.user.data !== null
      },
    userIsAdmin: function() {
      return this.$store.getters.isAdmin
    },
    user: function() {
        return this.$store.getters.user
    },
    loggedIn: function() {
        if (this.user==null) {
            return false
        } else {
            return true
        }
    }
  }
}
</script>