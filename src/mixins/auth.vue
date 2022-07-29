<script>

export default {
  data () {
    return {

    }
  },
  created() {
  },
  methods:{
    // takes an array of strings and vallue to be returned if the current user has any of the passed strings as permission
    userHasPermission(perms, response = true) {
      if (!('permissions' in this.user)) {return false}
      const userPerms = this.user.permissions

      for (var i=0; i < perms.length; i++) {
        if (this.user.permissions.includes(perms[i])) {return response}
      }

      return false
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