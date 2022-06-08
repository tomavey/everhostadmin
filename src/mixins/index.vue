<script>
import moment from 'moment'

export default {
  data () {
    return {
      isMobile: false,
    }
  },

  methods: {    
    formatDate: function (value,format = "dateAndTime") {
      let formatString = 'MMMM Do YYYY, h:mm:ss a'
      if ( format === "dateOnly") { formatString = 'MM/D/YY'}
      if ( format === "shortFormat") { formatString = 'MM/D, h:mm:ss' }
      return moment(value).format(formatString)
    },
    dateFormat: function(value,format){
      return this.formatDate(value,format)
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
    },
  },

  computed: {
  }, 

  beforeDestroy () {
      if (typeof window === 'undefined') return
      window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted () {
      this.onResize()
      window.addEventListener('resize', this.onResize, { passive: true })
  },
}

</script>