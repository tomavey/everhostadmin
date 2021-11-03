<template>
  <component-new-property-code-dialog></component-new-property-code-dialog>


</template>

<script>
import mixins from '@/mixins'
import ComponentNewPropertyCodeDialog from "../../components/admin/component-new-property-code-dialog"

export default {
  mixins: [mixins],
  components: {ComponentNewPropertyCodeDialog},
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