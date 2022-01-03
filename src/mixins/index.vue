<script>
import moment from 'moment'

export default {
  data () {
    return {

    }
  },
  methods: {    
    formatDate: function (value,format = "dateAndTime") {
      let formatString = 'MMMM Do YYYY, h:mm:ss a'
      if ( format === "dateOnly") { formatString = 'MM/D/YY'}
      return moment(value).format(formatString)
    },
    dateFormat: function(value,format){
      return this.formatDate(value,format)
    },
  },
  computed: {

  }
}

</script>