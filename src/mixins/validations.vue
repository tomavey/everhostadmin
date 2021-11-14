<script>
import moment from 'moment'

export default {
  data () {
    return {

    }
  },
  methods: {    
   },
  computed: {
    instructions: function() {
      return this.$store.getters.instructions
    },
  }
}

</script>