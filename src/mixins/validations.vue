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
    isPropertyIdValid: function(){
      if ( this.property.propertyId.length > 6 ) {
        return true
      } else {
        return false
      }   
    },
    isPropertyIdUnique: function(){
      let propertyId = this.property.propertyId
      return !this.propertyIds.includes( propertyId )
    },
    isPropertyIdNoSpace:function(){
      return this.propertyId.includes(' ')
    }
  }
}

</script>