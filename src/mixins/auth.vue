<script>

export default {
  data () {
    return {

    }
  },
  created() {
  },
  methods:{

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