<script>

export default {
  data () {
    return {
        authLoading: false
    }
  },
  created() {
  },
  methods:{
        login: function(credentials) {
            console.log("login", credentials)
            this.$store.dispatch('signInWithEmailAndPassword', credentials).then(res=>{
                console.log("logged in", res)
            })
        },
        logout: function() {
            this.$store.dispatch('logout')
        },
  },
  computed: {
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