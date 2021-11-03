<template>
  <div>
      {{pageTitle}}
  </div>
</template>

<script>
import mixins from "@/mixins"

export default {
  mixins: [mixins],
  data() {
    return {
      pageTitle: "Index Page",
      navItems: [
        {
          n: 1,
          label: "New Property",
          routeName: "NewPropertyCreateDialog",
          adminOnly: false
        }, 
        {
          n: 2,
          label: "My Properties List",
          routeName: "PropertiesList",
          adminOnly: false
        }, 
        {
          n: 3,
          label: "My Properties Gallery",
          routeName: "PropertiesGallery",
          adminOnly: false
        }, 
        {
          n: 4,
          label: "Image Gallery",
          routeName: "ImageGallery",
          adminOnly: false
        }, 
        {
          n: 5,
          label: "Users",
          routeName: "Users",
          adminOnly: true
        }, 
      ],
    }
  },
  methods: {
  },
  computed: {
  },
  watch: {
  },
  mounted(){
  }
}
</script>