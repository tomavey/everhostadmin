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
          console.log("logout")
      },
  },
  computed: {
      user: function() {
          return "user"
      }
  }
}
</script>