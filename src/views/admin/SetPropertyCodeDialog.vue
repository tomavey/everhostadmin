<template>
  <component-set-property-code-dialog></component-set-property-code-dialog>


</template>

<script>
import mixins from '@/mixins'
import ComponentSetPropertyCodeDialog from "../../components/admin/component-set-property-code-dialog"

export default {
  mixins: [mixins],
  components: {ComponentSetPropertyCodeDialog},
  data(){
    return {
      propertyId: null,
    }
  },
  methods: {
    submit: function(){
      this.$store.commit("setPropertyId",this.propertyId)
      this.goToRoute("ImageGallery")
    }
  }
}
</script>