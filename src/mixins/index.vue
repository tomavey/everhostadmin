<script>
import moment from 'moment'

export default {
  data () {
    return {

    }
  },
  methods: {    
    goToOffSite: function (link) {
      window.open(link)
    },
    returnBack () {
      this.$router.go(-1)
    },
    returnHome () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    visitUrl: function (url) {
      let newUrl = this.fixUrl(url)
      window.open(newUrl)
    },
    fixUrl: function (url) {
      if (!url.includes('http')) { url = 'http://' + url }
      return url
    },
    formatDate: function (value,format = "dateAndTime") {
      let formatString = 'MMMM Do YYYY, h:mm:ss a'
      if ( format === "dateOnly") { formatString = 'MM/D/YY'}
      return moment(value).format(formatString)
    },
    dateFormat: function(value,format){
      return this.formatDate(value,format)
    },
    isMobile: function () {
      if (
        this.testForMobile || 
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        return true
      } else {
        return false
      }
    },
    // onLogout: function () {
    //   this.$store.dispatch('logout')
    // },
    logout(){ 
      this.$store.dispatch("logout")
      .then( () => this.goToRoute("Signin") )
      },
    goTo: function (route) {
      if ( route.includes("http") ) {
        this.goToOffSite(route)
      }
      this.$router.push('/' + route)
    },
    goToRoute: function (name, params) {
      if ( params ) { this.goToRouteParams(name,params) }
      if (this.$route.name == name) { return }
      this.$router.push( {name: name} )
    },
    goToRouteParams: function(name,params){
      console.log(params)
      alert(name)
      this.$router.push( {name: name, params: {params}} )
    },
    getImageUrl: function(image){
      if ( !image ) { return "" }
      if ( image.includes("firebasestorage") ) {
        return image
      }
      let thisimage = this.$store.getters.images.filter( (el) => el.fileName === image )
      if ( thisimage.length ) {
        return thisimage[0].fileUrl
      }
      return "https://via.placeholder.com/300x200?text=Need+300x200+Access+image"
    },
    compareAB: function(a,b,field){
        let aC = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field].toString();
        let bC = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field].toString();
        return aC.localeCompare(bC)
    },
    timeFormat: function(string){
      const d1 = new Date(string)
      const d2 = moment(string).format('LT')
      return d2
    },
    dollarFormat: function (number) {
      if (typeof number === 'string') { number = Number(number) }
      if ( !number ) { return "" }    
      let newNumberString = number.toFixed(2)
      return '$' + newNumberString
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
    user: function () {
      return this.$store.getters.user
    },
    loading: function () { return this.$store.getters.loading },
  }
}

</script>