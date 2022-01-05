export default {
    data() {
        return {
            registration: null,
            updateExists: false,
            refreshing: false
        }
    },
    created () {
        document.addEventListener('swUpdated', this.updateAvailable, { once: true }) //looks for update available event in service worker   
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            // We'll also need to add 'refreshing' to our data originally set to false.
            if (this.refreshing) return
            this.refreshing = true
            // Here the actual reload of the page occurs
            window.location.reload()
          })
    },
    computed: {

    },
    methods: {
        updateAvailable(event) {
            console.log(event)
            this.registration = event.detail
            this.updateExists = true

            this.refreshApp()
        }, 
        refreshApp() {
            this.updateExists = false
            // Make sure we only send a 'skip waiting' message if the SW is waiting
            if (!this.registration || !this.registration.waiting) return
            // Send message to SW to skip the waiting and activate the new SW
            this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
    }
}